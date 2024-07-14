<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/js/game.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 20px;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Skor</th>
                    <th>Waktu</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($leaderboard as $score)
                    <tr>
                        <td>{{ $score->user->nama }}</td> <!-- Assuming 'name' is the column in 'users' table -->
                        <td>{{ $score->skor }}</td>
                        <td>{{ $score->created_at }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
