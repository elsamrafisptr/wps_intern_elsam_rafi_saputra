<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    public function index()
    {
        return Sector::all();
    }

    public function show($id)
    {
        return Sector::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
        ]);

        $sector = Sector::create($validated);
        return response()->json($sector, 201);
    }

    public function update(Request $request, $id)
    {
        $sector = Sector::findOrFail($id);
        $sector->update($request->all());
        return response()->json($sector, 200);
    }

    public function destroy($id)
    {
        Sector::destroy($id);
        return response()->json(null, 204);
    }
}
