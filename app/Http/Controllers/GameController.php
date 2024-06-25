<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('game.game');
    }

    public function tamat()
    {
        // Simpan highscore ke database
        if (Auth::check()) {
            $user_id = Auth::id();
            $totalScore = $this->totalScore; // Misalnya nilai highscore yang ingin disimpan
            
            // Cari atau buat entri highscore untuk pengguna saat ini
            $highscore = Highscore::updateOrCreate(
                ['user_id' => $user_id],
                ['highscore' => $totalScore]
            );
        }
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
