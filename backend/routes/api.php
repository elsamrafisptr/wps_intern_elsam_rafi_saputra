<?php

use App\Http\Controllers\AbsencesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SectorController;

// User Authentication
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);

// User Routes
Route::get('/users', [UserController::class, 'index']); 
Route::get('/users/{id}', [UserController::class, 'show']); 
Route::put('/users/{id}', [UserController::class, 'update']); 

// Daily Logs (Absences)
Route::get('/absences', [AbsencesController::class, 'index']); 
Route::get('/absences/{id}', [AbsencesController::class, 'show']); 
Route::post('/absences', [AbsencesController::class, 'store']); 
Route::put('/absences/{id}', [AbsencesController::class, 'update']); 
Route::delete('/absences/{id}', [AbsencesController::class, 'destroy']); 

// Sector Routes
Route::get('/sectors', [SectorController::class, 'index']); 
Route::get('/sectors/{id}', [SectorController::class, 'show']); 
Route::post('/sectors', [SectorController::class, 'store']); 
Route::put('/sectors/{id}', [SectorController::class, 'update']); 
Route::delete('/sectors/{id}', [SectorController::class, 'destroy']); 
