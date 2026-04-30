<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubgroupRequest;
use App\Models\cr;
use App\Models\Group;
use App\Models\Subgroup;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $subGroupQuery = Subgroup::query();
        $search = $request->search;

        if ($request->filled("search")) {

            $subGroupQuery = Subgroup::whereHas(
                'groups',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('groups')
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->get();
        }

        // capturing to total count before applying filters
        $totalCount = Subgroup::query()->count();

        $filteredCount = $subGroupQuery->count();

        $perPage = (int) $request->perPage ?? 10;

        if ($perPage === -1) {
            $allSubGroup = Subgroup::whereHas(
                'groups',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('groups')
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->latest()->get()->map(fn($subgroup) => [
                    'id' => $subgroup->id,
                    'group_id' => $subgroup->groups->id,
                    'group_name' => $subgroup->groups->name,
                    'name' => $subgroup->name,
                    'description' => $subgroup->description,
                ]);

            $subgroups = [
                'data' => $allSubGroup,
                'total' => $filteredCount,
                'per_page' => $perPage,
                'from' => 1,
                'to' => $filteredCount,
                'links' => [],
            ];
        } else {
            $subgroups = Subgroup::whereHas(
                'groups',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('groups')
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->latest()->paginate($perPage)->withQueryString();

            $subgroups->getCollection()->transform(fn($subgroup) => [
                'id' => $subgroup->id,
                'group_id' => $subgroup->groups->id,
                'group_name' => $subgroup->groups->name,
                'name' => $subgroup->name,
                'description' => $subgroup->description,
            ]);
        }

        // ................................................//
        $groups = Group::select('id', 'name', 'name as label')->get();

        // $subgroup = DB::table('subgroups')
        //     ->join('groups', 'groups.id', '=', 'subgroups.group_id')
        //     ->select('subgroups.id', 'groups.id as group_id', 'groups.name as group_name', 'subgroups.name', 'subgroups.description')
        //     ->paginate(10)
        //     ->withQueryString();

        // dd($subgroup);

        return Inertia::render('subgroups/index', [
            'subgroups' => $subgroups,
            'groups' => $groups,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SubgroupRequest $request)
    {
        $group_id = Group::where('name', $request->group_name)->first()->id;

        try {
            $subgroup = Subgroup::create([
                'group_id' => $group_id,
                'name' => $request->name,
                'description' => $request->description,
            ]);

            if ($subgroup) {
                return redirect()->route('subgroups.index')->with('success', 'Sub Group created successfully');
            }
            return redirect()->back()->with('error', 'Unable to create subgroup. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create subgroup...');
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SubgroupRequest $request, Subgroup $subgroup)
    {
        if ($request->group_name) {
            $group_id = Group::where('name', $request->group_name)->first()->id;
        }

        try {
            $subgroup->group_id = $group_id;
            $subgroup->name = $request->name;
            $subgroup->description = $request->description;
            $subgroup->save();

            if ($subgroup) {
                return redirect()->route('subgroups.index')->with('success', 'Sub Group updated successfully');
            }
            return redirect()->back()->with('error', 'Unable to update subgroup. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update subgroup...');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subgroup $subgroup)
    {
        try {
            if ($subgroup) {
                $subgroup->delete();
                return redirect()->route('subgroups.index')->with('success', 'Sub Group deleted successfully');
            }
            return redirect()->back()->with('error', 'Unable to delete this sub group. Please try again.');
        } catch (Exception $e) {
            Log::error('Sub Group deleted failed.' . $e->getMessage());
        }
    }
}
