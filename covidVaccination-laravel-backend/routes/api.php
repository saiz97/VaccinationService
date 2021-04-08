<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/*
POST createUser
DELETE deleteUser(ssn)
POST updateUser(ssn)
GET getUserBySSN
GET getAllUsers
 */

/*
POST createVaccination
DELETE deleteVaccination(id)
POST updateVaccination(id)
GET getVaccinationsByState(state)
GET getAllVaccinations
GET getUsersOfVaccination(id)
 */

/*
POST createLocation
DELETE deleteLocation(state)
POST updateLocation(id)
GET getAllLocations
*/
