<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::post('singIn', [AuthController::class, 'singIn']);
    Route::post('singUp', [AuthController::class, 'singUp']);
    Route::post('refresh', [AuthController::class,'refreshToken']);
    Route::post('me', [AuthController::class,'me']);
});


// Rotas protegidas
Route::middleware('auth.jwt')->group(function () {
    
    Route::prefix('event')->group(function () {
        // Route::post('register', [EventController::class,'find']);
        Route::post('created', [EventController::class,'Created']);
        Route::post('checked_register', [EventController::class,'CheckedRegister']);
        Route::post('remove', [EventController::class,'Remove']);
        Route::post('me', [EventController::class,'Me']);
        // Route::post('edit', [EventController::class, 'Edit']);
        Route::put('{uuid_code}', [EventController::class,'Update']);
        Route::post('register', [EventController::class,'Register']);
        Route::delete('{uuid_code}', [EventController::class,'delete']);
    });

});


Route::prefix('event')->group(function () {
    Route::get('', [EventController::class,'Find']);
    Route::get('{uuid_code}', [EventController::class,'Details']);
});

// Route::post("singUp", [AuthController::class,"singUp"])->middleware('auth');
