<?php

namespace App\Http\Controllers;

use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StateController extends Controller
{
    public function save (Request $request) : JsonResponse {
        try {
            $state = State::create($request->all());
            return response()->json($state, 201);
        } catch (\Exception $e) {
            return response()->json("saving state failed: " . $e->getMessage(), 420);
        }
    }

    public function update (Request $request, string $name) : JsonResponse {
        try {
            $state = State::where('state', $name)->first();

            if ($state != null) {
                $state->update($request->all());
                return response()->json($state, 201);
            } else {
                return response()->json("updating failed. No state found with name = " . $name, 420);
            }
        } catch (\Exception $e) {
            return response()->json("updating state failed: " . $e->getMessage(), 420);
        }
    }

    public function delete (string $name) : JsonResponse {
        $state = State::where('state', $name)->first();
        if ($state != null) {
            $state->delete();
        } else {
            return response()->json("State doesn't exist.", 200);
        }
        return response()->json("State with name = ". $name . " deleted, successfully.", 201);
    }

    public function getAllStates() {
        return State::all();
    }

    public function findByName(string $name) {
        return State::where('state', $name);
    }

    function getStateLocations(string $name) {
        return State::where('state', $name)->with('locations')->first()->locations;
    }
}
