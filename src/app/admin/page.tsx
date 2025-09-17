export const metadata = {
  title: 'Admin',
};

import LogoutButton from '@/components/LogoutButton';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-4">
      <div className="w-full max-w-3xl p-6 bg-[#0b0b0b] rounded-lg shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-[var(--color-mafia)] mb-2">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">This is the admin panel</p>
          </div>
          <div className="hidden md:flex items-center">
            <LogoutButton />
          </div>
        </div>

        {/* Mobile logout - shown below header */}
        <div className="mt-4 md:hidden flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
