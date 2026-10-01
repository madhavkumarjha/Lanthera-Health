import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PhoneCall } from 'lucide-react';

export function EmergencyPill() {
  const { t } = useTranslation();

  return (
    <Link
      to="/emergency"
      className="emergency-pill inline-flex items-center gap-1.5 bg-[var(--emergency)] text-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white shrink-0 shadow-md whitespace-nowrap"
      aria-label="Emergency care 24 by 7 - click for immediate instructions"
    >
      <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse shrink-0" />
      <span className="hidden sm:inline">{t('emergencyCall', 'Emergency 24×7')}</span>
      <span className="sm:hidden">24×7</span>
    </Link>
  );
}
