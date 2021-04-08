<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VaccinationLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'state', 'city', 'zipCode', 'place', 'imageUrl'
    ];

    /**
     * user has many books
     */
    public function vaccinations() : HasMany {
        return $this->hasMany(Vaccination::class);
    }
}
