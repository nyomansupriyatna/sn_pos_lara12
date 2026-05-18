<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrencyRequest;
use App\Http\Requests\GroupRequest;
use App\Models\Currency;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $currencies = Currency::query();
        $totalCount = (int) $currencies->count();

        if ($request->filled("search")) {
            $currencies = Currency::where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('exc_rate', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            )->orderBy('currency')->paginate($request->perPage);
        }

        $filteredCount = $currencies->count();
        $perPage = (int) $request->perPage ?? 10;

        if ($perPage === -1) {
            $allCurrency = Currency::orderBy('name')->get()->map(fn($currency) => [
                'id' => $currency->id,
                'name' => $currency->name,
                'exc_rate' => number_format($currency->exc_rate, 0),
            ]);

            $currencies = [
                'data' => $allCurrency,
                'totalCount' => $totalCount,
                'filteredCount' => $filteredCount,
                'per_page' => $perPage,
                'to' => $filteredCount,
                'links' => [],
            ];
        } else {
            $currencies =  Currency::where(
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('exc_rate', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            )->orderBy('currency')->paginate($perPage)->withQueryString();

            $currencies->getCollection()->transform(fn($group) => [
                'id' => $group->id,
                'name' => $group->name,
                'exc_rate' => number_format($group->exc_rate, 0),
                'description' => $group->description,
            ]);
        }

        // ----------------------------------
        return Inertia::render('currencies/index', [
            'datasources' => $currencies,
            'filteredCount' => $filteredCount,
            'totalCount' => $totalCount,
            'perPage' => $perPage,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CurrencyRequest $request)
    {
        // $c = (int) $request->exc_rate;
        // dd($request->all());

        try {
            $currency = Currency::create([
                'name' => $request->name,
                'exc_rate' => $request->exc_rate,
                'description' => $request->description,
            ]);

            if ($currency) {
                return redirect()->route('currencies.index')->with('success', 'Currency created successfully');
            }
            return redirect()->back()->with('error', 'Unable to create currency. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create currency');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CurrencyRequest $request, Currency $currency)
    {
        try {
            $currency->name = $request->name;
            $currency->exc_rate = $request->exc_rate;
            $currency->description = $request->description;
            $currency->save();

            if ($currency) {
                return redirect()->route('currencies.index')->with('success', 'Currency updated successfully');
            }

            return redirect()->back()->with('error', 'Unable to update currency. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update currency');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Currency $currency)
    {
        try {
            if ($currency) {
                $currency->delete();
                return redirect()->route('currencies.index')->with('success', 'Currency deleted successfully');
            }
            return redirect()->back()->with('error', 'Unable to delete this currency. Please try again.');
        } catch (Exception $e) {
            Log::error('Currency deleted failed.' . $e->getMessage());
        }
    }
}
