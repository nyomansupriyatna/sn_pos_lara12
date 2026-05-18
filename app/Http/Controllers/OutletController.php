<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\OutletRequest;
use App\Models\Outlet;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $outlets = Outlet::paginate($request->perPage)->withQueryString();
        $totalCount = $outlets->count();

        $search = $request->search;
        if ($request->filled("search")) {
            $outlets = Outlet::where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('tax', 'like', "%{$search}%")
                    ->orWhere('service', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            )->paginate($request->perPage);
        }

        $filteredCount = $outlets->count();
        $perPage = (int) $request->perPage ?? 10;

        return Inertia::render('outlet/index', [
            'outlets' => $outlets,
            'filteredCount' => $filteredCount,
            'totalCount' => $totalCount,
            'perPage' => $perPage,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('property/property-form');
    }

    /**
     * Store a newly created resource in storage.
     * @param PropertyFormRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(OutletRequest $request)
    {
        // dd($request->all());

        try {
            $outlet = Outlet::create([
                'name' => $request->name,
                'service' => $request->service,
                'tax' => $request->tax,
                'description' => $request->description,
            ]);

            if ($outlet) {
                return redirect()->route('outlets.index')->with('success', 'Outlet created successfully');
            }
            return redirect()->back()->with('error', 'Unable to create outlet. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create outlet');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        return Inertia::render('property/property-form', [
            'property' => $property,
            'isView' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Outlet $property)
    {
        return Inertia::render('property/property-form', [
            'property' => $property,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OutletRequest $request, Outlet $outlet)
    {
        // dd($request->all());

        try {
            $outletImagePath = null;

            if ($request->hasFile('image')) {
                $outletImagePath = $request->file('image')->store('outlets', 'public');
            }

            $outlet->name = $request->name;
            $outlet->service = $request->service;
            $outlet->tax = $request->tax;
            $outlet->description = $request->description;

            if ($outletImagePath) {
                $outlet->image = $outletImagePath;
            }

            $outlet->save();

            if ($outlet) {
                return redirect()->route('outlets.index')->with('success', 'Outlet updated successfully');
            }
            return redirect()->back()->with('error', 'Unable to update outlet. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update outlet');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Outlet $outlet)
    {
        // dd($outlet);

        try {
            if ($outlet) {
                $outlet->delete();
                return redirect()->route('outlets.index')->with('success', 'Outlet deleted successfully');
            }
            return redirect()->back()->with('error', 'Unable to delete this outlet. Please try again.');
        } catch (Exception $e) {
            Log::error('Outlet deleted failed.' . $e->getMessage());
        }
    }
}
