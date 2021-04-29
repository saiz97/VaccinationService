<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Seeder;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // OÖ
        $ooe = new State;
        $ooe->state = "Oberösterreich";
        $ooe->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Flag_of_Upper_Austria_%28state%29.svg/1280px-Flag_of_Upper_Austria_%28state%29.svg.png";
        $ooe->save();

        // NÖ
        $noe = new State;
        $noe->state = "Niederösterreich";
        $noe->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Flag_of_Lower_Austria_%28state%29.svg/1000px-Flag_of_Lower_Austria_%28state%29.svg.png";
        $noe->save();

        // W
        $w = new State;
        $w->state = "Wien";
        $w->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Vienna_%28state%29.svg/2000px-Flag_of_Vienna_%28state%29.svg.png";
        $w->save();

        // S
        $sb = new State;
        $sb->state = "Salzburg";
        $sb->imageUrl = "https://klo.de/wp-content/uploads/2019/10/flagge-salzburg-dienstflagge.gif";
        $sb->save();

        // Stm
        $stm = new State;
        $stm->state = "Steiermark";
        $stm->imageUrl = "https://www.fahnenwelt.com/media/image/8a/d4/70/3132683_600x600.jpg";
        $stm->save();

        // K
        $k = new State;
        $k->state = "Kärnten";
        $k->imageUrl = "https://www.nationalflaggen.de/media/flags/flagge-kaernten-dienstflagge.gif";
        $k->save();

        // Bgl
        $bgl = new State;
        $bgl->state = "Burgenland";
        $bgl->imageUrl = "https://www.nationalflaggen.de/media/flags/flagge-burgenland-dienstflagge.gif";
        $bgl->save();

        // T
        $t = new State;
        $t->state = "Tirol";
        $t->imageUrl = "https://hochtirol.files.wordpress.com/2010/03/flagge-tirol-fahne.jpg";
        $t->save();

        // Vb
        $vb = new State;
        $vb->state = "Vorarlberg";
        $vb->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_Vorarlberg_%28state%29.svg/2000px-Flag_of_Vorarlberg_%28state%29.svg.png";
        $vb->save();

    }
}
