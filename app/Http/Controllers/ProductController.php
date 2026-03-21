<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('product/app'); // root react
    }

    public function getData()
    {
        return Product::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|mimes:jpg,jpeg|max:2048'
        ]);

        $filename = null;

        if ($request->hasFile('image')) {
            $filename = time() . '.jpg';
            $request->file('image')
                ->storeAs('products', $filename, 'public');
        }

        return Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'image' => $filename
        ]);
    }

    public function update(Request $request, Product $product)
    {
        if ($request->hasFile('image')) {

            if ($product->image) {
                Storage::disk('public')
                    ->delete('products/' . $product->image);
            }

            $filename = time() . '.jpg';
            $request->file('image')
                ->storeAs('products', $filename, 'public');

            $product->image = $filename;
        }

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return $product;
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')
                ->delete('products/' . $product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
