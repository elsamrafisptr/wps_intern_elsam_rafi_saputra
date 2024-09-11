<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absences extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'log',
        'status',
        'proof_of_work',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
