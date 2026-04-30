<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $permissionQuery = Permission::query();
        $totalCount = $permissionQuery->count();

        $search = $request->search;
        if ($request->filled("search")) {
            $permissionQuery->where(
                fn($query) =>
                $query->where('label', 'like', "%{$search}%")
                    ->orWhere('module', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            );
        }

        $filteredCount = $permissionQuery->count();
        $perPage = (int) $request->perPage ?? 10;

        if ($perPage === -1) {
            dump('if.....');
            $allPermissions = Permission::orderBy('label')->get()->map(fn($Permission) => [
                'id' => $Permission->id,
                'label' => $Permission->label,
                'module' => $Permission->module,
                'description' => $Permission->description,
            ]);

            $permissions = [
                'data' => $allPermissions,
                'total' => $filteredCount,
                'per_page' => $perPage,
                'from' => 1,
                'to' => $filteredCount,
                'links' => [],
            ];
        } else {

            $permissions =  Permission::where(
                fn($query) =>
                $query->where('label', 'like', "%{$search}%")
                    ->orWhere('module', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            )->orderBy('label')->paginate($perPage)->withQueryString();

            $permissions->getCollection()->transform(fn($Permission) => [
                'id' => $Permission->id,
                'label' => $Permission->label,
                'module' => $Permission->module,
                'description' => $Permission->description,
            ]);
        }


        // ----------------------------------------------------
        // $permissions = Permission::latest()->paginate(10);
        return Inertia::render('permissions/index', [
            'permissions' => $permissions,
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionRequest $request)
    {
        // dd($request);
        $permission = Permission::create([
            'module' => $request->module,
            'label' => $request->label,
            'name' => Str::slug($request->label),
            'description' => $request->description,
        ]);

        if ($permission) {
            return redirect()->route('permissions.index')->with('success', 'Permission created successfuly.');
        }
        return redirect()->back()->with('error', 'Unable to create permission. Please try again!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PermissionRequest $request, Permission $permission)
    {
        if ($permission) {

            $permission->module = $request->module;
            $permission->label = $request->label;
            $permission->name = Str::slug($request->label);
            $permission->description = $request->description;

            $permission->save();
            return redirect()->route('permissions.index')->with('success', 'Permission updated successfuly.');
        }
        return redirect()->back()->with('error', 'Unable to update permission. Please try again!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        if ($permission) {
            $permission->delete();
            return redirect()->route('permissions.index')->with('success', 'Permission deleted successfuly.');
        }
        return redirect()->back()->with('error', 'Unable to delete permission. Please try again!');
    }
}
