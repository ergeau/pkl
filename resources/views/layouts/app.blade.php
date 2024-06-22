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
            background-color: #f5f5f5;
        }
        .navbar {
            background-color: #333;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Mengatur jarak antar elemen secara merata */
            padding: 1rem;
        }
        .navbar a {
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            display: flex;
            align-items: center;
        }
        .navbar a:hover {
            background-color: #ddd;
            color: black;
        }
        .navbar .login {
            margin-left: auto;
        }
        .main {
            padding: 0px;
            text-align: center;
        }
        .section {
            background-color: #e2e2e2;
            padding: 50px;
            margin: 70px;
            border-radius: 8px;
        }
        .menu-right {
            display: flex;
            gap: 20px; /* Jarak antar menu */
        }
    </style>
    @yield('head')
</head>
<body>
    <div class="navbar">
        <a href="#">
            <img src="assets/logo.png" alt="LOGO" style="height: 50px;">
        </a>
        <div class="menu-right">
            <a href="#game">Permainan</a> <!-- Link ke #game -->
            <a href="#about">About us</a> <!-- Link ke #about -->
            <a href="#leaderboard">Leaderboard</a> <!-- Link ke #leaderboard -->
            <a href="{{ url('/login') }}" class="login">Login</a>
            <a href="{{ url('/register') }}" class="register">Register</a>
        </div>
    </div>
    <div class="main">
        @yield('content')
    </div>
</body>
</html>
