@extends('layouts.layout')
@section('model')

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Dashboard')</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #fff;
        }
        .navbar {
            background-color: #333;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Mengatur jarak antar elemen secara merata */
            padding: 1rem;
        }
        .main {
            padding: 0px;
            text-align: center;
        }
        .section {
            background-color: #e2e2e2;
            padding: 20px;
            margin: 50px;
            border-radius: 8px;
            text-align: center;

        }
        .menu-right {
            display: flex;
            gap: 20px; /* Jarak antar menu */
        }
    </style>
    @yield('head')
</head>
<body>
    <div class="main">
        <div id="game" class="section">
            <h1>Permainan</h1>
            <div id="gameContainer"></div>
                <iframe src="{{ url('/game') }}" width="80%" height="800px" style="border:none; border: 2px solid #000; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin-top: 20px;"></iframe>
        </div>
        <div id="about" class="section">
            <h1>About Us</h1>
            <div id="aboutContent"></div>
                <iframe src="{{ url('/about') }}" width="80%" height="800px" style="border:none; border: 2px solid #000; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin-top: 20px;"></iframe>
            </div>
        </div>
        <div id="leaderboard" class="section">
            <h1>Leaderboard</h1>
            <div id="leaderboardContent"></div>
                <iframe src="{{ url('/leaderboard') }}" width="80%" height="800px" style="border:none; border: 2px solid #000; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin-top: 20px;"></iframe>
            </div>
        </div>
    </div>
</body>
</html>

@endsection