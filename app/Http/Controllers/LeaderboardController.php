<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        // Fetch the scores along with the user who achieved them, ordered by created_at in descending order
        $leaderboard = Score::with('user')->orderBy('created_at', 'asc')->get();

        // Pass the leaderboard data to the view
        return view('leaderboard/leaderboard', compact('leaderboard'));
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
