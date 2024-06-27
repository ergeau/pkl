<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="shortcut icon" href="{{ asset('template/assets/compiled/svg/favicon.svg') }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ asset('template/assets/compiled/css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('template/assets/compiled/css/app-dark.css') }}">
    <link rel="stylesheet" href="{{ asset('template/assets/compiled/css/auth.css') }}">
</head>

<body>
    <script src="{{ asset('template/assets/static/js/initTheme.js') }}"></script>
    <div id="auth">
        <div class="row h-100">
            <div class="col-lg-5 col-12">
                <div id="auth-left">
                    <div class="auth-logo">
                        <a href="/login"><img src="assets/logo2.png" alt="Logo" style="width: 70px; height: 70px;"></a>
                    </div>
                    <h1 class="auth-title">Login.</h1>
                    <p class="auth-subtitle mb-5">Login untuk bermain :D</p>

                    <form action="/login" method="post">
                        @csrf
                        <div class="form-group position-relative has-icon-left mb-4">
                            <input type="text" class="form-control form-control-xl" id="identifier" name="identifier" placeholder="Username or Email" required>
                            <div class="form-control-icon">
                                <i class="bi bi-person"></i>
                            </div>
                        </div>
                        <div class="form-group position-relative has-icon-left mb-4">
                            <input type="password" class="form-control form-control-xl" id="password" name="password" placeholder="Password" required>
                            <div class="form-control-icon">
                                <i class="bi bi-shield-lock"></i>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary btn-block btn-lg shadow-lg mt-5">Log in</button>
                    </form>

                </div>
            </div>
            <div class="col-lg-7 d-none d-lg-block">
                <div id="auth-right" class="d-flex justify-content-center align-items-center position-relative" style="height: 100vh; background: url('assets/mainan.png') repeat;">
                    <div class="overlay position-absolute w-100 h-100" style="background-color: rgba(0, 0, 50, 0.5);"></div>
                    <div class="content position-relative text-white" style="z-index: 1;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>

<!-- </style>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <form action="/login" method="post">
        @csrf
        <div class="input-group">
            <label for="identifier">Username or Email</label>
            <input type="text" id="identifier" name="identifier" required>
        </div>
        <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
    </form>
    </div>
</body>
</html> -->
