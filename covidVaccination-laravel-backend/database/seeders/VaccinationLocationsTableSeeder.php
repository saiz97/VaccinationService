<?php

namespace Database\Seeders;

use App\Models\State;
use App\Models\VaccinationLocation;
use Illuminate\Database\Seeder;

class VaccinationLocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $loc = new VaccinationLocation;
        $loc->city = "Linz-Stadt";
        $loc->zipCode = "4030";
        $loc->place = "Volkshaus Ebelsberg | Kremsmünsterer Str. 1-3";
        $loc->state()->associate(State::find(1)); // OÖ
        $loc->save();

        $loc1 = new VaccinationLocation;
        $loc1->city = "Linz-Stadt";
        $loc1->zipCode = "4060";
        $loc1->place = "Kürnberghall Leonding | Limesstraße 8";
        $loc1->state()->associate(State::find(1)); // OÖ
        $loc1->save();

        $loc2 = new VaccinationLocation;
        $loc2->city = "3. Bezirk";
        $loc2->zipCode = "1030";
        $loc2->place = "Town Town | Thomas-Klestil-Platz 8/2";
        $loc2->state()->associate(State::find(3)); // W
        $loc2->save();

        $loc3 = new VaccinationLocation;
        $loc3->city = "10. Bezirk";
        $loc3->zipCode = "1030";
        $loc3->place = "Reisemedizinisches Impfservice | Kundratstraße 3, Pavillon C";
        $loc3->state()->associate(State::find(3)); // W
        $loc3->save();
    }
}
