import { Outlet, NavLink } from 'react-router';
import { FileText, User, ShieldCheck, Clock, Calendar } from 'lucide-react';
import { useLocale } from '../hooks/useLocale';

export function PortalLayout() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="portal-layout min-h-screen flex flex-col md:flex-row">
      {/* Branded Portal Navigation Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--line)] bg-[var(--surface-2)] p-6 flex flex-col gap-6 shrink-0">
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
            className={({ isActive }) =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-colors ${
                isActive
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
              }`
            }
          >
            <FileText className="w-4 h-4" />
            {isHi ? 'लैब रिपोर्ट अनुवादक' : 'Report Explainer'}
          </NavLink>

          <NavLink
            to="/book"
            className={({ isActive }) =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-colors ${
                isActive
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
              }`
            }
          >
            <Calendar className="w-4 h-4" />
            {isHi ? 'अपॉइंटमेंट बुकिंग' : 'Book Consult'}
          </NavLink>

          <NavLink
            to="/guide"
            className={({ isActive }) =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-colors ${
                isActive
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
              }`
            }
          >
            <Clock className="w-4 h-4" />
            {isHi ? 'गाइड व तैयारी शीट' : 'Visit Prep Sheet'}
          </NavLink>

          <NavLink
            to="/ledger"
            className={({ isActive }) =>
              `p-3 rounded-[var(--radius-sm)] flex items-center gap-2.5 transition-colors ${
                isActive
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
              }`
            }
          >
            <ShieldCheck className="w-4 h-4" />
            {isHi ? 'पारदर्शी बिलिंग अनुमान' : 'Clear Ledger Costs'}
          </NavLink>
        </nav>

        {/* Demo Patient Info Badge */}
        <div className="mt-auto p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] flex items-center gap-2 text-xs">
          <User className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <div className="overflow-hidden">
            <div className="font-bold text-[var(--text)] truncate">Alex Demo</div>
            <div className="text-[10px] text-[var(--text-muted)] font-mono">ID: #LAN-8910</div>
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
