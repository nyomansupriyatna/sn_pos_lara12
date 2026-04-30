<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Models\Group;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $groups = Group::query();
        $totalCount = $groups->count();

        if ($request->filled("search")) {

            // dd($request->all());

            $groups = Group::where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            )->paginate($request->perPage);
        }

        $filteredCount = $groups->count();
        $perPage = (int) $request->perPage ?? 10;

        if ($perPage === -1) {
            $allGroups = Group::orderBy('name')->get()->map(fn($portion) => [
                'id' => $portion->id,
                'name' => $portion->name,
                'description' => $portion->description,
            ]);

            $groups = [
                'data' => $allPortion,
                'totalCount' => $totalCount,
                'filteredCount' => $filteredCount,
                'per_page' => $perPage,
                'from' => 1,
                'to' => $filteredCount,
                'links' => [],
            ];
        } else {
            $groups =  Group::where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            )->orderBy('name')->paginate($perPage)->withQueryString();

            $groups->getCollection()->transform(fn($group) => [
                'id' => $group->id,
                'name' => $group->name,
                'description' => $group->description,
            ]);
        }

        // ----------------------------------
        return Inertia::render('groups/index', [
            'groups' => $groups,
            'filteredCount' => $filteredCount,
            'totalCount' => $totalCount,
            'perPage' => $perPage,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GroupRequest $request)
    {

        try {
            $group = Group::create([
                'name' => $request->name,
                'description' => $request->description,
            ]);

            if ($group) {
                return redirect()->route('groups.index')->with('success', 'Group created successfully');
            }
            return redirect()->back()->with('error', 'Unable to create group. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create groupxx');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GroupRequest $request, Group $group)
    {
        try {
            $group->name = $request->name;
            $group->description = $request->description;
            $group->save();

            if ($group) {
                return redirect()->route('groups.index')->with('success', 'Group created successfully');
            }

            return redirect()->back()->with('error', 'Unable to create group. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create group');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        try {
            if ($group) {
                $group->delete();
                return redirect()->route('groups.index')->with('success', 'Group deleted successfully');
            }
            return redirect()->back()->with('error', 'Unable to delete this group. Please try again.');
        } catch (Exception $e) {
            Log::error('Group deleted failed.' . $e->getMessage());
        }
    }
}
