<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Http\Requests\PortionRequest;
use App\Models\cr;
use App\Models\Currency;
use App\Models\Group;
use App\Models\Item;
use App\Models\Outlet;
use App\Models\Portion;
use App\Models\Subgroup;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Ramsey\Uuid\Type\Integer;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        // dump($request->group_id);

        $outlets = Outlet::orderBy('name')->get();
        $groups = Group::orderBy('id')->get();

        $group_id = '0';

        if ($request->group_id) {
            $group_id = Group::find($request->group_id)->id;
            // dd($group_id);
        }

        if ($group_id === '0') {
            $subgroups = Subgroup::with('groups')
                ->orderBy('group_id')->get()->map(fn($subgroup) => [
                    'id' => $subgroup->id,
                    'group_id' => $subgroup->group_id,
                    'group_name' => $subgroup->groups->name,
                    'name' => $subgroup->name,
                    'label' => $subgroup->groups->name . ' (' . $subgroup->name . ')',
                    'description' => $subgroup->description,
                ]);
        } else {
            $subgroups = Subgroup::with('groups')
                ->where('group_id', $group_id)
                ->orderBy('group_id')->get()->map(fn($subgroup) => [
                    'id' => $subgroup->id,
                    'group_id' => $subgroup->group_id,
                    'group_name' => $subgroup->groups->name,
                    'name' => $subgroup->name,
                    'label' => $subgroup->groups->name . ' (' . $subgroup->name . ')',
                    'description' => $subgroup->description,
                ]);
        }

        $portions = Portion::orderBy('name')->get()->map(fn($port) => [
            'id' => $port->id,
            'name' => $port->name,
            'label' => $port->name . ' (' . $port->description . ')',
        ]);

        $currencies = Currency::orderBy('name')->get()->map(fn($curr) => [
            'id' => $curr->id,
            'name' =>  $curr->name,
            'label' =>  $curr->name . ' (' . $curr->description . ')',
        ]);

        $datasources = Item::paginate($request->perPage)->withQueryString();
        $totalCount = $datasources->count();

        $search = $request->search;
        if ($request->filled("search")) {
            $datasources = Item::whereHas(
                'outlet',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('outlet')->orWhereHas(
                'group',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('group')->orWhereHas(
                'subgroup',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('subgroup')->orWhereHas(
                'portion',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('portion')->orWhereHas(
                'currency',
                function ($query) use ($search) {
                    $query->where('name', 'like',  "%{$search}%");
                }
            )->with('currency')
                ->orWhere(
                    fn($query) =>
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('price', 'like', "%{$search}%")
                        ->orWhere('happy_hour_price', 'like', "%{$search}%")
                        ->orWhere('cost_percentage', 'like', "%{$search}%")
                        ->orWhere('recipe_code', 'like', "%{$search}%")
                        ->orWhere('printer_kitchen_list', 'like', "%{$search}%")
                )->paginate($request->perPage)->withQueryString();

            $datasources->getCollection()->transform(fn($item) => [
                'id' => $item->id,
                'outlet_id' => $item->outlet_id,
                'outlet_name' => $item->outlet->name,
                'group_id' => $item->group_id,
                'group_name' => $item->group->name,
                'subgroup_id' => $item->subgroup_id,
                'subgroup_name' => $item->subgroup->name,
                'portion_id' => $item->portion_id,
                'portion_name' => $item->portion->name,
                'name' => $item->name,
                'description' => $item->description,
                'currency_id' => $item->currency_id,
                'currency_name' => $item->currency->name,
                'price' => number_format($item->price, 0),
                'happy_hour_price' => number_format($item->happy_hour_price, 0),
                'cost_percentage' => number_format($item->cost_percentage, 0),
                'recipe_code' => $item->recipe_code,
                'printer_kitchen_list' => $item->printer_kitchen_list,
            ]);
        } else {
            $datasources = Item::with(['outlet', 'group', 'subgroup', 'portion', 'currency'])->latest()->paginate($request->perPage)->withQueryString();

            $datasources->getCollection()->transform(fn($item) => [
                'id' => $item->id,
                'outlet_id' => $item->outlet_id,
                'outlet_name' => $item->outlet->name,
                'group_id' => $item->group_id,
                'group_name' => $item->group->name,
                'subgroup_id' => $item->subgroup_id,
                'subgroup_name' => $item->subgroup->name,
                'portion_id' => $item->portion_id,
                'portion_name' => $item->portion->name,
                'name' => $item->name,
                'description' => $item->description,
                'currency_id' => $item->currency_id,
                'currency_name' => $item->currency->name,
                'price' => number_format($item->price, 0),
                'happy_hour_price' => number_format($item->happy_hour_price, 0),
                'cost_percentage' => number_format($item->cost_percentage, 0),
                'recipe_code' => $item->recipe_code,
                'printer_kitchen_list' => $item->printer_kitchen_list,
            ]);
        }

        return Inertia::render('items/index', [
            'datasources' =>  $datasources,
            'outlets' => $outlets,
            'groups' => $groups,
            'subgroups' => $subgroups,
            'portions' => $portions,
            'currencies' =>  $currencies,
            'totalCount' => $totalCount,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $group_id = Subgroup::find($request->subgroup_id)->group_id;

        dd($request->all(), $group_id);

        try {

            if ($request->file('image_path')) {
                $image = $request->file('image_path');
                // $imageOriginalName = $image->getClientOriginalName();
                $ext = $image->getClientOriginalExtension();
                $fileName = $request->name . '.' . $ext;

                $image->storeAs('items', $fileName, 'public'); //overwite existing file dengan nama sama
                $image_path = 'items/' .  $fileName;
            }

            $item = Item::create([
                'outlet_id' =>  (int) ($request->outlet_id),
                'group_id' =>  (int) ($group_id),
                'subgroup_id' =>  (int) ($request->subgroup_id),
                'portion_id' =>  (int) ($request->portion_id),
                'name' => $request->name,
                'description' => $request->description,
                'currency_id' =>  (int) ($request->currency_id),
                'price' =>  (int) ($request->price),
                'happy_hour_price' => (int) $request->happy_hour_price,
                'cost_percentage' => $request->cost_percentage,
                'recipe_code' => $request->recipe_code,
                'image_path' => $image_path,
            ]);

            if ($item) {
                return redirect()->route('items.index')->with('success', 'Item created successfully');
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
        dd($request->all());

        try {
            $item->name = $request->name;
            $item->description = $request->description;
            $item->save();

            if ($item) {
                return redirect()->route('items.index')->with('success', 'Portion updated successfully');
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
