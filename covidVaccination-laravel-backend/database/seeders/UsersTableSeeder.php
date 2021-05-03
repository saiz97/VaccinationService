<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User;
            $admin->ssn = "2233230779"; // 10 stellig
            $admin->email = "hans@impfservice.at";
            $admin->firstName = "Hans";
            $admin->lastName = "Jürgen";
            $admin->password = bcrypt('admin');
            $admin->gender = "male";
            $admin->dateOfBirth = Carbon::createFromFormat('Y.m.d', '1979.07.23');
            $admin->phoneNumber = "";
            $admin->isAdmin = true;
        $admin->save();

        $user1 = new User;
            $user1->ssn = "2586231197"; // 10 stellig
            $user1->email = "daniel@saiz.at";
            $user1->firstName = "Daniel";
            $user1->lastName = "Saiz";
            $user1->password = bcrypt('dsaiz');
            $user1->gender = "male";
            $user1->dateOfBirth = Carbon::createFromFormat('Y.m.d', '1997.11.23');
            $user1->phoneNumber = "";
        $user1->save();

        $user2 = new User;
            $user2->ssn = "1000030499"; // 10 stellig
            $user2->email = "susi@sommer.at";
            $user2->firstName = "Susi";
            $user2->lastName = "Sommer";
            $user2->password = bcrypt('ssommer');
            $user2->gender = "female";
            $user2->dateOfBirth = Carbon::createFromFormat('Y.m.d', '1999.04.03');
            $user2->phoneNumber = "";
        $user2->save();

        $user3 = new User;
            $user3->ssn = "9898151290"; // 10 stellig
            $user3->email = "verena@hofer.at";
            $user3->firstName = "Verena";
            $user3->lastName = "Hofer";
            $user3->password = bcrypt('vhofer');
            $user3->gender = "female";
            $user3->dateOfBirth = Carbon::createFromFormat('Y.m.d', '1990.12.15');
            $user3->phoneNumber = "";
        $user3->save();
    }
}
