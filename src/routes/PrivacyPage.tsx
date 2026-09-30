import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../hooks/useLocale';
import { Card } from '../components/ui/Card';

export default function PrivacyPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-10">
      {/* Header Banner */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--sage)] uppercase tracking-wider self-start">
          <ShieldCheck className="w-3.5 h-3.5" />
          {isHi ? 'गोपनीयता व डेटा सुरक्षा नीति' : 'Patient Data Privacy Policy'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
          {isHi ? 'रोगी गोपनीयता एवं स्वास्थ्य डेटा संरक्षण' : 'Patient Data Protection & Privacy Governance'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-3xl leading-relaxed">
          {isHi
            ? 'लैंथेरा हेल्थ में, आपकी चिकित्सा संबंधी जानकारी, लैब रिपोर्ट और परामर्श डेटा सर्वोच्च सुरक्षा मानकों के अधीन संरक्षित हैं।'
            : 'At Lanthera Health, your medical records, diagnostic reports, and personal information are safeguarded by strict clinical data protection protocols and encryption standards.'}
        </p>
      </div>

      {/* Core Privacy Principles Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)] hover-lift">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)]">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {isHi ? '256-बिट एन्क्रिप्शन' : '256-Bit Encrypted Data'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'पोर्टल पर लैब रिपोर्ट और चिकित्सा इतिहास एंड-टू-एंड एन्क्रिप्टेड सर्वर पर संग्रहीत होता है।'
              : 'All health records and lab diagnostics stored on our patient portal use bank-grade 256-bit AES encryption.'}
          </p>
        </Card>

        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)] hover-lift">
          <div className="w-10 h-10 rounded-full bg-[var(--sage)]/15 flex items-center justify-center text-[var(--sage)]">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {isHi ? 'तृतीय-पक्ष शेयरिंग नहीं' : 'Zero Third-Party Sharing'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'आपकी सहमति के बिना आपका मेडिकल डेटा कभी भी किसी विज्ञापनदाता या थर्ड पार्टी को नहीं बेचा जाता।'
              : 'Your personal health information is never sold or shared with commercial third parties or advertisers.'}
          </p>
        </Card>

        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)] hover-lift">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)]">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {isHi ? 'रोगी नियंत्रण व पहुंच' : 'Full Patient Consent Control'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'आपको अपने मेडिकल रिकॉर्ड देखने, डाउनलोड करने या पोर्टल अकाउंट हटाने का पूरा अधिकार है।'
              : 'Patients retain complete right of access, deletion, and consent management over all medical files.'}
          </p>
        </Card>
      </div>

      {/* Detailed Policy Sections */}
      <div className="flex flex-col gap-6 text-sm text-[var(--text-muted)]">
        <section className="bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-8 rounded-[var(--radius-lg)] flex flex-col gap-4 shadow-md">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[var(--sage)]" />
            <span>1. Medical Records & Health Data Handling</span>
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed">
            Lanthera Health collects personal health identifiers (PHI) solely for clinical triage, specialist consultations, diagnostic interpretation, and billing transparency. All access by attending physicians and nurses is logged in audit trails.
          </p>
        </section>

        <section className="bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-8 rounded-[var(--radius-lg)] flex flex-col gap-4 shadow-md">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[var(--sage)]" />
            <span>2. Patient Portal Security & Token Anonymization</span>
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed">
            Patient identifiers displayed on public status screens (e.g. Waiting Room Live) use anonymized token IDs (such as `#LAN-8910` or `L-204`) to protect patient confidentiality in hospital common areas.
          </p>
        </section>

        <section className="bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-8 rounded-[var(--radius-lg)] flex flex-col gap-4 shadow-md">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[var(--sage)]" />
            <span>3. Cookies & Session Preferences</span>
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed">
            We use essential local storage strictly for maintaining user UI preferences (Theme mode, Text Size scaling, Calm Mode toggle, and Language selection). No tracking cookies are used.
          </p>
        </section>
      </div>
    </div>
  );
}
