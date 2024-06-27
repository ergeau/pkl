<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score;


class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('game.game');
    }

    public function saveScore(Request $request)
    {
        $request->validate([
            'score' => 'required|integer',
        ]);

        $score = new Score();
        $score->skor = $request->score;
        $score->user_id = auth()->user()->id;
        $score->save();

        return response()->json(['message' => 'Score saved successfully']);
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
