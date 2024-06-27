<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Providers\RouteServiceProvider;
use App\Http\Controllers\GameController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\HighscoreController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\AkunController;





Route::get('/', function () {
    return view('login.index');
});

Route::resource('dashboard', DashboardController::class);
// // Route::resource('login', login::class);
Route::resource('game', GameController::class);
Route::resource('about', AboutController::class);
Route::resource('leaderboard', LeaderboardController::class);
Route::resource('akun', AkunController::class);

Route::group(['middleware' => ['prevent-back-history']],function(){

    Route::get('/login', [AuthController::class, 'index'])->middleware('guest');
    Route::post('/login', [AuthController::class, 'authenticate'])->middleware('guest')->name('login');
    Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');
});

Route::post('/save-score', [GameController::class, 'saveScore'])->middleware('auth');
Route::get('/leaderboard', [GameController::class, 'leaderboard'])->middleware('auth');

Route::middleware('auth')->get('/highscore', [HighscoreController::class, 'getHighscore'])->name('highscore');
