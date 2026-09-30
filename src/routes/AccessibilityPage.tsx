import { useLocale } from '../hooks/useLocale';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Eye, Keyboard, Sun, Volume2 } from 'lucide-react';

export default function AccessibilityPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <Eye className="w-3.5 h-3.5" />
          {isHi ? 'सुगमता कथन (Accessibility Statement)' : 'Accessibility Commitment'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
          {isHi ? 'सभी के लिए सुगम एवं समावेशी डिजिटल स्वास्थ्य सेवा' : 'Inclusive & Accessible Healthcare for Everyone'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
          {isHi
            ? 'लैंथेरा हेल्थ वेब पोर्टल WCAG 2.1 AA मानकों का पालन करता है ताकि स्क्रीन रीडर, उच्च-विषमता एवं शांत मोड समर्थित हो।'
            : 'Designed to conform with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.'}
        </p>
      </div>

      {/* Accessibility Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)]">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
            <Volume2 className="w-5 h-5" />
          </div>
          <h2 className="font-display font-bold text-lg text-[var(--text)]">
            {isHi ? 'स्क्रीन रीडर व सेमांटिक HTML' : 'Screen Reader & Semantic Landmarks'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'सभी इंटरएक्टिव घटकों में उपयुक्त ARIA लेबल, भूमिकाएं व लैंडमार्क शामिल हैं।'
              : 'Full keyboard focus traps, descriptive ARIA attributes, semantic headings, and skip-to-content links.'}
          </p>
        </Card>

        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)]">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
            <Keyboard className="w-5 h-5" />
          </div>
          <h2 className="font-display text-lg font-bold text-[var(--text)]">
            {isHi ? 'कीबोर्ड नेविगेशन व कमांड पैलेट' : 'Full Keyboard Navigation (⌘K)'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'बिना माउस का उपयोग किए पूरे पोर्टल को कीबोर्ड (Tab & Shift+Tab) से नेविगेट करें।'
              : 'Complete keyboard control with visible focus outlines and instant command palette search.'}
          </p>
        </Card>

        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)]">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
            <Sun className="w-5 h-5" />
          </div>
          <h2 className="font-display text-lg font-bold text-[var(--text)]">
            {isHi ? 'काम मोड व गति में कमी (Calm Mode)' : 'Calm Mode & Reduced Motion'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'अतिरिक्त चमक और एनिमेशन को बंद करके संवेदी आराम प्रदान करता है।'
              : 'Toggles off glowing ambient overlays and respects system prefers-reduced-motion settings.'}
          </p>
        </Card>

        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)]">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-display text-lg font-bold text-[var(--text)]">
            {isHi ? 'पाठ्य आकार व विषय-वस्तु नियंत्रण' : 'Dynamic Text Scaling & High Contrast'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'हेडर नियंत्रक से फॉन्ट का आकार बढ़ाएं और लाइट/डार्क थीम चुनें।'
              : 'Allows instant font size scaling (Normal, Large, Extra Large) with contrast ratios exceeding 4.5:1.'}
          </p>
        </Card>
      </div>
    </div>
  );
}
