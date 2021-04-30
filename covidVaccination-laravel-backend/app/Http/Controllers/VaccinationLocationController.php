<?php

namespace App\Http\Controllers;

use App\Models\State;
use App\Models\VaccinationLocation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class VaccinationLocationController extends Controller
{
    public function save (Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            if(isset($request['state'])) {
                $state = State::where('state', $request['state'])->first();
                $request['state_id'] = $state->id;
            } else {
                throw new \Exception("State is missing.");
            }

            $loc = VaccinationLocation::create($request->all());
            DB::commit();
            return response()->json($loc, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving location failed: " . $e->getMessage(), 420);
        }
    }

    public function update (Request $request, string $id) : JsonResponse {
        DB::beginTransaction();
        try {
            $loc = VaccinationLocation::where('id', $id)->first();

            if ($loc != null) {
                $loc->update($request->all());

                if(isset($request['state'])) {
                    $state = State::where('state', $request['state'])->first();
                    $loc->state()->associate($state);
                    $loc->save();
                }
            }

            DB::commit();
            return response()->json($loc, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating location failed: " . $e->getMessage(), 420);
        }
    }

    public function delete (string $id) : JsonResponse {
        $loc = VaccinationLocation::where('id', $id)->first();
        if ($loc != null) {
            $loc->delete();
        } else {
            return response()->json("Location doesn't exist.", 200);
        }
        return response()->json("Location with id=". $id . " deleted, successfully.", 201);
    }

    public function getAllLocations() {
        $locs = VaccinationLocation::with(['state'])->get();

        foreach ($locs as $loc) {
            $loc["stateName"] = $loc->state->state;
            unset($loc->created_at);
            unset($loc->updated_at);
            unset($loc->state);
        }

        return $locs;
    }

    public function findById(string $id) {
        return VaccinationLocation::with(['state'])->where('id', $id)->first();
    }
}
