import { Outlet } from 'react-router';

export function PortalLayout() {
  return (
    <div className="portal-layout min-h-screen flex">
      <aside className="w-64 border-r border-[var(--line)] p-4">Portal Sidebar</aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
