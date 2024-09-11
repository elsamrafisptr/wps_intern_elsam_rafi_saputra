<?php

namespace App\Http\Controllers;

use App\Models\Absences;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsencesController extends Controller
{
    public function index()
    {
        return Absences::with('user')->get();
    }

    public function show($id)
    {
        return Absences::findOrFail($id);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'log' => 'required',
            'proof_of_work' => 'nullable|file',
        ]);

        $log = Absences::create([
            'user_id' => $user->id,
            'log' => $validated['log'],
            'status' => 'pending',
            'proof_of_work' => $request->file('proof_of_work') ? $request->file('proof_of_work')->store('proofs') : null,
        ]);

        return response()->json($log, 201);
    }


    public function update(Request $request, $id)
    {
        $log = Absences::findOrFail($id);

        if (Auth::user()->isSupervisorOf($log->user)) {
            $log->status = $request->input('status');
            $log->save();
            return response()->json($log, 200);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }

    public function destroy($id)
    {
        Absences::destroy($id);
        return response()->json(null, 204);
    }
}
