import { useLocale } from '../hooks/useLocale';
import { Card } from '../components/ui/Card';
import { ShieldAlert, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function DemoDisclosurePage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          {isHi ? 'डेमो प्रकटीकरण एवं अस्वीकरण' : 'Demo Disclosure & Compliance Disclaimer'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
          {isHi ? 'डेमो वेबसाइट प्रकटीकरण एवं सीमाएं' : 'Demonstration Web Application Notice'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
          {isHi
            ? 'यह वेबसाइट एक प्रदर्शन मंच है। इसमें प्रस्तुत जानकारी, डॉक्टर प्रोफाइल और मूल्य काल्पनिक हैं।'
            : 'Lanthera Health is a portfolio demonstration web application built for architectural and design evaluation.'}
        </p>
      </div>

      {/* Primary Red-Flag Emergency Banner */}
      <Card shape="lantern" className="p-6 bg-red-950/20 border-red-500/50 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs uppercase">
          <AlertTriangle className="w-4 h-4" />
          Real Medical Emergency Notice
        </div>
        <p className="text-xs text-[var(--text)] leading-relaxed">
          If you or someone near you is experiencing a real life-threatening medical emergency (such as severe chest pain, sudden numbness or speech difficulty, or severe uncontrolled bleeding), <strong>do not rely on this website</strong>. Immediately dial <strong>112</strong> or <strong>102</strong> or proceed to the nearest emergency room.
        </p>
      </Card>

      {/* Compliance Clauses */}
      <Card className="p-6 sm:p-8 flex flex-col gap-6">
        <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--accent)]" />
          Key Compliance & Demonstration Terms
        </h2>

        <div className="flex flex-col gap-4 text-xs text-[var(--text-muted)] leading-relaxed">
          <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text)] font-semibold">1. Fictional Staff & Profiles:</strong> All physician names, registration numbers, staff portraits, and biographies presented in the Circle of Care and Doctor Directory are synthetic demo representations.
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text)] font-semibold">2. Indicative Non-Binding Pricing:</strong> Cost estimates calculated in the Clear Ledger tool are indicative ranges for financial transparency demonstration only and do not constitute a legally binding quote.
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text)] font-semibold">3. Anonymized Waiting Room Tokens:</strong> Token numbers displayed on Waiting Room Live (`L-204` to `L-209`) are simulated tokens for demonstrating real-time status board architecture.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
