<?php

namespace App\Http\Controllers;

use App\Http\Requests\PortionRequest;
use App\Models\cr;
use App\Models\Portion;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PortionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $portionQuery = Portion::latest();
        $totalCount = $portionQuery->count();

        $search = $request->search;
        if ($request->filled("search")) {
            $portionQuery = Portion::where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            );
        }

        $filteredCount = $portionQuery->count();
        $perPage = (int) $request->perPage ?? 10;

        if ($perPage === -1) {
            $allPortion = Portion::orderBy('name')->get()->map(fn($portion) => [
                'id' => $portion->id,
                'name' => $portion->name,
                'description' => $portion->description,
            ]);

            $portions = [
                'data' => $allPortion,
                'totalCount' => $totalCount,
                'filteredCount' => $filteredCount,
                'per_page' => $perPage,
                'from' => 1,
                'to' => $filteredCount,
                'links' => [],
            ];
        } else {
            $portions =  Portion::where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            )->orderBy('name')->paginate($perPage)->withQueryString();

            $portions->getCollection()->transform(fn($portion) => [
                'id' => $portion->id,
                'name' => $portion->name,
                'description' => $portion->description,
            ]);
        }

        // dd($portionQuery);

        return Inertia::render('portions/index', [
            'datasources' => $portions,
            'filteredCount' => $filteredCount,
            'totalCount' => $totalCount,
            'perPage' => $perPage,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(portionRequest $request)
    {

        try {
            $portion = Portion::create([
                'name' => $request->name,
                'description' => $request->description,
            ]);

            if ($portion) {
                return redirect()->route('portions.index')->with('success', 'Portion created successfully');
            }
            return redirect()->back()->with('error', 'Unable to create portion. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create portion...');
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(portionRequest $request, Portion $portion)
    {

        try {
            $portion->name = $request->name;
            $portion->description = $request->description;
            $portion->save();

            if ($portion) {
                return redirect()->route('portions.index')->with('success', 'Portion updated successfully');
            }
            return redirect()->back()->with('error', 'Unable to update portion. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update portion...');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portion $portion)
    {
        try {
            if ($portion) {
                $portion->delete();
                return redirect()->route('portions.index')->with('success', 'Portion deleted successfully');
            }
            return redirect()->back()->with('error', 'Unable to delete this portion. Please try again.');
        } catch (Exception $e) {
            Log::error('Portion deleted failed.' . $e->getMessage());
        }
    }
}
