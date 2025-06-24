<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsCashier
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->user()->role->name !== 'Cashier' && auth()->user()->role->name !== 'Manager' && auth()->user()->role->name !== 'Admin')
        {
            return redirect()->back()->with('error', 'Unauthorized');
        }
        return $next($request);
    }
}
