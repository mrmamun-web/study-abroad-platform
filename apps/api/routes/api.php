<?php

use Illuminate\Support\Facades\Route;

Route::get('/connection-test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Frontend and Backend API routing is ready.',
        'application' => config('app.name'),
    ]);
});
