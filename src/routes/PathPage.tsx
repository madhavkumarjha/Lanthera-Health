import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { journeyPaths } from '../data/path';
import { PathStop } from '../types';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  MapPin,
  Clock,
  Printer,
  ChevronRight,
  CheckCircle2,
  Users,
  Briefcase,
  HelpCircle,
  AlertCircle,
  BookmarkCheck,
  FileCheck,
  Sparkles,
} from 'lucide-react';

export default function PathPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Journey state
  const selectedJourneyId = searchParams.get('journey') || 'emergency';
  const defaultJourney = journeyPaths[0] || {
    id: 'emergency',
    title: { en: 'Emergency Journey', hi: 'इमरजेंसी मार्ग' },
    stops: [],
  };
  const activeJourney = journeyPaths.find((j) => j.id === selectedJourneyId) ?? defaultJourney;

  // Tracker state: current active stop index
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  // Selected Stop Drawer Modal
  const [detailStop, setDetailStop] = useState<PathStop | null>(null);

  // Discharge Checklist Modal State
  const [checklistOpen, setChecklistOpen] = useState(false);

  const handleSelectJourney = (id: string) => {
    setSearchParams({ journey: id });
    setActiveStopIndex(0);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Disclaimer Banner per File 01 & 04 */}
      <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[var(--accent)] shrink-0" />
          <p className="text-xs text-[var(--text-muted)]">
            <strong className="text-[var(--text)]">Indicative Durations:</strong> Timings are general estimates. Clinical care priorities always come first.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setChecklistOpen(true)} className="hover-lift">
            <FileCheck className="w-4 h-4 mr-1.5 text-[var(--accent)]" />
            {isHi ? 'डिस्चार्ज चेकलिस्ट' : 'Discharge Checklist'}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => window.print()} className="hover-lift">
            <Printer className="w-4 h-4 mr-1.5" />
            {isHi ? 'प्रिंट करें' : 'Print Journey'}
          </Button>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2 border border-[var(--accent)]/30">
          <MapPin className="w-3.5 h-3.5" />
          {isHi ? 'द पाथ (मरीज व परिवार यात्रा)' : 'The Path (Patient & Family Journeys)'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
          {isHi ? 'जानिए आपके आगमन पर आगे क्या होगा' : 'What happens next — Step by Step'}
        </h1>
        <p className="text-base text-[var(--text-muted)] mt-1">
          {isHi
            ? 'आगमन से लेकर रिकवरी और डिस्चार्ज तक 5 विस्तृत मार्गदर्शक चरण।'
            : 'Select a care journey below to view indicative timing, care team roles, and what family can do.'}
        </p>
      </div>

      {/* 5 Journey Track Selectors with Hover Glow */}
      <div className="flex flex-wrap gap-2.5">
        {journeyPaths.map((jp) => {
          const isSelected = activeJourney.id === jp.id;
          return (
            <button
              key={jp.id}
              type="button"
              onClick={() => handleSelectJourney(jp.id)}
              className={`px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover-lift ${
                isSelected
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-lg scale-105'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)] hover:border-[var(--accent)]/50'
              }`}
            >
              {isHi ? jp.title.hi : jp.title.en}
            </button>
          );
        })}
      </div>

      {/* Active Journey Card & Tracker */}
      <Card shape="lantern" glow={true} className="p-6 sm:p-8 flex flex-col gap-6 bg-[var(--surface-2)] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--text)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--accent)]" />
              {isHi ? activeJourney.title.hi : activeJourney.title.en}
            </h2>
            <p className="text-xs font-mono text-[var(--accent)] mt-1">
              {activeJourney.stops.length} Guided Steps • Active Tracker Enabled
            </p>
          </div>

          {/* Current Stop Position Control */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto max-w-full min-w-0">
            <span className="text-xs text-[var(--text-muted)] font-mono shrink-0">
              {isHi ? 'आप इस समय कहाँ हैं?' : 'Where are you now?'}
            </span>
            <select
              value={activeStopIndex}
              onChange={(e) => setActiveStopIndex(Number(e.target.value))}
              className="w-full sm:w-auto max-w-full min-w-0 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
            >
              {activeJourney.stops.map((stop, idx) => (
                <option key={stop.id} value={idx}>
                  Step {idx + 1}: {isHi ? stop.title.hi : stop.title.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vertical Animated Wick-Line Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--accent)]/40 flex flex-col gap-8 my-2">
          {activeJourney.stops.map((stop, idx) => {
            const isCurrent = idx === activeStopIndex;
            const isPassed = idx < activeStopIndex;

            return (
              <div key={stop.id} className="relative group">
                {/* Timeline Node Badge with Glow */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[var(--accent)] border-white text-[var(--accent-ink)] scale-125 shadow-[0_0_16px_var(--accent)] ring-4 ring-[var(--accent)]/20'
                      : isPassed
                      ? 'bg-[var(--sage)] border-[var(--sage)] text-white'
                      : 'bg-[var(--surface-2)] border-[var(--line)] text-[var(--text-muted)] group-hover:border-[var(--accent)]'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                {/* Stop Card with Glassmorphism & Hover Lift */}
                <Card
                  className={`p-5 flex flex-col gap-3 transition-all duration-300 hover-lift ${
                    isCurrent
                      ? 'border-[var(--accent)] bg-[var(--surface)] shadow-lg ring-1 ring-[var(--accent)]/30'
                      : 'bg-[var(--surface)]/80 hover:border-[var(--accent)]/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {isHi ? stop.title.hi : stop.title.en}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-2)] font-mono text-xs text-[var(--accent)] border border-[var(--line)] self-start sm:self-auto">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {stop.durationRange.minMin}–{stop.durationRange.maxMin} mins
                      </span>
                    </div>
                  </div>

                  {/* Roles Involved */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {isHi ? 'उपस्थित टीम:' : "Who you'll meet:"}
                    </span>
                    {stop.who.map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-[11px] font-medium text-[var(--text)]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  {/* Family Can Do List */}
                  <div className="text-xs text-[var(--text-muted)] flex flex-col gap-1 mt-1 bg-[var(--surface-2)]/50 p-3 rounded-[var(--radius-sm)] border border-[var(--line)]/50">
                    <span className="font-semibold text-[var(--text)] flex items-center gap-1.5">
                      <BookmarkCheck className="w-3.5 h-3.5 text-[var(--sage)]" />
                      {isHi ? 'परिजन क्या कर सकते हैं:' : 'What family can do:'}
                    </span>
                    <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
                      {stop.familyCan.map((fc) => (
                        <li key={fc.en}>{isHi ? fc.hi : fc.en}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Detail Action */}
                  <div className="pt-2 flex justify-between items-center border-t border-[var(--line)]/50 mt-2">
                    <button
                      type="button"
                      onClick={() => setDetailStop(stop)}
                      className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 transition-transform hover:translate-x-1"
                    >
                      {isHi ? 'विस्तृत विवरण व चेकलिस्ट देखें' : 'View full stop details & bring list'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Discharge Checklist Modal */}
      <Modal
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
        title={isHi ? 'डिस्चार्ज पूर्व तैयारी चेकलिस्ट' : 'Pre-Discharge Family Readiness Checklist'}
      >
        <div className="flex flex-col gap-4 text-xs text-[var(--text-muted)]">
          <p className="text-sm text-[var(--text)] font-semibold">
            Ensure all requirements below are completed prior to leaving the hospital:
          </p>
          <ul className="flex flex-col gap-2.5">
            <li className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0" />
              <span>Physician Discharge Summary & Prescription signed by attending doctor</span>
            </li>
            <li className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0" />
              <span>Medication reconciliation and dosage instruction explained by ward pharmacist</span>
            </li>
            <li className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0" />
              <span>Clear Ledger final account statement settled or insurance claim approved</span>
            </li>
            <li className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0" />
              <span>Follow-up tele-consultation or OPD appointment scheduled</span>
            </li>
          </ul>
          <Button variant="primary" size="md" onClick={() => setChecklistOpen(false)} className="mt-2">
            Close Checklist
          </Button>
        </div>
      </Modal>

      {/* Stop Detail Modal / Drawer */}
      {detailStop && (
        <Modal
          isOpen={!!detailStop}
          onClose={() => setDetailStop(null)}
          title={isHi ? detailStop.title.hi : detailStop.title.en}
        >
          <div className="flex flex-col gap-6 text-sm">
            <div className="flex justify-between items-center bg-[var(--surface-2)] p-3 rounded-[var(--radius-sm)] border border-[var(--line)]">
              <span className="font-mono text-xs text-[var(--accent)] font-bold">
                Indicative Duration: {detailStop.durationRange.minMin}–{detailStop.durationRange.maxMin} mins
              </span>
            </div>

            {/* What to Bring */}
            <div className="flex flex-col gap-2">
              <h4 className="font-display font-semibold text-base text-[var(--text)] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                {isHi ? 'इस चरण पर क्या साथ लाएं:' : 'What to bring for this step:'}
              </h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                {detailStop.bring.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Questions to Ask */}
            <div className="flex flex-col gap-2">
              <h4 className="font-display font-semibold text-base text-[var(--text)] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                {isHi ? 'डॉक्टर/नर्स से पूछने हेतु सवाल:' : 'Questions to ask care team:'}
              </h4>
              <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                {detailStop.ask.map((a) => (
                  <li key={a.en}>{isHi ? a.hi : a.en}</li>
                ))}
              </ul>
            </div>

            <Button variant="primary" size="md" onClick={() => setDetailStop(null)} className="w-full">
              <BookmarkCheck className="w-4 h-4 mr-2" />
              {isHi ? 'बंद करें' : 'Done & Close'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

