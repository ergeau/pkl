<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Providers\RouteServiceProvider;
use App\Http\Controllers\GameController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\HighscoreController;




Route::get('/', function () {
    return view('welcome');
});

Route::resource('dashboard', DashboardController::class);
// // Route::resource('login', login::class);
Route::resource('game', GameController::class);
Route::resource('about', AboutController::class);
// Route::resource('leaderboard', leaderboard::class);

Route::group(['middleware' => ['prevent-back-history']],function(){

    Route::get('/login', [AuthController::class, 'index'])->middleware('guest');
    Route::post('/login', [AuthController::class, 'authenticate'])->middleware('guest')->name('login');
    Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');
});

Route::middleware('auth')->get('/highscore', [HighscoreController::class, 'getHighscore'])->name('highscore');
