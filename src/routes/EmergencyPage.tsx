import { useTranslation } from 'react-i18next';
import { PhoneCall, AlertOctagon, ShieldAlert, Navigation, Clock, Info } from 'lucide-react';
import { siteConfig } from '../config/site';

export default function EmergencyPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      {/* Giant Call Block */}
      <section className="bg-[var(--surface-2)] border-2 border-[var(--emergency)] rounded-[var(--radius-lg)] p-8 text-center flex flex-col items-center gap-4 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[var(--emergency)] text-white flex items-center justify-center shadow-lg">
          <PhoneCall className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-[var(--emergency)]">
          {t('emergencyCall', 'Emergency 24×7')}
        </h1>
        <p className="text-base text-[var(--text-muted)] max-w-xl">
          If you or someone with you needs immediate medical attention, call our 24×7 emergency response line or arrive directly at our emergency entrance.
        </p>
        <a
          href={`tel:${siteConfig.emergencyNumber}`}
          className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[var(--emergency)] text-white text-xl sm:text-2xl md:text-3xl font-mono font-bold px-4 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:opacity-95 transition-opacity max-w-full overflow-hidden"
        >
          <PhoneCall className="w-6 h-6" />
          <span>{siteConfig.emergencyNumber}</span>
        </a>
        <span className="text-xs font-mono text-[var(--accent)] font-semibold uppercase tracking-wider bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--line)]">
          24×7 Toll-Free Emergency Dispatch & Ambulance Control
        </span>
      </section>

      {/* Hospital Emergency Command Banner */}
      <div className="bg-[var(--emergency)]/10 border border-[var(--emergency)]/30 p-4 rounded-[var(--radius-md)] text-xs text-[var(--emergency)] flex items-start gap-3 shadow-sm">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          {t(
            'emergencyDisclaimer',
            '24×7 Rapid Response & Ambulance Dispatch Command. Immediate Priority Triage active at Main Emergency Ramp Gate 1.'
          )}
        </p>
      </div>

      {/* Red Flags Check: Signs to Act Now */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
          <AlertOctagon className="w-6 h-6 text-[var(--emergency)]" />
          <span>Signs to Act Immediately</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Trouble breathing or severe shortness of breath',
            'Chest pain, tightness or severe pressure',
            'Sudden weakness, numbness, face droop or speech difficulty',
            'Severe, uncontrollable bleeding',
            'Fainting, sudden confusion or loss of consciousness',
            'Seizures or sudden severe head trauma',
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--surface)] border border-[var(--line)] p-4 rounded-[var(--radius-md)] flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--emergency)] mt-2 shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Triage Colors Explained */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
          <Clock className="w-6 h-6 text-[var(--accent)]" />
          <span>What Happens on Arrival: How Triage Works</span>
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          When you enter our emergency block, a triage nurse immediately assesses priority to ensure patients with life-threatening conditions are treated first.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--surface)] border-l-4 border-l-[var(--emergency)] border border-[var(--line)] p-5 rounded-[var(--radius-md)] flex flex-col gap-2">
            <span className="font-mono text-xs uppercase font-bold text-[var(--emergency)]">Level 1 — Red</span>
            <h3 className="font-semibold text-base">Immediate Care</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Life-threatening conditions (e.g., cardiac arrest, airway obstruction). Instant resuscitation.
            </p>
          </div>

          <div className="bg-[var(--surface)] border-l-4 border-l-[var(--accent)] border border-[var(--line)] p-5 rounded-[var(--radius-md)] flex flex-col gap-2">
            <span className="font-mono text-xs uppercase font-bold text-[var(--accent)]">Level 2 — Amber</span>
            <h3 className="font-semibold text-base">Urgent Care</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Serious illness or injury requiring assessment within 10–15 minutes (e.g., severe asthma, suspected stroke).
            </p>
          </div>

          <div className="bg-[var(--surface)] border-l-4 border-l-[var(--sage)] border border-[var(--line)] p-5 rounded-[var(--radius-md)] flex flex-col gap-2">
            <span className="font-mono text-xs uppercase font-bold text-[var(--sage)]">Level 3 — Green</span>
            <h3 className="font-semibold text-base">Standard Priority</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Non-life-threatening conditions (e.g., minor fractures, simple cuts). Assessed in order of arrival.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Instructions & What to Bring */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--surface)] border border-[var(--line)] p-6 rounded-[var(--radius-lg)] flex flex-col gap-3">
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[var(--accent)]" />
            <span>While You Travel to Us</span>
          </h3>
          <ul className="text-sm text-[var(--text-muted)] flex flex-col gap-2 list-disc list-inside">
            <li>Stay calm and keep the patient still and warm.</li>
            <li>Do not offer food, water or medicines until assessed by triage.</li>
            <li>Bring any regular medicines, prescriptions or previous health cards.</li>
            <li>If possible, bring a photo ID and insurance card.</li>
          </ul>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--line)] p-6 rounded-[var(--radius-lg)] flex flex-col gap-3">
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[var(--sage)]" />
            <span>Emergency Entrance & Parking</span>
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Our Emergency Bay is accessible 24 hours a day via Gate 1 with dedicated ambulance lanes and drop-off parking.
          </p>
          <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--surface-2)] p-3 rounded-[var(--radius-sm)] mt-2">
            Address Placeholder: Gate 1 Emergency Ramp, Hospital Main Block, {siteConfig.city}.
          </div>
        </div>
      </section>
    </div>
  );
}
