<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::post('singIn', [AuthController::class, 'singIn']);
    Route::post('singUp', [AuthController::class, 'singUp']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});


// Rotas protegidas
Route::middleware('auth.jwt')->group(function () {
    Route::prefix('event')->group(function () {
        Route::post('singUp', [EventController::class,'findAll']);
        Route::post('creatingEvent', [EventController::class,'creatingEvent']);
    });
});


Route::prefix('event')->group(function () {
    Route::get('findAll', [EventController::class,'findAll']);
    Route::get('/details/{uuid_code}', [EventController::class,'detailsEvent']);
});

// Route::post("singUp", [AuthController::class,"singUp"])->middleware('auth');
