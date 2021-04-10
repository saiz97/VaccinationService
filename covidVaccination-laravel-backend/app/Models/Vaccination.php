<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;

    protected $fillable = [
        'date', 'fromTime', 'toTime',
        'availableSlots', 'slotSizeInMinutes',
        'totalAttendeesPerSlot',
        'vaccinationLocation_id'
    ];

    public function vaccinationLocation() : BelongsTo {
        return $this->belongsTo(VaccinationLocation::class);
    }

    /**
     * vaccination has many users
     */
    public function reservations() : HasMany {
        return $this->hasMany(Reservation::class);
    }
}
