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
    <div id="gameContainer"></div>
    <script src="{{ asset('js/phaser.min.js') }}"></script>
    <script src="{{ asset('js/game.js') }}"></script>
  </body>
</html>
