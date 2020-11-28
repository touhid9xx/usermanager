<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $user;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    public function index(Request $request)
    {
        $result['success'] = true;
        $users = $this->user->all($request);
        $result['users'] = $users;

//        $result = User::all();

        return response()->json($result, 200);
    }


    public function create()
    {
        //
    }


    public function store(UserStoreRequest $request)
    {
//        return $request->all();
        $result['success'] = false;
        $user = $this->user->store($request);
        if($user) {
            $result['success'] = true;
            $result['message'] = 'User data stored successfully';
            return response()->json($result,201);
        }

    }


    public function show(User $user)
    {
        $result['success'] = true;
        $user = $this->user->show($user);
        $result['user'] = $user;
        return response()->json($result,200);
    }


    public function edit($id)
    {
        //
    }


    public function update(UserUpdateRequest $request, User $user)
    {
        $result['success'] = false;
        $user = $this->user->store($request, $user);
        if($user) {
            $result['success'] = true;
            $result['message'] = 'User data updated successfully';
            return response()->json($result,200);
        } else {
            $result['success'] = false;
            $result['message'] = 'User update failed';
            return response()->json($result,422);
        }
    }


    public function destroy(User $user)
    {
        $result['success'] = false;
        $this->user->delete($user);
        $result['message'] = 'User deleted';
        return response()->json($result,200);
    }
}
