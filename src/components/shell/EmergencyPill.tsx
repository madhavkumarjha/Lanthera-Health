import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PhoneCall } from 'lucide-react';

export function EmergencyPill() {
  const { t } = useTranslation();

  return (
    <Link
      to="/emergency"
      className="emergency-pill inline-flex items-center gap-2 bg-[var(--emergency)] text-white px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white shrink-0 shadow-md"
      aria-label="Emergency care 24 by 7 - click for immediate instructions"
    >
      <PhoneCall className="w-4 h-4 animate-pulse" />
      <span>{t('emergencyCall', 'Emergency 24×7')}</span>
    </Link>
  );
}
