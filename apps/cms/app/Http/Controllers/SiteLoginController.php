<?php

namespace App\Http\Controllers;

use App\Models\User;
use Filament\Facades\Filament;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SiteLoginController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $username = mb_strtolower(trim((string) $request->input('username')));
        $password = (string) $request->input('password');
        $user = $this->findUser($username);

        if (! $user || $password === '' || ! Hash::check($password, $user->password)) {
            return response()->json(['ok' => false], 401);
        }

        $panel = Filament::getPanel('admin');
        if ($user->canAccessPanel($panel)) {
            $token = Str::random(64);
            Cache::put($this->tokenKey($token), $user->id, now()->addMinute());

            return response()->json([
                'ok' => true,
                'panelUrl' => url('/masuk/panel?token='.$token),
            ]);
        }

        $role = $this->siteRole($user);
        if (! $role || ! is_string($user->username) || $user->username === '') {
            return response()->json(['ok' => false], 401);
        }

        return response()->json([
            'ok' => true,
            'username' => $user->username,
            'name' => $user->name,
            'role' => $role,
        ]);
    }

    public function panel(Request $request): RedirectResponse
    {
        $token = (string) $request->query('token');
        $id = $token === '' ? null : Cache::pull($this->tokenKey($token));
        $panel = Filament::getPanel('admin');
        $user = is_numeric($id) ? User::query()->find($id) : null;

        if (! $user || ! $user->canAccessPanel($panel)) {
            return redirect()->to($panel->getLoginUrl() ?? url('/admin/login'));
        }

        Auth::guard($panel->getAuthGuard())->login($user);
        $request->session()->regenerate();

        return redirect()->to($panel->getUrl() ?? url('/admin'));
    }

    private function findUser(string $username): ?User
    {
        if ($username === '') {
            return null;
        }

        return User::query()->where('username', $username)->first()
            ?? User::query()->where('email', $username)->first();
    }

    private function tokenKey(string $token): string
    {
        return 'masuk-panel:'.hash('sha256', $token);
    }

    private function siteRole(User $user): ?string
    {
        foreach (['konsumen', 'kantor', 'pengunjung'] as $role) {
            if ($user->hasRole($role)) {
                return $role;
            }
        }

        return null;
    }
}
