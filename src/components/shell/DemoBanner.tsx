import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export function DemoBanner() {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('lanthera_demo_banner_dismissed');
    if (isDismissed === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('lanthera_demo_banner_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Demo Notification"
      className="bg-[var(--surface-2)] text-[var(--accent)] border-b border-[var(--line)] px-4 py-1.5 text-xs font-mono flex items-center justify-between z-40 w-full max-w-full overflow-hidden"
    >
      <div className="flex-1 text-center min-w-0 truncate px-2">
        <span>{t('demoBanner', 'Demo website · All people, data and numbers are fictional.')}</span>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        className="p-0.5 hover:text-[var(--text)] transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
