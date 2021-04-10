<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VaccinationLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'state_id', 'city', 'zipCode', 'place'
    ];

    /**
     * location has many vaccinations
     */
    public function vaccinations() : HasMany {
        return $this->hasMany(Vaccination::class);
    }

    /**
     * location belongs to state
     */
    public function state() : BelongsTo {
        return $this->belongsTo(State::class);
    }
}
