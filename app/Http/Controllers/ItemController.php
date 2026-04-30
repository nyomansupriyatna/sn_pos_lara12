<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Models\cr;
use App\Models\Group;
use App\Models\Item;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $itemQuery = Item::query();
        $search = $request->search;

        if ($request->filled("search")) {
            $itemQuery = Item::whereHas(
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
        $totalCount = Item::query()->count();

        $filteredCount = $itemQuery->count();

        $perPage = (int) $request->perPage ?? 10;

        if ($perPage === -1) {
            $allItem = Item::whereHas(
                'groups',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('groups')
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->latest()->get()->map(fn($item) => [
                    'id' => $item->id,
                    'group_id' => $item->groups->id,
                    'group_name' => $item->groups->name,
                    'name' => $item->name,
                    'description' => $item->description,
                ]);

            $items = [
                'data' => $allItem,
                'total' => $filteredCount,
                'per_page' => $perPage,
                'from' => 1,
                'to' => $filteredCount,
                'links' => [],
            ];
        } else {
            $items = Item::whereHas(
                'groups',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('groups')
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->latest()->latest()->paginate($perPage)->withQueryString();

            $items->getCollection()->transform(fn($item) => [
                'id' => $item->id,
                'group_id' => $item->groups->id,
                'group_name' => $item->groups->name,
                'name' => $item->name,
                'description' => $item->description,
            ]);
        }

        // ................................................//
        $groups = Group::select('id', 'name', 'name as label')->get();

        // $item = DB::table('items')
        //     ->join('groups', 'groups.id', '=', 'items.group_id')
        //     ->select('items.id', 'groups.id as group_id', 'groups.name as group_name', 'items.name', 'items.description')
        //     ->paginate(10)
        //     ->withQueryString();

        // dd($item);

        return Inertia::render('items/index', [
            'items' => $items,
            'groups' => $groups,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ItemRequest $request)
    {
        $group_id = Group::where('name', $request->group_name)->first()->id;

        try {
            $item = Item::create([
                'group_id' => $group_id,
                'name' => $request->name,
                'description' => $request->description,
            ]);

            if ($item) {
                return redirect()->route('items.index')->with('success', 'Sub Group created successfully');
            }
            return redirect()->back()->with('error', 'Unable to create item. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create item...');
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ItemRequest $request, Item $item)
    {
        if ($request->group_name) {
            $group_id = Group::where('name', $request->group_name)->first()->id;
        }

        try {
            $item->group_id = $group_id;
            $item->name = $request->name;
            $item->description = $request->description;
            $item->save();

            if ($item) {
                return redirect()->route('items.index')->with('success', 'Sub Group updated successfully');
            }
            return redirect()->back()->with('error', 'Unable to update item. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update item...');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        try {
            if ($item) {
                $item->delete();
                return redirect()->route('items.index')->with('success', 'Sub Group deleted successfully');
            }
            return redirect()->back()->with('error', 'Unable to delete this sub group. Please try again.');
        } catch (Exception $e) {
            Log::error('Sub Group deleted failed.' . $e->getMessage());
        }
    }
}
