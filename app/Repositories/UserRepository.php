<?php


namespace App\Repositories;


use App\Models\User;

use App\Repositories\interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{

    public function all($request)
    {
        if(isset($request->search) && !empty($request->search) && !is_null($request->search)) {

            return User::where('first_name', 'LIKE', '%' .$request->search. '%')
                ->orWhere('middle_name', 'LIKE', '%' .$request->search. '%')
                ->orWhere('last_name', 'LIKE', '%' .$request->search. '%')
                ->orWhere('email_name', 'LIKE', '%' .$request->search. '%')
                ->orWhere('phone', 'LIKE', '%' .$request->search. '%')
                ->orderBy('id','desc')
                ->paginate(25);
        } else {
            return User::paginate(25);
        }
    }

    public function show(User $user)
    {
        return $user;
    }

    public function delete(User $user)
    {
        return User::destroy($user);
    }

    public function store($request)
    {
        return User::create([
           'first_name' => $request['first_name'] ,
           'last_name' => $request['last_name'],
           'middle_name' =>$request['middle_name'],
           'email' => $request['email'],
           'password' => Hash::make($request['password']),
           'phone' => $request['phone'],
           'address' => $request['address']
        ]);
    }

    public function update($request, $user)
    {
        return User::update([
            'first_name' => $request['first_name'] ?? $user->first_name,
            'last_name' => $request['last_name'] ?? $user->last_name,
            'middle_name' =>$request['middle_name'] ?? $user->middle_name,
            'email' => $request['email'] ?? $user->email,
            'password' => Hash::make($request['password']) ?? $user->password,
            'phone' => $request['phone'] ?? $user->phone,
            'address' => $request['address'] ?? $user->address
        ]);
    }
}
