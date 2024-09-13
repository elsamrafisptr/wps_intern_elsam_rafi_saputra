<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate input using validate method
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(6)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
            'role' => 'required|string|max:100',
            'sector_id' => 'required|exists:sectors,id',
        ]);

        // Create User with mass assignment protection
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'staff',
            'sector_id' => $validated['sector_id'] ?? null,
        ]);

        if ($user) {
            return response()->json([
                'success' => true,
                'message' => 'User created successfully'
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to create user'
        ], 500);
    }

    public function login(Request $request)
    {
        // Validate input
        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        // Auth login using attempt
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $request->authenticate();
            $request->session()->regenerate();
            $token = $request->user()->createToken('auth');

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'token' => $token->plainTextToken,
                'user' => $user,
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Get User Data Success',
            'user' => $request->user()
        ]);
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            // Revoke all tokens for the user
            $request->user()->tokens()->delete();

            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'message' => 'Logged out successfully',
            ], 200);
        }

        return response()->json([
            'error' => 'Unauthorized',
        ], 401);
    }
}
