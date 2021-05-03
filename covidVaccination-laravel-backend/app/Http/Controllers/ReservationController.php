<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\User;
use App\Models\Vaccination;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    private function checkRequest(Request $request) : bool {
        return (isset($request['user_id']) && isset($request['vaccination_id']) && isset($request['selectedSlot']));
    }

    /**
     * checks if selected timeSlot is valid for the selected Vaccination
     * AND check if timeSlot has free space
     * @param $vacId
     * @param $slot
     * @return bool
     */
    private function checkTimeSlotIsValid($vacId, $slot) {
        $vac = (new VaccinationController)->findById($vacId);

        if ($slot > count($vac->reservationSlots)) return false;

        $slotKey = array_keys($vac->reservationSlots)[$slot-1];
        if ($vac->reservationSlots[$slotKey] < $vac->totalAttendeesPerSlot) return true;

        return false;
    }

    public function save (Request $request) : JsonResponse {
        if ($this->checkRequest($request)) {
            try {
                // $res = Reservation::create($request->all());
                if (Reservation::where('user_id', $request->user_id)->get()->count() > 0) {
                    return response()->json("This user has already booked a vaccination!", 409);
                }

                if (!$this->checkTimeSlotIsValid($request->vaccination_id, $request->selectedSlot)) {
                    return response()->json("The selected timeSlot is either full or not valid!", 406);
                }

                $res = new Reservation;
                $res->user()->associate(User::find($request->user_id));
                $res->vaccination()->associate(Vaccination::find($request->vaccination_id));
                $res->selectedSlot = $request->selectedSlot;
                $res->save();

                return response()->json($res, 201);

            } catch (\Exception $e) {
                return response()->json("saving reservation failed: " . $e->getMessage(), 420);
            }
        } else {
            return response()->json("Canceled, due to reservation is missing fields.", 420);
        }
    }

    public function delete (string $user_id) : JsonResponse {
        $res = Reservation::where('user_id', $user_id)->first();
        if ($res != null) {
            $res->delete();
        } else {
            return response()->json("Reservation doesn't exist.", 200);
        }
        return response()->json("Reservation of user with id=". $user_id . " deleted, successfully.", 201);
    }

    public function getAllReservations() {
        return Reservation::all();
    }

    public function getAllOfVaccination(string $vac_id) {
        $reservations = Reservation::with(['user', 'vaccination'])->where('vaccination_id', $vac_id)->get();

        foreach ($reservations as $reservation) {
            $reservation = $this->addVaccinationFormatted($reservation);
        }

        return $reservations;
    }

    public function findByUserId(string $user_id) {
        $reservation = Reservation::with(['vaccination'])->where('user_id', $user_id)->first();

        $reservation = $this->addVaccinationFormatted($reservation);

        return $reservation;
    }

    private function addVaccinationFormatted($reservation) {
        if ($reservation) {
            $vac = VaccinationController::modifyVaccinationAddTimeSlotArray($reservation->vaccination);
            $reservation["vaccinationDate"] = $vac->date;
            $reservation["selectedSlotLabel"] = array_keys($vac->reservationSlots)[$reservation->selectedSlot-1]; // Slots index starting with 1 -> array_key with 0!
        }

        unset($reservation->created_at);
        unset($reservation->updated_at);
        unset($reservation->vaccination);

        return $reservation;
    }
}
