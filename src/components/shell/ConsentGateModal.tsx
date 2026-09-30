import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrefsStore } from '../../store/prefs';
import { useLocale } from '../../hooks/useLocale';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function ConsentGateModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { locale, changeLocale } = useLocale();
  const { motion, setMotion, textSize, setTextSize, setConsent } = usePrefsStore();

  useEffect(() => {
    const hasSeenGate = localStorage.getItem('lanthera_consent_gate_seen');
    if (!hasSeenGate) {
      setIsOpen(true);
    }
  }, []);

  const handleSave = (agreed: boolean) => {
    setConsent(agreed);
    localStorage.setItem('lanthera_consent_gate_seen', 'true');
    if (agreed) {
      localStorage.setItem('lanthera_prefs', JSON.stringify({ locale, motion, textSize }));
    }
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleSave(false)} title="Welcome to Lanthera Health">
      <div className="flex flex-col gap-5 text-sm">
        <p className="text-[var(--text-muted)]">
          {t('consentIntro', 'Choose how you would like this demo site to feel. You can change these preferences at any time.')}
        </p>

        {/* Language preference */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <span className="font-medium">Language</span>
          <div className="flex gap-2">
            <Button
              variant={locale === 'en' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => changeLocale('en')}
            >
              English
            </Button>
            <Button
              variant={locale === 'hi' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => changeLocale('hi')}
            >
              हिन्दी
            </Button>
          </div>
        </div>

        {/* Motion preference */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <span className="font-medium">Motion & Animations</span>
          <div className="flex gap-2">
            <Button
              variant={motion === 'full' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMotion('full')}
            >
              Full
            </Button>
            <Button
              variant={motion === 'reduced' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMotion('reduced')}
            >
              Reduced
            </Button>
          </div>
        </div>

        {/* Text size */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <span className="font-medium">Text Size</span>
          <div className="flex gap-2">
            {[100, 115, 130].map((size) => (
              <Button
                key={size}
                variant={textSize === size ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setTextSize(size as 100 | 115 | 130)}
              >
                {size}%
              </Button>
            ))}
          </div>
        </div>

        {/* Storage notice */}
        <div className="text-xs text-[var(--text-muted)] bg-[var(--surface-2)] p-3 rounded-[var(--radius-sm)]">
          This demo stores your visual choices locally in your browser. Nothing is uploaded to any server.
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={() => handleSave(false)}>
            Essential Only
          </Button>
          <Button variant="primary" onClick={() => handleSave(true)}>
            Save Preferences
          </Button>
        </div>
      </div>
    </Modal>
  );
}
