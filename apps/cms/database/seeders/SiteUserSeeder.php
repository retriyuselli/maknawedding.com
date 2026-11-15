<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class SiteUserSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['super_admin', 'panel_user', 'pengunjung', 'kantor', 'konsumen'] as $role) {
            Role::findOrCreate($role, 'web');
        }

        User::query()
            ->whereNull('username')
            ->whereDoesntHave('roles')
            ->each(fn (User $user) => $user->assignRole('super_admin'));

        $admin = User::query()->updateOrCreate(
            ['email' => 'admin@maknawedding.test'],
            [
                'name' => 'Admin Percobaan',
                'password' => 'makna-panel',
            ],
        );
        $admin->syncRoles(['super_admin']);

        $accounts = [
            ['username' => 'pengunjung', 'password' => 'makna-tamu', 'name' => 'Tamu Percobaan', 'role' => 'pengunjung'],
            ['username' => 'kantor', 'password' => 'makna-kantor', 'name' => 'Staf Percobaan', 'role' => 'kantor'],
            ['username' => 'konsumen', 'password' => 'makna-konsumen', 'name' => 'Konsumen Percobaan', 'role' => 'konsumen'],
        ];

        foreach ($accounts as $account) {
            $user = User::query()->updateOrCreate(
                ['username' => $account['username']],
                [
                    'name' => $account['name'],
                    'email' => $account['username'].'@maknawedding.test',
                    'password' => $account['password'],
                ],
            );
            $user->syncRoles([$account['role']]);
        }
    }
}
