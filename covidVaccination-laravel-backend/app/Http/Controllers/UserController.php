<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * modify / convert values if needed
     */
    private function parseRequest(Request $request) : Request {
        if (isset($request['password'])) {
            $request['password'] = bcrypt($request['password']);
        }

        if (isset($request['dateOfBirth'])) {
            $request['dateOfBirth'] = Carbon::createFromFormat('Y.m.d', $request['dateOfBirth']);
        }

        return $request;
    }

    public function save (Request $request) : JsonResponse {
        $request = $this->parseRequest($request);

        try {
            $user = User::create($request->all());
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json("saving user failed: " . $e->getMessage(), 420);
        }
    }

    public function update (Request $request, string $ssn) : JsonResponse {
        $request = $this->parseRequest($request);

        try {
            $user = User::where('ssn', $ssn)->first();

            if ($user != null) {
                $user->update($request->all());
            }
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json("updating user failed: " . $e->getMessage(), 420);
        }
    }

    public function delete (string $ssn) : JsonResponse {
        $user = User::where('ssn', $ssn)->first();
        if ($user != null) {
            $user->delete();
        }
        else {
            throw new \Exception("user with ssn = ' . $ssn . ' couldn't be deleted - it does not exist");
        }
        return response()->json('user with ssn = ' . $ssn . ' successfully deleted', 200);
    }

    public function getAllUsers() {
        return User::with(['reservation'])->get();
    }

    public function findBySSN(string $ssn) {
        return User::where('ssn', $ssn)
            ->with(['reservation'])
            ->first();
    }

    public function isAdmin(int $ssn) {
        $user = User::where('ssn', $ssn)->first();
        return response()->json(boolval($user->isAdmin));
    }

    public function getUsersOfVaccination(string $vac_id) {
        return User::with(['reservation'])->get();
    }
}
