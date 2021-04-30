<?php

namespace App\Http\Controllers;

use App\Models\Vaccination;
use App\Models\VaccinationLocation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class VaccinationController extends Controller
{
    /**
     * modify / convert values if needed
     */
    private function parseRequest(Request $request) : Request {
        if (isset($request['date'])) {
            $date = new \DateTime($request->published);
            $request['date'] = $date;
            // $request['date'] = Carbon::createFromFormat('Y-m-d', $request->date, "Europe/Vienna");
        }

        if (isset($request['fromTime'])) {
            $request['fromTime'] = Carbon::createFromFormat('H:i:s', $request->fromTime, "Europe/Vienna");
        }

        if (isset($request['toTime'])) {
            $request['toTime'] = Carbon::createFromFormat('H:i:s', $request->toTime, "Europe/Vienna");
        }

        $request['slotSizeInMinutes'] = $this->calcSlotSize($request->fromTime, $request->toTime, $request->availableSlots);

        return $request;
    }

    /**
     * @param $fromTime
     * @param $toTime
     * @param $availableSlots
     * @return int SlotSizeInMinutes
     */
    private function calcSlotSize ($fromTime, $toTime, $availableSlots) : int {
        $diffInSeconds = strtotime($toTime) - strtotime($fromTime);
        $slotsSizeInSeconds = $diffInSeconds / $availableSlots;
        return $slotsSizeInSeconds / 60;
    }

    public function save (Request $request) : JsonResponse {
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {
            if (isset($request['vaccination_location_id'])) {
                $loc = VaccinationLocation::find($request->vaccination_location_id);
            } else {
                throw new \Exception("VaccinationLocation id is missing.");
            }

            $vac = new Vaccination;
            $vac->date = $request->date;
            $vac->fromTime = $request->fromTime;
            $vac->toTime = $request->toTime;
            $vac->availableSlots = $request->availableSlots;
            $vac->slotSizeInMinutes = $request->slotSizeInMinutes;
            $vac->totalAttendeesPerSlot = $request->totalAttendeesPerSlot;
            $vac->vaccinationLocation()->associate($loc);
            $vac->save();

            DB::commit();
            return response()->json($vac, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            // return response()->json("saving vaccination failed: " . $e->getMessage(), 420);
            return response()->json($request, 420);
        }
    }

    public function update (Request $request, string $id) : JsonResponse {
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {
            $vac = Vaccination::with(['reservations'])->where('id', $id)->first();

            if ($vac != null) {
                $vac->update($request->all());

                if (isset($request['vaccination_location_id'])) {
                    $loc = VaccinationLocation::find($request->vaccination_location_id);
                    $vac->vaccinationLocation()->associate($loc);
                    $vac->save();
                }
            }

            DB::commit();
            return response()->json($vac, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating vaccination failed: " . $e->getMessage(), 420);
        }
    }

    public function delete (string $id) : JsonResponse {
        $vac = Vaccination::where('id', $id)->first();
        if ($vac != null) {
            $vac->delete();
        } else {
            return response()->json("Vaccination doesn't exist.", 200);
        }
        return response()->json("Vaccination with id=". $id . " deleted, successfully.", 201);
    }

    public function getAllRaw() {
        return Vaccination::with(['reservations'])->get();
    }

    public function getAllVaccinations() {
        $vacs = Vaccination::with(['reservations'])->get();
        foreach ($vacs as $vac) {
            $vac = $this->modifyVaccinationAddTimeSlotArray($vac);

            $locController = new VaccinationLocationController();
            $loc = $locController->findById($vac->vaccination_location_id);

            $vac["state"] = $loc->state->state;
            $vac["city"] = $loc->city;
            $vac["place"] = $loc->place;
            $vac["zipCode"] = $loc->zipCode;
        }
        return $vacs;
    }

    public function findById(string $id) {
        return $this->modifyVaccinationAddTimeSlotArray(Vaccination::find($id));
    }

    public static function modifyVaccinationAddTimeSlotArray($vac) {
        $slots = array_fill(1, $vac->availableSlots, 0);

        $slotSizeInMinutes = strtotime("00:". $vac->slotSizeInMinutes . ":00");
        $current = strtotime($vac->fromTime);

        foreach ($vac->reservations as $res) {
            $slots[$res->selectedSlot]++;
        }

        foreach ($slots as $key=>$value) {
            $slots[date("H:i", $current) . " - " . date("H:i",($current + $slotSizeInMinutes))] = $value;
            unset($slots[$key]);
            $current += $slotSizeInMinutes;
        }

        unset($vac->reservations);
        unset($vac->created_at);
        unset($vac->updated_at);

        $vac->setAttribute('reservationSlots', $slots);
        return $vac;
    }

    public function getAllOfState(string $state) {
        $vacs = DB::table('vaccinations')
            ->select('vaccinations.*', 'vaccination_locations.state_id',
                    'vaccination_locations.city', 'vaccination_locations.zipCode', 'vaccination_locations.place', 'states.state')
            ->join('vaccination_locations', 'vaccinations.vaccination_location_id', '=', 'vaccination_locations.id')
            ->join('states', 'vaccination_locations.state_id', '=', 'states.id')
            ->where('states.state', $state)
            ->get();

        $return = [];
        foreach ($vacs as $vac) {
            $vac2 = $this->findById($vac->id);
            $vac2["state_id"] = $vac->state_id;
            $vac2["city"] = $vac->city;
            $vac2["zipCode"] = $vac->zipCode;
            $vac2["place"] = $vac->place;
            $vac2["state"] = $vac->state;
            $return[] = $vac2;
        }
        return $return;
    }

    public function getUsersOfVaccination(string $id) {
        return DB::table('vaccinations')
            ->join('reservations', 'reservations.vaccination_id', '=', 'vaccinations.id')
            ->join('users', 'reservations.user_id', '=', 'users.id')
            ->select('vaccinations.id as VaccinationId', 'reservations.selectedSlot', 'users.firstName', 'users.lastName', 'users.email', 'users.isVaccinated')
            ->where('vaccinations.id', $id)
            ->get();
    }
}
