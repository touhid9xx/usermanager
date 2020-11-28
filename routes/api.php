<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::group(['prefix' => 'admin'], function () {
    Route::apiResource('users', 'App\Http\Controllers\Admin\UserController');
});
