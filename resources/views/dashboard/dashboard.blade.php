@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
    <div class="main">
        <div id="game" class="section">
            <h1>Permainan</h1>
            <div id="gameContainer"></div>
            <iframe src="{{ url('/game') }}" width="100%" height="800px" style="border:none;"></iframe>
        </div>
        <div id="about" class="section">
        <h1>About Us</h1>
        <iframe src="{{ url('/about') }}" width="100%" height="800px" style="border:none;"></iframe>
        </div>
        <div id="leaderboard" class="section">
            <h1>Leaderboard</h1>
            <!-- Leaderboard content -->
        </div>
    </div>
@endsection
