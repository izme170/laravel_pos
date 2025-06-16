<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = \App\Models\User::with('role')->get();
        return inertia('Users/Index', [
            'users' => $users
        ]);
    }

    public function show($id)
    {
        $user = \App\Models\User::with('role')->find($id);
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found');
        }
        return inertia('Users/Show', [
            'user' => $user
        ]);
    }

    public function create()
    {
        $roles = \App\Models\Role::all();
        return inertia('Users/Create', [
            'roles' => $roles
        ]);
    }

    public function edit($id)
    {
        $user = \App\Models\User::with('role')->find($id);
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found');
        }
        $roles = \App\Models\Role::all();
        return inertia('Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role_id' => 'required|exists:roles,id',
            'email' => 'required|email|max:255|unique:users,email',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imageName = Str::uuid() . '.' . $request->image->extension();
            $request->image->storeAs('images', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        \App\Models\User::create($validated);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    public function update(Request $request, $id)
    {
        $user = \App\Models\User::find($id);
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role_id' => 'required|exists:roles,id',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imageName = Str::uuid() . '.' . $request->image->extension();
            $request->image->storeAs('images', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }
    
    public function destroy($id)
    {
        $user = \App\Models\User::find($id);
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
}
