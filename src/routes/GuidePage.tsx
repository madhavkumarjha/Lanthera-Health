import { useState } from 'react';
import { Link } from 'react-router';
import { useGuideStore } from '../store/guideStore';
import { RED_FLAG_OPTIONS, CONDITION_OPTIONS, guideRules } from '../data/guide-rules';
import { generateVisitPrepSheetPdf } from '../utils/pdfGenerator';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  Compass,
  AlertTriangle,
  PhoneCall,
  Download,
  Printer,
  Copy,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
  Square,
  FileText,
} from 'lucide-react';

export default function GuidePage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const {
    currentStep,
    redFlags,
    forWhom,
    duration,
    impact,
    conditions,
    toggleRedFlag,
    setForWhom,
    setDuration,
    setImpact,
    toggleCondition,
    nextStep,
    prevStep,
    reset,
    getResult,
  } = useGuideStore();

  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkedBringItems, setCheckedBringItems] = useState<Record<number, boolean>>({});

  const result = getResult();

  const handleCopySummary = () => {
    const text = `Lanthera Health — Visit Prep Summary
Care Level: ${result.level.toUpperCase()}
Suggested Department(s): ${result.departments.join(', ')}
Category: ${forWhom}
Generated on: ${new Date().toLocaleDateString()}

Indicative • General information • Not medical, legal or financial advice.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    generateVisitPrepSheetPdf({
      result,
      locale: locale as 'en' | 'hi',
      patientCategory: forWhom,
    });
  };

  const toggleBringItem = (idx: number) => {
    setCheckedBringItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Mandatory Disclaimer & Emergency Banner per File 01 & 04 */}
      <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            <strong className="text-[var(--text)]">Indicative • General information:</strong> This guide
            helps route to the right care setting. It cannot diagnose conditions or assess medical emergencies.
          </p>
        </div>
        <Link to="/emergency" className="shrink-0">
          <Button variant="emergency" size="sm">
            <PhoneCall className="w-4 h-4 mr-1.5" />
            {isHi ? 'इमरजेंसी 24×7' : 'Emergency 24×7'}
          </Button>
        </Link>
      </div>

      {/* Guide Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            {isHi ? '2 मिनट निर्णय वृक्ष' : '2-Minute Care Guide'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'सही देखभाल स्तर चुनें (Lantern Guide)' : 'Find the right level of care'}
          </h1>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRuleModalOpen(true)}
          className="self-start sm:self-auto font-mono text-xs text-[var(--accent)]"
        >
          <HelpCircle className="w-4 h-4 mr-1.5" />
          {isHi ? 'यह कैसे काम करता है (Rule Table)' : 'How this works (Rules)'}
        </Button>
      </div>

      {/* Stepper Indicator */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
          {['Red Flags', 'For Whom', 'Duration & Impact', 'Conditions'].map((label, idx) => (
            <div
              key={label}
              className={`flex-1 text-center py-2 rounded-[var(--radius-sm)] text-xs font-mono transition-colors ${
                currentStep === idx
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold'
                  : currentStep > idx
                  ? 'bg-[var(--surface-2)] text-[var(--sage)]'
                  : 'bg-[var(--surface-2)]/50 text-[var(--text-muted)]'
              }`}
            >
              Step {idx + 1}: {label}
            </div>
          ))}
        </div>
      )}

      {/* STEP 0: Red-Flag Check First */}
      {currentStep === 0 && (
        <Card shape="lantern" className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--emergency)]/15 border border-[var(--emergency)] flex items-center justify-center text-[var(--emergency)] shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                {isHi ? 'चरण 1: रेड-फ्लैग जाँच (Red-Flag Check)' : 'Step 1: Check for Red-Flag Danger Signs'}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">
                {isHi
                  ? 'यदि इनमें से कोई भी लक्षण मौजूद है, तो तुरंत आपातकालीन सहायता लें।'
                  : 'If any of these severe symptoms are present, tick them below to get immediate emergency routing.'}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {RED_FLAG_OPTIONS.map((flag) => {
              const isChecked = redFlags.includes(flag.id);
              return (
                <button
                  key={flag.id}
                  type="button"
                  onClick={() => toggleRedFlag(flag.id)}
                  className={`p-4 rounded-[var(--radius-md)] border text-left flex items-start gap-3 transition-all ${
                    isChecked
                      ? 'bg-[var(--emergency)]/10 border-[var(--emergency)] text-[var(--text)]'
                      : 'bg-[var(--surface-2)] border-[var(--line)] hover:border-[var(--accent)]'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[var(--emergency)] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm font-medium">{isHi ? flag.hi : flag.en}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[var(--line)]">
            <span className="text-xs text-[var(--text-muted)]">
              {redFlags.length === 0 ? 'No red flags selected' : `${redFlags.length} red flag(s) selected`}
            </span>
            <Button variant="primary" size="md" onClick={nextStep}>
              {isHi ? 'आगे बढ़ें' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 1: For Whom? */}
      {currentStep === 1 && (
        <Card shape="lantern" className="p-6 sm:p-8 flex flex-col gap-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            {isHi ? 'चरण 2: यह किसके लिए है?' : 'Step 2: Who is this visit for?'}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'self', label: isHi ? 'स्वयं (Self)' : 'Myself (Adult)', desc: 'Age 18–64' },
              { id: 'child', label: isHi ? 'बच्चा (Child)' : 'Child', desc: 'Age 0–17' },
              { id: 'older', label: isHi ? 'वरिष्ठ नागरिक (Older Adult)' : 'Older Adult', desc: 'Age 65+' },
              { id: 'pregnant', label: isHi ? 'गर्भवती (Pregnant)' : 'Pregnant', desc: 'Maternity care' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setForWhom(item.id as any)}
                className={`p-5 rounded-[var(--radius-md)] border text-left transition-all ${
                  forWhom === item.id
                    ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text)]'
                    : 'bg-[var(--surface-2)] border-[var(--line)] hover:border-[var(--accent)]'
                }`}
              >
                <div className="font-display font-semibold text-lg">{item.label}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[var(--line)]">
            <Button variant="ghost" size="md" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isHi ? 'पीछे' : 'Back'}
            </Button>
            <Button variant="primary" size="md" onClick={nextStep}>
              {isHi ? 'आगे बढ़ें' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: Duration & Impact */}
      {currentStep === 2 && (
        <Card shape="lantern" className="p-6 sm:p-8 flex flex-col gap-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            {isHi ? 'चरण 3: समय व दैनिक जीवन पर प्रभाव' : 'Step 3: Duration & Daily Impact'}
          </h2>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-[var(--text)]">
              {isHi ? 'लक्षण कितने समय से हैं?' : 'How long have symptoms been present?'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '<1d', label: isHi ? '1 दिन से कम' : 'Less than 24 hours' },
                { id: '1-7d', label: isHi ? '1 से 7 दिन' : '1 to 7 days' },
                { id: '>1w', label: isHi ? '1 सप्ताह से अधिक' : 'More than 1 week' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id as any)}
                  className={`p-3 rounded-[var(--radius-sm)] border text-center text-sm font-medium transition-all ${
                    duration === d.id
                      ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text)]'
                      : 'bg-[var(--surface-2)] border-[var(--line)]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
            <label className="text-sm font-semibold text-[var(--text)] flex justify-between">
              <span>{isHi ? 'दैनिक गतिविधियों पर प्रभाव' : 'Impact on daily life:'}</span>
              <span className="text-[var(--accent)] font-mono">
                {['0 - None', '1 - Mild', '2 - Moderate', '3 - Severe'][impact]}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={impact}
              onChange={(e) => setImpact(Number(e.target.value) as any)}
              className="w-full h-2 bg-[var(--surface-2)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
              <span>None</span>
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[var(--line)]">
            <Button variant="ghost" size="md" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isHi ? 'पीछे' : 'Back'}
            </Button>
            <Button variant="primary" size="md" onClick={nextStep}>
              {isHi ? 'आगे बढ़ें' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: Existing Conditions */}
      {currentStep === 3 && (
        <Card shape="lantern" className="p-6 sm:p-8 flex flex-col gap-6">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            {isHi ? 'चरण 4: मौजूद बीमारियां या जोखिम कारक' : 'Step 4: Existing Conditions (Optional)'}
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {CONDITION_OPTIONS.map((cond) => {
              const isChecked = conditions.includes(cond.id);
              return (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => toggleCondition(cond.id)}
                  className={`p-4 rounded-[var(--radius-md)] border text-left flex items-start gap-3 transition-all ${
                    isChecked
                      ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text)]'
                      : 'bg-[var(--surface-2)] border-[var(--line)] hover:border-[var(--accent)]'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm font-medium">{isHi ? cond.hi : cond.en}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[var(--line)]">
            <Button variant="ghost" size="md" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isHi ? 'पीछे' : 'Back'}
            </Button>
            <Button variant="primary" size="lg" onClick={nextStep}>
              {isHi ? 'परिणाम देखें' : 'See Care Result'}
              <CheckCircle2 className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: RESULT VIEW */}
      {currentStep === 4 && (
        <div className="flex flex-col gap-8">
          {/* Result Header Card */}
          <Card
            shape="lantern"
            className={`p-6 sm:p-8 flex flex-col gap-4 border-2 ${
              result.level === 'emergency'
                ? 'border-[var(--emergency)] bg-[var(--emergency)]/10'
                : 'border-[var(--accent)] bg-[var(--surface)]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                    result.level === 'emergency'
                      ? 'bg-[var(--emergency)] text-white'
                      : 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  }`}
                >
                  Care Level: {result.level.toUpperCase()}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                  {result.level === 'emergency'
                    ? isHi
                      ? 'तत्काल आपातकालीन चिकित्सा सहायता (Emergency Care Recommended)'
                      : 'Immediate Emergency Care Recommended'
                    : isHi
                    ? 'सुझाई गई देखभाल श्रेणी'
                    : 'Recommended Care Setting'}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="md" onClick={handleDownloadPdf}>
                  <Download className="w-4 h-4 mr-1.5" />
                  {isHi ? 'पीडीएफ डाउनलोड करें' : 'Download Prep PDF'}
                </Button>
                <Button variant="secondary" size="md" onClick={handleCopySummary}>
                  <Copy className="w-4 h-4 mr-1.5" />
                  {copied ? (isHi ? 'कॉपी हो गया!' : 'Copied!') : isHi ? 'समरी कॉपी करें' : 'Copy Summary'}
                </Button>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] border-t border-[var(--line)] pt-4">
              <strong>Suggested Department(s):</strong> {result.departments.join(', ')}
            </p>
          </Card>

          {/* Interactive What to Bring Checklist */}
          <Card className="p-6 flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[var(--accent)]" />
              {isHi ? 'अस्पताल लाते समय चेकलिस्ट (What to Bring)' : 'What to Bring Checklist'}
            </h3>
            <div className="flex flex-col gap-2">
              {result.bring.map((item, idx) => {
                const isChecked = !!checkedBringItems[idx];
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleBringItem(idx)}
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-left transition-colors hover:bg-[var(--surface-2)]/80"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-[var(--sage)] shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                    )}
                    <span className={`text-sm ${isChecked ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Questions to Ask & Arrival Steps */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 flex flex-col gap-4">
              <h3 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--accent)]" />
                {isHi ? 'डॉक्टर से पूछने हेतु सवाल' : 'Questions to Ask Care Team'}
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-[var(--text-muted)] list-disc pl-5">
                {result.ask.map((q) => (
                  <li key={q.en}>{isHi ? q.hi : q.en}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 flex flex-col gap-4">
              <h3 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[var(--accent)]" />
                {isHi ? 'अस्पताल पहुंचने पर क्या होगा' : 'What Happens Upon Arrival'}
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)]">
                {result.nextSteps.map((step, idx) => (
                  <div key={step.en} className="flex items-start gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--accent)] font-bold">
                      {idx + 1}
                    </span>
                    <span>{isHi ? step.hi : step.en}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--line)]">
            <Button variant="ghost" size="md" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {isHi ? 'पुनः प्रारंभ करें (Reset)' : 'Start Over'}
            </Button>

            <div className="flex gap-3">
              <Button variant="secondary" size="md" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1.5" />
                {isHi ? 'प्रिंट करें' : 'Print Sheet'}
              </Button>
              <Link to="/book">
                <Button variant="primary" size="md">
                  {isHi ? 'अ अपॉइंटमेंट बुक करें' : 'Book Appointment'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Transparent Rule Table Modal */}
      <Modal
        isOpen={ruleModalOpen}
        onClose={() => setRuleModalOpen(false)}
        title={isHi ? 'पारदर्शी नियम तालिका (How Lantern Guide Works)' : 'Transparent Rule Table'}
      >
        <div className="flex flex-col gap-4 max-h-96 overflow-y-auto text-sm">
          <p className="text-xs text-[var(--text-muted)]">
            The Lantern Guide evaluates inputs transparently using deterministic rule priorities.
          </p>
          <div className="border border-[var(--line)] rounded-[var(--radius-sm)] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[var(--surface-2)] border-b border-[var(--line)] font-mono">
                  <th className="p-2.5">Priority</th>
                  <th className="p-2.5">Rule ID</th>
                  <th className="p-2.5">Level</th>
                  <th className="p-2.5">Departments</th>
                </tr>
              </thead>
              <tbody>
                {guideRules.map((r) => (
                  <tr key={r.id} className="border-b border-[var(--line)]/50">
                    <td className="p-2.5 font-mono text-[var(--accent)] font-bold">{r.priority}</td>
                    <td className="p-2.5 font-mono">{r.id}</td>
                    <td className="p-2.5 font-semibold uppercase">{r.level}</td>
                    <td className="p-2.5">{r.departments.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}
