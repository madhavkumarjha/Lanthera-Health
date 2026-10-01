import { useState, FormEvent } from 'react';
import { ledgerScenarios, insurancePartners, financialAidSchemes } from '../data/ledger';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  Calculator,
  ShieldCheck,
  Building2,
  HelpCircle,
  FileText,
  AlertTriangle,
  CreditCard,
  CheckCircle2,
  BookOpen,
  Printer,
  Sparkles,
} from 'lucide-react';

export default function LedgerPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const defaultScenario = ledgerScenarios[0]!;
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id);
  const [roomType, setRoomType] = useState<'ward' | 'semi' | 'private' | 'icu'>('semi');
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [glossaryModalOpen, setGlossaryModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const scenario = ledgerScenarios.find((s) => s.id === selectedScenarioId) ?? defaultScenario;
  const multiplier = scenario.roomMultipliers[roomType];

  const calculatedComponents = scenario.components.map((c) => ({
    name: isHi ? c.key.hi : c.key.en,
    min: Math.round(c.min * multiplier),
    max: Math.round(c.max * multiplier),
  }));

  const totalMin = calculatedComponents.reduce((acc, c) => acc + c.min, 0);
  const totalMax = calculatedComponents.reduce((acc, c) => acc + c.max, 0);

  const handleRequestEstimate = (e: FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setEstimateModalOpen(false);
      setRequestSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2 border border-[var(--accent)]/30">
            <Calculator className="w-3.5 h-3.5" />
            {isHi ? 'पारदर्शी वित्त प्रणाली (Clear Ledger)' : 'Transparent Financial Ledger'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'बिना किसी छिपे शुल्क के स्पष्ट उपचार अनुमान' : 'No Hidden Surprises — Pre-Procedure Cost Calculator'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-3xl">
            {isHi
              ? 'अपनी नियोजित प्रक्रिया, कमरे की श्रेणी चुनें और वास्तविक घटकवार अनुमानित खर्च तुरंत देखें।'
              : 'Select your procedure and accommodation class to estimate itemized hospital expenses prior to admission.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setGlossaryModalOpen(true)} className="hover-lift">
            <BookOpen className="w-4 h-4 mr-1.5 text-[var(--accent)]" />
            {isHi ? 'बीमा शब्दावली' : 'Insurance Glossary'}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => window.print()} className="hover-lift">
            <Printer className="w-4 h-4 mr-1.5" />
            {isHi ? 'कोटेशन शीट प्रिंट करें' : 'Print Cost Sheet'}
          </Button>
        </div>
      </div>

      {/* Calculator Main Section */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
          <Card shape="lantern" glow={true} className="p-4 sm:p-6 flex flex-col gap-5 bg-[var(--surface-2)] shadow-lg min-w-0">
            <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[var(--accent)]" />
              {isHi ? '1. प्रक्रिया व कमरा चुनें' : '1. Select Procedure & Room'}
            </h2>

            {/* Select Procedure */}
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-[var(--text)] min-w-0">
              {isHi ? 'प्रक्रिया / सर्जरी' : 'Medical Procedure'}
              <select
                value={selectedScenarioId}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
                className="w-full max-w-full min-w-0 p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              >
                {ledgerScenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {isHi ? s.title.hi : s.title.en}
                  </option>
                ))}
              </select>
            </label>

            {/* Select Room Type */}
            <div className="flex flex-col gap-2 text-xs font-semibold text-[var(--text)] min-w-0">
              <span>{isHi ? 'कमरे / वार्ड की श्रेणी:' : 'Accommodation Tier:'}</span>
              <div className="grid grid-cols-2 gap-2 min-w-0">
                {(
                  [
                    { id: 'ward', label: isHi ? 'जनरल वार्ड' : 'General Ward', mult: '1.0×' },
                    { id: 'semi', label: isHi ? 'सेमी-प्राइवेट' : 'Semi-Private', mult: '1.25×' },
                    { id: 'private', label: isHi ? 'डेलक्स प्राइवेट' : 'Deluxe Private', mult: '1.5×' },
                    { id: 'icu', label: isHi ? 'आईसीयू स्टे' : 'ICU Priority', mult: '2.2×' },
                  ] as const
                ).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoomType(r.id)}
                    className={`p-3 rounded-[var(--radius-sm)] border text-left flex flex-col justify-between transition-all hover-lift ${
                      roomType === r.id
                        ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)] font-bold shadow-md'
                        : 'bg-[var(--surface)] border-[var(--line)] text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    <span className="text-xs">{r.label}</span>
                    <span className="text-[10px] font-mono opacity-80 mt-1">Multiplier {r.mult}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Total Estimate Summary Box */}
            <div className="p-5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--accent)]/40 flex flex-col gap-1.5 mt-2 shadow-inner">
              <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--sage)]" />
                {isHi ? 'अनुमानित कुल लागत सीमा' : 'Calculated Indicative Total'}
              </span>
              <div className="font-display font-bold text-2xl sm:text-3xl text-[var(--accent)]">
                ₹{totalMin.toLocaleString('en-IN')} – ₹{totalMax.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[var(--text-muted)] mt-1 leading-relaxed">
                {isHi
                  ? '*कमरे के प्रकार व घटकवार शुल्क के आधार पर स्वचालित गणना।'
                  : '*Automated multiplier calculation based on selected room category.'}
              </span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setEstimateModalOpen(true)}
              className="w-full mt-1 hover-glow"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isHi ? 'लिखित कोटेशन का अनुरोध करें' : 'Request Written Formal Estimate'}
            </Button>
          </Card>
        </div>

        {/* Breakdown & Components Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="p-6 flex flex-col gap-5 bg-[var(--surface-2)] shadow-lg">
            <div className="flex justify-between items-center border-b border-[var(--line)] pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  {isHi ? scenario.title.hi : scenario.title.en}
                </h3>
                <span className="text-xs font-mono text-[var(--accent)]">
                  Category: {isHi ? scenario.category.hi : scenario.category.en}
                </span>
              </div>
            </div>

            {/* Visual Itemized Percentage Bar */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[var(--text)]">Proportional Cost Breakdown:</span>
              <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-[var(--surface)] p-0.5 border border-[var(--line)]">
                <div className="bg-[var(--accent)] h-full rounded-l" style={{ width: '40%' }} title="Surgeon & OT (40%)" />
                <div className="bg-[var(--sage)] h-full" style={{ width: '25%' }} title="Anesthesia & ICU (25%)" />
                <div className="bg-amber-500 h-full" style={{ width: '20%' }} title="Diagnostics & Meds (20%)" />
                <div className="bg-sky-500 h-full rounded-r" style={{ width: '15%' }} title="Room & Nursing (15%)" />
              </div>
              <div className="flex flex-wrap gap-4 text-[10px] font-mono text-[var(--text-muted)] mt-1">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block" /> Surgeon & OT (40%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[var(--sage)] inline-block" /> Anesthesia & ICU (25%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Diagnostics (20%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Room & Care (15%)</span>
              </div>
            </div>

            {/* Components Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--text-muted)] font-mono uppercase text-[10px]">
                    <th className="py-2 pr-4">{isHi ? 'घटक / सेवा' : 'Cost Component'}</th>
                    <th className="py-2 text-right">{isHi ? 'अनुमानित सीमा (INR)' : 'Indicative Range (INR)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]/50 text-[var(--text)]">
                  {calculatedComponents.map((comp) => (
                    <tr key={comp.name} className="hover:bg-[var(--surface)] transition-colors">
                      <td className="py-3 pr-4 font-medium">{comp.name}</td>
                      <td className="py-3 text-right font-mono font-semibold text-[var(--accent)]">
                        ₹{comp.min.toLocaleString('en-IN')} – ₹{comp.max.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Volatility Warnings */}
            {scenario.volatility.length > 0 && (
              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-2">
                <span className="text-xs font-mono text-[var(--accent)] font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {isHi ? 'खर्च में भिन्नता लाने वाले संभावित कारक:' : 'Potential Expense Volatility Factors:'}
                </span>
                <ul className="list-disc pl-5 text-xs text-[var(--text-muted)] space-y-1">
                  {scenario.volatility.map((v) => (
                    <li key={v.en}>{isHi ? v.hi : v.en}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Cashless Hospitalization Flowchart */}
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-bold text-[var(--text)] flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[var(--sage)]" />
          {isHi ? '4-चरणीय कैशलेस बीमा स्वीकृति प्रक्रिया' : '4-Step Cashless Insurance Pre-Authorization Process'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex flex-col gap-2 bg-[var(--surface-2)]">
            <div className="w-7 h-7 rounded-full bg-[var(--sage)]/20 text-[var(--sage)] font-mono font-bold text-xs flex items-center justify-center">01</div>
            <h3 className="font-display font-bold text-sm text-[var(--text)]">Pre-Auth Form Submission</h3>
            <p className="text-xs text-[var(--text-muted)]">Submit health insurance card and doctor estimate sheet to TPA desk 48h prior to elective admission.</p>
          </Card>
          <Card className="p-5 flex flex-col gap-2 bg-[var(--surface-2)]">
            <div className="w-7 h-7 rounded-full bg-[var(--sage)]/20 text-[var(--sage)] font-mono font-bold text-xs flex items-center justify-center">02</div>
            <h3 className="font-display font-bold text-sm text-[var(--text)]">Initial Approval Letter</h3>
            <p className="text-xs text-[var(--text-muted)]">TPA issues initial cashless approval guarantee letter within 3 to 6 hours.</p>
          </Card>
          <Card className="p-5 flex flex-col gap-2 bg-[var(--surface-2)]">
            <div className="w-7 h-7 rounded-full bg-[var(--sage)]/20 text-[var(--sage)] font-mono font-bold text-xs flex items-center justify-center">03</div>
            <h3 className="font-display font-bold text-sm text-[var(--text)]">Active Stay Monitoring</h3>
            <p className="text-xs text-[var(--text-muted)]">Hospital desk handles mid-stay enhancements directly with insurer so family experiences zero stress.</p>
          </Card>
          <Card className="p-5 flex flex-col gap-2 bg-[var(--surface-2)]">
            <div className="w-7 h-7 rounded-full bg-[var(--sage)]/20 text-[var(--sage)] font-mono font-bold text-xs flex items-center justify-center">04</div>
            <h3 className="font-display font-bold text-sm text-[var(--text)]">Final Discharge Clearance</h3>
            <p className="text-xs text-[var(--text-muted)]">Final signed bill submitted to TPA; patient pays non-payable items only (if any).</p>
          </Card>
        </div>
      </div>

      {/* Insurance & Financial Aid Grid */}
      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {/* Insurance Partners Card */}
        <Card className="p-6 flex flex-col gap-4 bg-[var(--surface-2)] shadow-md">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[var(--sage)]" />
            {isHi ? 'कैशलेस बीमा एवं टीपीए साझेदार' : 'Empaneled Insurance & TPA Partners'}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            {isHi
              ? 'अस्पताल निम्नलिखित प्रमुख स्वास्थ्य बीमा प्रदाताओं के साथ कैशलेस इलाज की सुविधा देता है:'
              : 'Direct desk clearance and pre-authorization support for major health insurers:'}
          </p>
          <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
            {insurancePartners.map((partner) => (
              <div key={partner} className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--sage)] shrink-0" />
                <span className="line-clamp-1">{partner}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Financial Aid Schemes */}
        <Card className="p-6 flex flex-col gap-4 bg-[var(--surface-2)] shadow-md">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[var(--accent)]" />
            {isHi ? 'वित्तीय सहायता व आसान किस्तें (EMI)' : 'Financial Assistance & Easy EMI'}
          </h2>
          <div className="flex flex-col gap-3">
            {financialAidSchemes.map((scheme) => (
              <div key={scheme.title.en} className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-1">
                <div className="font-display font-bold text-sm text-[var(--text)]">
                  {isHi ? scheme.title.hi : scheme.title.en}
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  {isHi ? scheme.desc.hi : scheme.desc.en}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Mandatory Non-binding Legal Disclaimer Banner */}
      <Card shape="lantern" className="p-6 bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
        <div className="text-xs text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text)] font-semibold">
            {isHi ? 'महत्वपूर्ण पारदर्शी प्रकटीकरण:' : 'Important Compliance Disclosure:'}
          </strong>{' '}
          {isHi
            ? 'यह कैलकुलेटर केवल सांकेतिक अनुमान प्रदान करता है। वास्तविक अस्पताल बिल भर्ती के बाद मरीज की नैदानिक स्थिति, अतिरिक्त आवश्यक जांचों, सर्जन शुल्क और वास्तविक अस्पताल प्रवास अवधि पर निर्भर करता है।'
            : 'All calculated figures are indicative pre-admission estimates for financial planning only. Final hospital billing is determined by actual intra-operative findings, attending doctor notes, and patient length of stay.'}
        </div>
      </Card>

      {/* Request Formal Estimate Modal */}
      <Modal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
        title={isHi ? 'लिखित कोटेशन अनुरोध' : 'Request Written Estimate'}
      >
        <form onSubmit={handleRequestEstimate} className="flex flex-col gap-4 text-sm">
          {requestSubmitted ? (
            <div className="p-6 text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-[var(--sage)] animate-bounce" />
              <h3 className="font-display text-xl font-bold text-[var(--text)]">
                {isHi ? 'अनुरोध प्राप्त हुआ!' : 'Estimate Request Sent!'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Our financial counselor desk will call you back within 2 hours with an official letterhead estimate.
              </p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)]">
                Procedure: {isHi ? scenario.title.hi : scenario.title.en} • Tier: {roomType.toUpperCase()}
              </div>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Patient / Requestor Name
                <input
                  type="text"
                  required
                  defaultValue="Alex Morgan"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Mobile Number for Estimate SMS/WhatsApp
                <input
                  type="text"
                  required
                  defaultValue="+91 98765 43210"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <Button type="submit" variant="primary" size="md" className="mt-2">
                <FileText className="w-4 h-4 mr-2" />
                {isHi ? 'कोटेशन भेजें' : 'Send Formal Estimate Letter'}
              </Button>
            </>
          )}
        </form>
      </Modal>

      {/* Insurance Glossary Modal */}
      <Modal
        isOpen={glossaryModalOpen}
        onClose={() => setGlossaryModalOpen(false)}
        title={isHi ? 'स्वास्थ्य बीमा शब्दावली' : 'Clear Ledger Insurance Glossary'}
      >
        <div className="flex flex-col gap-3 text-xs text-[var(--text-muted)]">
          <div className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)]">
            <strong className="text-[var(--text)] block font-semibold">Deductible</strong>
            The initial fixed amount paid out-of-pocket by the insured before insurance coverage activates.
          </div>
          <div className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)]">
            <strong className="text-[var(--text)] block font-semibold">Co-payment (Co-pay)</strong>
            A flat percentage of total bill (e.g. 10%) shared by the patient per admission.
          </div>
          <div className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)]">
            <strong className="text-[var(--text)] block font-semibold">Pre-Authorization (Pre-Auth)</strong>
            Written approval from insurance TPA approving hospital admission and estimated expenses.
          </div>
          <div className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)]">
            <strong className="text-[var(--text)] block font-semibold">Room Rent Sub-limit</strong>
            Maximum capped daily allowance for ward/room stay per policy terms.
          </div>
          <Button variant="primary" size="md" onClick={() => setGlossaryModalOpen(false)} className="mt-2">
            Close Glossary
          </Button>
        </div>
      </Modal>
    </div>
  );
}

