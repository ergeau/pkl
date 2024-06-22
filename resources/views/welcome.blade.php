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
            justify-content: space-between;
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
            padding: 20px;
            text-align: center;
        }
        .section {
            background-color: #e2e2e2;
            padding: 50px;
            margin: 20px auto;
            border-radius: 8px;
            width: 80%;
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
            <a href="{{ url('/about') }}">About us</a> <!-- Link ke #about -->
            <a href="{{ url('/login') }}" class="login">Login</a>
            <a href="{{ url('/register') }}" class="register">Register</a>
        </div>
    </div>
    <div class="main">
        <div id="about" class="section">
        <h1>About Us</h1>
        <iframe src="{{ url('/about') }}" width="100%" height="800px" style="border:none;"></iframe>
        </div>
        <div id="leaderboard" class="section">
            <h1>Leaderboard</h1>
            <!-- Leaderboard content -->
        </div>
    </div>
</body>
</html>
