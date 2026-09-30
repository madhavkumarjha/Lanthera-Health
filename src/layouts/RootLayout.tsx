import { useState } from 'react';
import { Outlet } from 'react-router';
import { useTheme } from '../hooks/useTheme';
import { DemoBanner } from '../components/shell/DemoBanner';
import { Header } from '../components/shell/Header';
import { Footer } from '../components/shell/Footer';
import { ConsentGateModal } from '../components/shell/ConsentGateModal';
import { FloatingLauncher } from '../components/shell/FloatingLauncher';
import { useCommandPalette } from '../hooks/useCommandPalette';
import { Modal } from '../components/ui/Modal';
import { siteConfig } from '../config/site';

export function RootLayout() {
  useTheme();
  const { open, setOpen } = useCommandPalette();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      {/* Demo Banner */}
      {siteConfig.demoBanner && <DemoBanner />}

      {/* Main Header */}
      <Header onOpenCommand={() => setOpen(true)} />

      {/* Skip to Main Content Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[var(--accent)] focus:text-[var(--accent-ink)]"
      >
        Skip to main content
      </a>

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* First-Visit Consent Gate */}
      <ConsentGateModal />

      {/* Floating Quick Launcher */}
      <FloatingLauncher />

      {/* Command Palette Modal (⌘K) */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Command Palette (⌘K)">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Type a page name or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 px-4 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm focus:outline-none focus:border-[var(--accent)]"
          />
          <div className="flex flex-col gap-2 text-sm text-[var(--text-muted)] max-h-60 overflow-y-auto">
            <a
              href="/emergency"
              className="p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-2)] text-[var(--emergency)] font-semibold flex justify-between"
            >
              <span>Emergency 24×7</span> <span>/emergency</span>
            </a>
            <a
              href="/guide"
              className="p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-2)] flex justify-between"
            >
              <span>Lantern Guide</span> <span>/guide</span>
            </a>
            <a
              href="/path"
              className="p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-2)] flex justify-between"
            >
              <span>The Path (Journeys)</span> <span>/path</span>
            </a>
            <a
              href="/ledger"
              className="p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-2)] flex justify-between"
            >
              <span>Clear Ledger</span> <span>/ledger</span>
            </a>
            <a
              href="/doctors"
              className="p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-2)] flex justify-between"
            >
              <span>Doctors Directory</span> <span>/doctors</span>
            </a>
            <a
              href="/departments"
              className="p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--surface-2)] flex justify-between"
            >
              <span>Departments</span> <span>/departments</span>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
