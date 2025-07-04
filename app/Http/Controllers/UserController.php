<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash; 
use App\Models\User; 
use App\Models\Role; 
class UserController extends Controller
{
    public function index()
    {
        $users = \App\Models\User::with('role')->get();
        return inertia('users/index', [
            'users' => $users
        ]);
    }

    public function show($id)
    {
        $user = \App\Models\User::with('role')->find($id);
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found');
        }
        return inertia('users/show', [
            'user' => $user
        ]);
    }

    public function create()
    {
        $roles = \App\Models\Role::all();
        return inertia('users/create', [
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
        return inertia('users/edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'], // Add password validation
            'role_id' => ['required', 'exists:roles,id'],
            'image' => ['nullable', 'image', 'max:2048'], // 2MB max
        ]);

        if ($request->hasFile('image')) {
            $imageName = Str::uuid() . '.' . $request->image->extension();
            $request->image->storeAs('images', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        // Hash the password before creating the user
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

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
