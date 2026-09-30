import { Outlet } from 'react-router';
import { useTheme } from '../hooks/useTheme';

export function RootLayout() {
  useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <header role="banner" className="header-shell border-b border-[var(--line)] p-4">
        {/* Landmark shell header */}
      </header>
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <footer role="contentinfo" className="footer-shell border-t border-[var(--line)] p-4">
        {/* Landmark shell footer */}
      </footer>
    </div>
  );
}
