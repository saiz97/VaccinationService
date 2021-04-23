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

/* authentication */
Route::post('auth/login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::group(['middleware' => ['api', 'auth.jwt']], function () {
    Route::post('auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    // User
    Route::post('user', [\App\Http\Controllers\UserController::class, 'save']);
    Route::put('user/{ssn}', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('user/{ssn}', [\App\Http\Controllers\UserController::class, 'delete']);
    Route::get('users', [\App\Http\Controllers\UserController::class, 'getAllUsers']);
    Route::get('user/{ssn}', [\App\Http\Controllers\UserController::class, 'findBySSN']);

    // Reservations
    Route::post('reservation', [\App\Http\Controllers\ReservationController::class, 'save']);
    Route::delete('reservation/user/{user_id}', [\App\Http\Controllers\ReservationController::class, 'delete']);
    Route::get('reservations', [\App\Http\Controllers\ReservationController::class, 'getAllReservations']);
    Route::get('reservation/user/{user_id}', [\App\Http\Controllers\ReservationController::class, 'findByUserId']);
    Route::get('reservations/vaccination/{vaccination_id}', [\App\Http\Controllers\ReservationController::class, 'getAllOfVaccination']);

    // Vaccinations
    Route::post('vaccination', [\App\Http\Controllers\VaccinationController::class, 'save']);
    Route::put('vaccination/{id}', [\App\Http\Controllers\VaccinationController::class, 'update']);
    Route::delete('vaccination/{id}', [\App\Http\Controllers\VaccinationController::class, 'delete']);
    Route::get('vaccinations2', [\App\Http\Controllers\VaccinationController::class, 'getAllRaw']);
    Route::get('vaccination/{id}/users', [\App\Http\Controllers\VaccinationController::class, 'getUsersOfVaccination']);

    // Locations
    Route::post('location', [\App\Http\Controllers\VaccinationLocationController::class, 'save']);
    Route::put('location/{id}', [\App\Http\Controllers\VaccinationLocationController::class, 'update']);
    Route::delete('location/{id}', [\App\Http\Controllers\VaccinationLocationController::class, 'delete']);

    // States
    Route::post('state', [\App\Http\Controllers\StateController::class, 'save']);
    Route::put('state/{state}', [\App\Http\Controllers\StateController::class, 'update']);
    Route::delete('state/{state}', [\App\Http\Controllers\StateController::class, 'delete']);
});

// Vaccinations
Route::get('vaccinations', [\App\Http\Controllers\VaccinationController::class, 'getAllVaccinations']);
Route::get('vaccination/{id}', [\App\Http\Controllers\VaccinationController::class, 'findById']);
Route::get('vaccinations/state/{state}', [\App\Http\Controllers\VaccinationController::class, 'getAllOfState']);

// Locations
Route::get('locations', [\App\Http\Controllers\VaccinationLocationController::class, 'getAllLocations']);
Route::get('location/{id}', [\App\Http\Controllers\VaccinationLocationController::class, 'findById']);

// States
Route::get('states', [\App\Http\Controllers\StateController::class, 'getAllStates']);
Route::get('state/{state}', [\App\Http\Controllers\StateController::class, 'findByName']);
Route::get('state/{state}/locations', [\App\Http\Controllers\StateController::class, 'getStateLocations']);

