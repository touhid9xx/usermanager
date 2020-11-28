<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
           'first_name' => 'required|string|max:155',
           'last_name' => 'required|string|max:155',
           'middle_name' => 'required|string|max:155',
           'email' => 'required|string|max:155|email|unique:users',
           'password' => 'required|min:6',
           'phone' => 'required|unique:users',
           'address' => 'required|string',
        ];
    }
}
