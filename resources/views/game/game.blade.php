<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Menghitung Daun</title>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
      }
      #gameContainer {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <script src="src/phaser.min.js"></script>
    <script src="src/game.js"></script>
  </head>
  <body>
    <div class="navbar">
          <a href="#">
                  <img src="assets/logo.png" alt="LOGO" style="height: 50px;">
              </a>
          <a href="#game">Permainan</a> <!-- Link ke #game -->
          <a href="#about">About us</a> <!-- Link ke #about -->
          <a href="#leaderboard">Leaderboard</a> <!-- Link ke #leaderboard -->
          <a href="{{ url('/logout') }}" class="logout">logout</a>
      </div>
      <div class="main">
          @yield('content')
      </div>
    <div id="gameContainer"></div>
    <script src="{{ asset('js/phaser.min.js') }}"></script>
    <script src="{{ asset('js/game.js') }}"></script>
  </body>
</html>
