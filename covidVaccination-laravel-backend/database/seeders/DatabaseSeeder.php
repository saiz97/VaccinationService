<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(StatesTableSeeder::class);
        $this->call(VaccinationLocationsTableSeeder::class);
        $this->call(VaccinationsTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ReservationsTableSeeder::class);
    }
}
