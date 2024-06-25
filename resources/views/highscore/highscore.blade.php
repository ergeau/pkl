<!-- resources/views/highscore.blade.php -->

<html>
<head>
    <title>Highscore</title>
</head>
<body>
    <h1>Your Highscore</h1>
    @if ($highscore)
        <p>Your highscore is: {{ $highscore->highscore }}</p>
    @else
        <p>No highscore found.</p>
    @endif
</body>
</html>
