<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        } else {
            return view('login.index', ['title' => 'Login']);
        }
        //
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'identifier' => ['required', 'string'],
            'password' => ['required'],
        ]);

        if (filter_var($credentials['identifier'], FILTER_VALIDATE_EMAIL)) {
            $credentials['email'] = $credentials['identifier'];
            unset($credentials['identifier']);
        } else {
            $credentials['id'] = $credentials['identifier'];
            unset($credentials['identifier']);
        }

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'loginError' => 'Login Gagal',
        ])->onlyInput('loginError');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

}
