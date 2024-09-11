<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'sector_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }

    public function logs()
    {
        return $this->hasMany(Absences::class);
    }

    public function isSupervisorOf(User $user)
    {
        if ($this->role === 'director') {
            return true;
        }

        if ($this->role === 'manager' && $this->sector_id === $user->sector_id) {
            return true;
        }

        return false;
    }
}
