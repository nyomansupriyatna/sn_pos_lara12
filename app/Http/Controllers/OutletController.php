<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PropertyFormRequest;
use App\Models\Property;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('outlet/index');
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
    public function store(PropertyFormRequest $request)
    {

        // dd($request->all());

        try {
            $logo = null;

            $prop = Property::create([
                'name' => $request->name,
                'category' => $request->category,
                'address' => $request->address,
                'city' => $request->city,
                'contact' => $request->contact,
                'phone' => $request->phone,
                'email' => $request->email,
            ]);

            if ($request->file('filelogo')) {
                $logo = $request->file('filelogo');
                // $logoOriginalName = $logo->getClientOriginalName();
                $ext = $logo->getClientOriginalExtension();
                $fileName = $prop->id . '.' . $ext;
                $logo->storeAs('property', $fileName, 'public'); //ok

                $prop->update([
                    'logo' => 'property/' . $fileName
                ]);
            }

            if ($prop) {
                return redirect()->route('properties.index')->with('success', 'Property berhasil disimpan');
            }

            return redirect()->back()->with('error', 'Property gagal disimpan, silakan coba lagi');
        } catch (Exception $e) {

            Log::error('Property gagal dibuat: ' . $e->getMessage());
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
    public function edit(Property $property)
    {
        return Inertia::render('property/property-form', [
            'property' => $property,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PropertyFormRequest $request, Property $property)
    {
        // dd($request->all(), $property);
        // dd(session()->all());

        try {
            if ($request->file('filelogo')) {
                $logo = $request->file('filelogo');
                // $logoOriginalName = $logo->getClientOriginalName();
                $ext = $logo->getClientOriginalExtension();
                $fileName = $property->id . '.' . $ext;

                Storage::disk('public')
                    ->delete($property->logo);

                $logo->storeAs('property', $fileName, 'public'); //overwite existing file dengan nama sama
                $property->logo = 'property/' .  $fileName;
            }

            if ($property) {
                $property->update([
                    $property->name = $request->name,
                    $property->category = $request->category,
                    $property->address = $request->address,
                    $property->city = $request->city,
                    $property->contact = $request->contact,
                    $property->phone = $request->phone,
                    $property->email = $request->email,
                ]);

                // $property->update();
                return redirect()->route('properties.index')->with('success', 'Perubahan berhasil disimpan');
            }

            return redirect()->back()->with('error', 'Perubahan gagal disimpan, silakan coba lagi');
        } catch (Exception $e) {
            Log::error('Update failed.' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        // dd($property);

        try {
            if ($property) {
                if ($property->logo) {
                    Storage::disk('public')
                        ->delete($property->logo);
                    $property->delete();
                }
                return redirect()->route('properties.index')->with('success', 'Data berhasil dihapus!');
            }
            return redirect()->back()->with('error', 'Unable to delete this property. Please try again.');
        } catch (Exception $e) {
            Log::error('Property deleted failed.' . $e->getMessage());
        }
    }
}
