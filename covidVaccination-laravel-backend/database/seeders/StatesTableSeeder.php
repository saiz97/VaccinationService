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
        $ooe->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Oberoesterreich_Wappen.svg/262px-Oberoesterreich_Wappen.svg.png";
        $ooe->save();

        // NÖ
        $noe = new State;
        $noe->state = "Niederösterreich";
        $noe->imageUrl = "https://austria-forum.org/attach/Wissenssammlungen/Symbole/Nieder%C3%B6sterreich_Landeswappen_und_Landesfarben/NOE.png";
        $noe->save();

        // W
        $w = new State;
        $w->state = "Wien";
        $w->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Wien_Wappen.svg/1200px-Wien_Wappen.svg.png";
        $w->save();

        // S
        $sb = new State;
        $sb->state = "Salzburg";
        $sb->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Salzburg_Wappen.svg/1200px-Salzburg_Wappen.svg.png";
        $sb->save();

        // Stm
        $stm = new State;
        $stm->state = "Steiermark";
        $stm->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Steiermark_Wappen.svg/1200px-Steiermark_Wappen.svg.png";
        $stm->save();

        // K
        $k = new State;
        $k->state = "Kärnten";
        $k->imageUrl = "https://www.sticker-store24.com/media/18/b1/3b/1604433546/44-02-002_kaernten-3-png.png";
        $k->save();

        // Bgl
        $bgl = new State;
        $bgl->state = "Burgenland";
        $bgl->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Burgenland_Wappen.svg/1200px-Burgenland_Wappen.svg.png";
        $bgl->save();

        // T
        $t = new State;
        $t->state = "Tirol";
        $t->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Tirol_Wappen.svg/2000px-Tirol_Wappen.svg.png";
        $t->save();

        // Vb
        $vb = new State;
        $vb->state = "Vorarlberg";
        $vb->imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Vorarlberg_CoA.svg/1200px-Vorarlberg_CoA.svg.png";
        $vb->save();

    }
}
