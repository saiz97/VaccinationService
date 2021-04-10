<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\User;
use App\Models\Vaccination;
use Illuminate\Database\Seeder;

class ReservationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $res1 = new Reservation;
        $res1->user()->associate(User::find(2));
        $res1->vaccination()->associate(Vaccination::find(1));
        $res1->selectedSlot = 3;
        $res1->save();

        $res2 = new Reservation;
        $res2->user()->associate(User::find(3));
        $res2->vaccination()->associate(Vaccination::find(1));
        $res2->selectedSlot = 3;
        $res2->save();

        $res3 = new Reservation;
        $res3->user()->associate(User::find(4));
        $res3->vaccination()->associate(Vaccination::find(1));
        $res3->selectedSlot = 6;
        $res3->save();
    }
}
