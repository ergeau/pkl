<?php

namespace App\Http\Controllers;

use App\Models\Highscore;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HighscoreController extends Controller
{
    public function index()
    {
        return view('highscore.highscore');
    }

    public function getHighscore()
    {
        if (Auth::check()) {
            $user_id = Auth::id();
            $highscore = Highscore::where('user_id', $user_id)->first();

            return view('highscore/highscore', ['highscore' => $highscore]);
        }
    }
}