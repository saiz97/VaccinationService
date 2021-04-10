<?php

namespace Database\Seeders;

use App\Models\Vaccination;
use App\Models\VaccinationLocation;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VaccinationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Location 1
        $vacLo1_0 = new Vaccination;
        $vacLo1_0->date = Carbon::createFromFormat("Y.m.d", "2021.04.10", "Europe/Vienna");
        $vacLo1_0->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo1_0->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo1_0->availableSlots = 28;
        $vacLo1_0->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo1_0->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo1_0->vaccinationLocation()->associate(VaccinationLocation::find(1));
        $vacLo1_0->save();

        $vacLo1_1 = new Vaccination;
        $vacLo1_1->date = Carbon::createFromFormat("Y.m.d", "2021.04.13", "Europe/Vienna");
        $vacLo1_1->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo1_1->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo1_1->availableSlots = 28;
        $vacLo1_1->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo1_1->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo1_1->vaccinationLocation()->associate(VaccinationLocation::find(1));
        $vacLo1_1->save();

        $vacLo1_2 = new Vaccination;
        $vacLo1_2->date = Carbon::createFromFormat("Y.m.d", "2021.04.14", "Europe/Vienna");
        $vacLo1_2->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo1_2->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo1_2->availableSlots = 28;
        $vacLo1_2->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo1_2->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo1_2->vaccinationLocation()->associate(VaccinationLocation::find(1));
        $vacLo1_2->save();

        $vacLo1_3 = new Vaccination;
        $vacLo1_3->date = Carbon::createFromFormat("Y.m.d", "2021.04.15", "Europe/Vienna");
        $vacLo1_3->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo1_3->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo1_3->availableSlots = 28;
        $vacLo1_3->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo1_3->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo1_3->vaccinationLocation()->associate(VaccinationLocation::find(1));
        $vacLo1_3->save();

        $vacLo1_4 = new Vaccination;
        $vacLo1_4->date = Carbon::createFromFormat("Y.m.d", "2021.04.16", "Europe/Vienna");
        $vacLo1_4->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo1_4->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo1_4->availableSlots = 28;
        $vacLo1_4->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo1_4->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo1_4->vaccinationLocation()->associate(VaccinationLocation::find(1));
        $vacLo1_4->save();

        // Location 2
        $vacLo2_0 = new Vaccination;
        $vacLo2_0->date = Carbon::createFromFormat("Y.m.d", "2021.04.10", "Europe/Vienna");
        $vacLo2_0->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo2_0->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo2_0->availableSlots = 28;
        $vacLo2_0->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo2_0->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo2_0->vaccinationLocation()->associate(VaccinationLocation::find(2));
        $vacLo2_0->save();

        $vacLo2_1 = new Vaccination;
        $vacLo2_1->date = Carbon::createFromFormat("Y.m.d", "2021.04.13", "Europe/Vienna");
        $vacLo2_1->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo2_1->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo2_1->availableSlots = 28;
        $vacLo2_1->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo2_1->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo2_1->vaccinationLocation()->associate(VaccinationLocation::find(2));
        $vacLo2_1->save();

        $vacLo2_2 = new Vaccination;
        $vacLo2_2->date = Carbon::createFromFormat("Y.m.d", "2021.04.14", "Europe/Vienna");
        $vacLo2_2->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo2_2->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo2_2->availableSlots = 28;
        $vacLo2_2->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo2_2->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo2_2->vaccinationLocation()->associate(VaccinationLocation::find(2));
        $vacLo2_2->save();

        $vacLo2_3 = new Vaccination;
        $vacLo2_3->date = Carbon::createFromFormat("Y.m.d", "2021.04.15", "Europe/Vienna");
        $vacLo2_3->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo2_3->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo2_3->availableSlots = 28;
        $vacLo2_3->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo2_3->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo2_3->vaccinationLocation()->associate(VaccinationLocation::find(2));
        $vacLo2_3->save();

        $vacLo2_4 = new Vaccination;
        $vacLo2_4->date = Carbon::createFromFormat("Y.m.d", "2021.04.16", "Europe/Vienna");
        $vacLo2_4->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo2_4->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo2_4->availableSlots = 28;
        $vacLo2_4->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo2_4->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo2_4->vaccinationLocation()->associate(VaccinationLocation::find(2));
        $vacLo2_4->save();

        // Location 3
        $vacLo3_0 = new Vaccination;
        $vacLo3_0->date = Carbon::createFromFormat("Y.m.d", "2021.04.10", "Europe/Vienna");
        $vacLo3_0->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo3_0->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo3_0->availableSlots = 28;
        $vacLo3_0->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo3_0->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo3_0->vaccinationLocation()->associate(VaccinationLocation::find(3));
        $vacLo3_0->save();

        $vacLo3_1 = new Vaccination;
        $vacLo3_1->date = Carbon::createFromFormat("Y.m.d", "2021.04.13", "Europe/Vienna");
        $vacLo3_1->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo3_1->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo3_1->availableSlots = 28;
        $vacLo3_1->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo3_1->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo3_1->vaccinationLocation()->associate(VaccinationLocation::find(3));
        $vacLo3_1->save();

        $vacLo3_2 = new Vaccination;
        $vacLo3_2->date = Carbon::createFromFormat("Y.m.d", "2021.04.14", "Europe/Vienna");
        $vacLo3_2->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo3_2->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo3_2->availableSlots = 28;
        $vacLo3_2->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo3_2->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo3_2->vaccinationLocation()->associate(VaccinationLocation::find(3));
        $vacLo3_2->save();

        $vacLo3_3 = new Vaccination;
        $vacLo3_3->date = Carbon::createFromFormat("Y.m.d", "2021.04.15", "Europe/Vienna");
        $vacLo3_3->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo3_3->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo3_3->availableSlots = 28;
        $vacLo3_3->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo3_3->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo3_3->vaccinationLocation()->associate(VaccinationLocation::find(3));
        $vacLo3_3->save();

        $vacLo3_4 = new Vaccination;
        $vacLo3_4->date = Carbon::createFromFormat("Y.m.d", "2021.04.16", "Europe/Vienna");
        $vacLo3_4->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo3_4->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo3_4->availableSlots = 28;
        $vacLo3_4->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo3_4->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo3_4->vaccinationLocation()->associate(VaccinationLocation::find(3));
        $vacLo3_4->save();

        // Location 4
        $vacLo4_0 = new Vaccination;
        $vacLo4_0->date = Carbon::createFromFormat("Y.m.d", "2021.04.10", "Europe/Vienna");
        $vacLo4_0->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo4_0->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo4_0->availableSlots = 28;
        $vacLo4_0->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo4_0->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo4_0->vaccinationLocation()->associate(VaccinationLocation::find(4));
        $vacLo4_0->save();

        $vacLo4_1 = new Vaccination;
        $vacLo4_1->date = Carbon::createFromFormat("Y.m.d", "2021.04.13", "Europe/Vienna");
        $vacLo4_1->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo4_1->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo4_1->availableSlots = 28;
        $vacLo4_1->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo4_1->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo4_1->vaccinationLocation()->associate(VaccinationLocation::find(4));
        $vacLo4_1->save();

        $vacLo4_2 = new Vaccination;
        $vacLo4_2->date = Carbon::createFromFormat("Y.m.d", "2021.04.14", "Europe/Vienna");
        $vacLo4_2->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo4_2->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo4_2->availableSlots = 28;
        $vacLo4_2->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo4_2->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo4_2->vaccinationLocation()->associate(VaccinationLocation::find(4));
        $vacLo4_2->save();

        $vacLo4_3 = new Vaccination;
        $vacLo4_3->date = Carbon::createFromFormat("Y.m.d", "2021.04.15", "Europe/Vienna");
        $vacLo4_3->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo4_3->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo4_3->availableSlots = 28;
        $vacLo4_3->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo4_3->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo4_3->vaccinationLocation()->associate(VaccinationLocation::find(4));
        $vacLo4_3->save();

        $vacLo4_4 = new Vaccination;
        $vacLo4_4->date = Carbon::createFromFormat("Y.m.d", "2021.04.16", "Europe/Vienna");
        $vacLo4_4->fromTime = Carbon::createFromTime(10, 00, 00, "Europe/Vienna");
        $vacLo4_4->toTime = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");
        $vacLo4_4->availableSlots = 28;
        $vacLo4_4->slotSizeInMinutes = 15; // 15min * 28slots = 420min = 7h (10:00-17:00)
        $vacLo4_4->totalAttendeesPerSlot = 5; // count 5 people for each Slot (15min)
        $vacLo4_4->vaccinationLocation()->associate(VaccinationLocation::find(4));
        $vacLo4_4->save();
    }
}
