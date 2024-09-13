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
        Route::post('register', [EventController::class,'findAll']);
        Route::post('created', [EventController::class,'creatingEvent']);
        Route::post('checked_register', [EventController::class,'VerifiSignInEvent']);
        Route::post('remove', [EventController::class,'RemoveEvent']);
        
    });

});


Route::prefix('event')->group(function () {
    Route::get('findAll', [EventController::class,'findAll']);
    Route::get('details/{uuid_code}', [EventController::class,'detailsEvent']);
    Route::post('register', [EventController::class,'signupEvent']);
});

// Route::post("singUp", [AuthController::class,"singUp"])->middleware('auth');
