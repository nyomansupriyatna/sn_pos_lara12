<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class printServerController extends Controller
{
    public function index() {}

    public function print(Request $request)
    {
        $text = "=== TOKO MAJU JAYA ===\n";
        $text .= "Item A   2 x 5000\n";
        $text .= "Total    10000\n";
        $text .= "Terima Kasih\n";

        Http::withHeaders([
            'Content-Type' => 'text/plain'
        ])->post('http://localhost:5000/print/', $text);

        return response()->json(['berhasil' => true]);
    }
}
