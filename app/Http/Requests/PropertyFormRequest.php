<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Pest\Support\Arr;
use Symfony\Component\HttpFoundation\Request;

class PropertyFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {


        return [
            'name' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'address' => 'required|string|max:200',
            'city' => 'required|string|max:60',
            'contact' => 'nullable|string|max:60',
            'phone' => 'nullable|string|max:60',
            'email' => 'nullable|string|max:100',
            'filelogo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Silakan masukkan nama property',
            'name.string' => 'Nama property harus berupa string',
            'name.max' => 'Tidak boleh lebih dari 100 karakter',
            'category.required' => 'Silakan masukkan category',
            'category.string' => 'Category harus berupa string',
            'category.max' => 'Tidak boleh lebih dari 100 karakter',
            'address.required' => 'Silakan masukkan alamat',
            'address.string' => 'Alamat harus berupa string',
            'address.max' => 'Tidak boleh lebih dari 200 karakter',
            'city.required' => 'Silakan masukkan city',
            'city.string' => 'City harus berupa string',
            'city.max' => 'Tidak boleh lebih dari 200 karakter',
            'contact.string' => 'Contact harus berupa string',
            'contact.max' => 'Tidak boleh lebih dari 200 karakter',
            'phone.string' => 'Phone harus berupa string',
            'phone.max' => 'Tidak boleh lebih dari 200 karakter',
            'filelogo.image' => 'Logo harus berupa image',
            'filelogo.max' => 'Ukuran file tidak boleh lebih dari 2048 KB',
            'filelogo.mimes' => 'Image harus berupa: jpeg, jpg, png atau gif',
        ];
    }
}
