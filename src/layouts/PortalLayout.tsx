import { Outlet, NavLink, useSearchParams } from 'react-router';
import { FileText, ShieldCheck, Clock, Calendar } from 'lucide-react';
import { useLocale } from '../hooks/useLocale';

export function PortalLayout() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'report';

  return (
    <div className="portal-layout min-h-screen flex flex-col md:flex-row bg-[var(--bg)] w-full max-w-full overflow-x-hidden">
      {/* Branded Portal Navigation Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--line)] bg-[var(--surface-2)] p-6 flex flex-col gap-6 shrink-0 shadow-lg">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-[var(--accent)] uppercase font-semibold">
            LANTHERA PORTAL
          </span>
          <h2 className="font-display text-lg font-bold text-[var(--text)]">
            {isHi ? 'मरीज स्वास्थ्य पोर्टल' : 'Patient Care Portal'}
          </h2>
        </div>

        <nav className="flex flex-col gap-2 text-xs font-mono">
          <NavLink
            to="/portal"
            end
            className={() =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-all hover-lift ${
                activeTab === 'report'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--line)]'
              }`
            }
          >
            <FileText className="w-4 h-4" />
            {isHi ? 'लैब रिपोर्ट अनुवादक' : 'Report Explainer'}
          </NavLink>

          <NavLink
            to="/portal?tab=book"
            className={() =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-all hover-lift ${
                activeTab === 'book'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--line)]'
              }`
            }
          >
            <Calendar className="w-4 h-4" />
            {isHi ? 'अपॉइंटमेंट बुकिंग' : 'Book Consult'}
          </NavLink>

          <NavLink
            to="/portal?tab=prep"
            className={() =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-all hover-lift ${
                activeTab === 'prep'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--line)]'
              }`
            }
          >
            <Clock className="w-4 h-4" />
            {isHi ? 'गाइड व तैयारी शीट' : 'Visit Prep Sheet'}
          </NavLink>

          <NavLink
            to="/portal?tab=ledger"
            className={() =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-all hover-lift ${
                activeTab === 'ledger'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--line)]'
              }`
            }
          >
            <ShieldCheck className="w-4 h-4" />
            {isHi ? 'पारदर्शी बिलिंग अनुमान' : 'Clear Ledger Costs'}
          </NavLink>
        </nav>

        {/* Patient Profile Badge */}
        <div className="mt-auto p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] flex items-center gap-2.5 text-xs shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0 font-bold">
            AM
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-[var(--text)] truncate">Alex Morgan</div>
            <div className="text-[10px] text-[var(--sage)] font-mono">Patient #LAN-8910</div>
          </div>
        </div>
      </aside>

      {/* Portal Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
