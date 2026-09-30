import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';


export function Footer() {
  const { t } = useTranslation();

  return (
    <footer role="contentinfo" className="bg-[var(--surface)] border-t border-[var(--line)] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Purpose */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] border border-[var(--line)]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2L15 8H9L12 2ZM12 22C7.58 22 4 18.42 4 14C4 11.5 5.15 9.27 7 7.82V14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14V7.82C18.85 9.27 20 11.5 20 14C20 18.42 16.42 22 12 22Z" />
              </svg>
            </div>
            <span className="font-display font-semibold text-lg">{t('brandName', 'Lanthera Health')}</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {t('notAdviceDisclaimer', 'Indicative · General information · Not medical, legal or financial advice.')}
          </p>
          <p className="text-xs font-mono text-[var(--accent)]">
            24×7 Active Care • Multi-Specialty Tertiary Hospital
          </p>
        </div>

        {/* Quick Patient Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Navigation</h4>
          <Link to="/departments" className="hover:text-[var(--accent)] transition-colors">
            Departments
          </Link>
          <Link to="/doctors" className="hover:text-[var(--accent)] transition-colors">
            Doctors & Specialists
          </Link>
          <Link to="/guide" className="hover:text-[var(--accent)] transition-colors">
            Lantern Guide
          </Link>
          <Link to="/path" className="hover:text-[var(--accent)] transition-colors">
            The Path (Patient Journeys)
          </Link>
          <Link to="/ledger" className="hover:text-[var(--accent)] transition-colors">
            Clear Ledger (Billing)
          </Link>
        </div>

        {/* Support & Care */}
        <div className="flex flex-col gap-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Care & Portal</h4>
          <Link to="/emergency" className="text-[var(--emergency)] font-semibold hover:underline">
            Emergency 24×7
          </Link>
          <Link to="/families" className="hover:text-[var(--accent)] transition-colors">
            For Families & Status Board
          </Link>
          <Link to="/portal" className="hover:text-[var(--accent)] transition-colors">
            Lantern Patient Portal
          </Link>
          <Link to="/understand" className="hover:text-[var(--accent)] transition-colors">
            Understand Knowledge Hub
          </Link>
          <Link to="/international" className="hover:text-[var(--accent)] transition-colors">
            International Patients
          </Link>
        </div>

        {/* Legal & Compliance */}
        <div className="flex flex-col gap-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Legal & Governance</h4>
          <Link to="/privacy" className="hover:text-[var(--accent)] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-[var(--accent)] transition-colors">
            Terms of Service
          </Link>
          <Link to="/demo-disclosure" className="hover:text-[var(--accent)] transition-colors">
            Compliance & Governance
          </Link>
          <Link to="/accessibility" className="hover:text-[var(--accent)] transition-colors">
            Accessibility Statement
          </Link>
          <Link to="/sitemap" className="hover:text-[var(--accent)] transition-colors">
            Sitemap
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-6 px-4 text-center text-xs text-[var(--text-muted)]">
        © 2026 Lanthera Health. All rights reserved. Hospital Care Charter.
      </div>
    </footer>
  );
}
