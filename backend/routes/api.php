<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('users', function () {
    $users = User::all();
    return response()->json($users, 200);
});

Route::post('users', [UserController::class, 'store']);

// Route::get('products/{product}', function ($productId) {
//     return response()->json(['productId' => "{$productId}"], 200);
// });
 
// Route::post('products', function() {
//     return  response()->json([
//             'message' => 'Create success'
//         ], 201);
// });
// Route::put('products/{product}', function() {
// 	return  response()->json([
//             'message' => 'Update success'
//         ], 200);
// });
// Route::delete('products/{product}',function() {
// 	return  response()->json(null, 204);
// });

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
