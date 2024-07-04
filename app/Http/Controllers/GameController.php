<?php

namespace App\Http\Controllers;

use App\Models\Highscore;
use Illuminate\Http\Request;
use App\Models\Score;
use PHPUnit\Runner\ErrorException;


class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return view('game.game');
        }catch (ErrorException $err){
            dump($err->getMessage());
        }
    }

    public function saveScore(Request $request)
    {
        try {
            $request->validate([
                'score' => 'required|integer',
            ]);

            $score = new Score();
            $score->skor = $request->score;
            $score->user_id = 1;
            $score->save();

            // save highest score, if highscore with id 1 not found create new highscore
            $highscore = Highscore::find(1);
            if ($highscore == null) {
                $highscore = new Highscore();
                $highscore->id = 1;
                $highscore->score = $request->score;
                $highscore->save();
            } else {
                if ($highscore->score < $request->score) {
                    $highscore->score = $request->score;
                    $highscore->save();
                }
            }

            return response()->json(['success' => true,'code' => 200,'message' => 'Score saved successfully']);
        }catch (ErrorException $err){
            dump($err->getMessage());
        }
    }

    public function leaderboard()
    {
        $scores = Score::with('user')->orderBy('skor', 'desc')->take(10)->get();
        return view('leaderboard.leaderboard', ['scores' => $scores]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
