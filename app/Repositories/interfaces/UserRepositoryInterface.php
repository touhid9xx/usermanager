<?php


namespace App\Repositories\interfaces;


use App\Models\User;

interface UserRepositoryInterface
{
    public function all($request);

    public function show(User $user);
    public function delete(User $user);
    public function store($request);
    public function update($request, $user);

}
