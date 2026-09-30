import { useState, FormEvent, ComponentType } from 'react';
import { Link } from 'react-router';
import { internationalDeskData } from '../data/international';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  Globe,
  Plane,
  FileCheck,
  ShieldCheck,
  Video,
  Hotel,
  Languages,
  Utensils,
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Download,
  Sparkles,
} from 'lucide-react';

export default function InternationalPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceIconMap: Record<string, ComponentType<{ className?: string }>> = {
    Languages,
    Hotel,
    Utensils,
    Video,
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2 border border-[var(--accent)]/30">
            <Globe className="w-3.5 h-3.5" />
            {isHi ? 'अंतरराष्ट्रीय मरीज डेस्क' : 'International Patient Services'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'वैश्विक स्वास्थ्य सेवा — स्वदेश से परे विशेषज्ञ देखभाल' : 'Global Healing — World-Class Care Beyond Borders'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-3xl">
            {isHi
              ? 'मेडिकल वीजा सहायता, हवाई अड्डा पिकअप, बहुभाषी अनुवादक एवं स्वदेश लौटने के बाद 12 महीने तक फॉलो-अप सुविधा।'
              : 'End-to-end medical travel assistance, expedited visa letters, multi-lingual interpreters, and 12-month post-discharge tele-health.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button variant="secondary" size="md" onClick={() => setBrochureModalOpen(true)} className="hover-lift">
            <Download className="w-4 h-4 mr-2 text-[var(--accent)]" />
            {isHi ? 'मार्गदर्शिका डाउनलोड करें' : 'Download Info Kit'}
          </Button>

          <Button variant="primary" size="md" onClick={() => setInquiryModalOpen(true)} className="hover-glow">
            <Plane className="w-4 h-4 mr-2" />
            {isHi ? 'मेडिकल वीजा अनुरोध करें' : 'Request Visa & Treatment Plan'}
          </Button>
        </div>
      </div>

      {/* Interactive Global Patient Flight Route Visualizer */}
      <Card shape="lantern" glow={true} className="p-6 sm:p-8 bg-[var(--surface-2)] shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--line)] pb-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--text)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--accent)]" />
              {isHi ? 'अंतरराष्ट्रीय मरीज यात्रा मानचित्र' : 'Seamless Global Patient Air Corridor'}
            </h2>
            <p className="text-xs font-mono text-[var(--accent)] mt-0.5">
              Direct Air Ambulance Coordination • Airport Concierge • Embassy Medical Visa Priority
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--sage)] bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--line)]">
            <CheckCircle2 className="w-4 h-4" /> 100% Embassy Accredited
          </div>
        </div>

        {/* SVG Flight Path Illustration */}
        <div className="w-full h-36 bg-[var(--surface)]/80 rounded-[var(--radius-md)] border border-[var(--line)] p-4 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500 flex items-center justify-center text-sky-400 font-mono font-bold text-xs">
              UK / US
            </div>
            <div>
              <strong className="text-xs text-[var(--text)] block">Home Country</strong>
              <span className="text-[10px] text-[var(--text-muted)]">Medical Dossier Review</span>
            </div>
          </div>

          <div className="flex-1 px-4 relative hidden sm:flex flex-col items-center justify-center">
            <div className="w-full h-0.5 border-b-2 border-dashed border-[var(--accent)] opacity-60" />
            <Plane className="w-5 h-5 text-[var(--accent)] animate-pulse absolute" />
            <span className="text-[10px] font-mono text-[var(--accent)] mt-4">Expedited Visa & Flight Triage</span>
          </div>

          <div className="flex items-center gap-3 z-10">
            <div className="text-right">
              <strong className="text-xs text-[var(--text)] block">Lanthera Health Campus</strong>
              <span className="text-[10px] text-[var(--sage)] font-mono">Specialist Triage & OPD</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] font-mono font-bold text-xs">
              LAN
            </div>
          </div>
        </div>
      </Card>

      {/* 4-Step Patient Journey Roadmap */}
      <div className="flex flex-col gap-6">
        <h2 className="font-display text-2xl font-bold text-[var(--text)] flex items-center gap-2">
          <Plane className="w-6 h-6 text-[var(--accent)]" />
          {isHi ? 'अंतरराष्ट्रीय मरीज यात्रा मार्ग (4-चरणीय प्रक्रिया)' : 'The 4-Step Overseas Patient Care Journey'}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {internationalDeskData.visaSteps.map((step) => (
            <Card key={step.step} shape="lantern" glow={true} className="p-6 flex flex-col gap-3 bg-[var(--surface-2)] relative transition-all duration-300 hover-lift">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-mono font-bold text-sm flex items-center justify-center shadow-md">
                0{step.step}
              </div>
              <h3 className="font-display font-bold text-base text-[var(--text)]">
                {isHi ? step.title.hi : step.title.en}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {isHi ? step.detail.hi : step.detail.en}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Concierge Services Grid */}
      <div className="flex flex-col gap-6 pt-4">
        <h2 className="font-display text-2xl font-bold text-[var(--text)]">
          {isHi ? 'समर्पित कंसियर्स एवं सहायता सेवाएं' : 'Dedicated Overseas Concierge Services'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {internationalDeskData.services.map((srv) => {
            const IconComp = serviceIconMap[srv.icon] ?? Globe;
            return (
              <Card key={srv.id} className="p-6 flex items-start gap-4 bg-[var(--surface-2)] transition-all duration-300 hover-lift">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] shrink-0 flex items-center justify-center text-[var(--accent)] shadow-sm">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display font-bold text-base text-[var(--text)]">
                    {isHi ? srv.title.hi : srv.title.en}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {isHi ? srv.desc.hi : srv.desc.en}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Language Interpreter & Teleconsultation Card */}
      <Card shape="lantern" className="p-6 bg-[var(--surface-2)] border border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--sage)]/20 border border-[var(--sage)] shrink-0 flex items-center justify-center text-[var(--sage)] font-bold">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--text)]">
              Multi-Lingual Interpreter Support (24×7)
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Dedicated native interpreters for English, Arabic, Russian, French, Bengali, and Swahili.
            </p>
          </div>
        </div>

        <Link to="/ledger">
          <Button variant="secondary" size="sm" className="hover-lift">
            Estimate International Treatment Costs
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </Card>

      {/* Insurance & Desk Contact Bar */}
      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {/* Global Insurance Clearances */}
        <Card className="p-6 flex flex-col gap-4 bg-[var(--surface-2)]">
          <h3 className="font-display text-lg font-bold text-[var(--text)] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--sage)]" />
            {isHi ? 'अंतरराष्ट्रीय बीमा साझेदार' : 'Global Insurance Direct Clearance'}
          </h3>
          <ul className="flex flex-col gap-2 text-xs text-[var(--text-muted)] font-mono">
            {internationalDeskData.partnerships.map((p) => (
              <li key={p} className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </Card>

        {/* International Desk Direct Contacts */}
        <Card shape="lantern" className="p-6 flex flex-col gap-4 bg-[var(--surface-2)]">
          <h3 className="font-display text-lg font-bold text-[var(--text)] flex items-center gap-2">
            <Globe className="w-5 h-5 text-[var(--accent)]" />
            {isHi ? '24×7 अंतरराष्ट्रीय डेस्क संपर्क' : '24×7 International Liaison Desk'}
          </h3>
          <div className="flex flex-col gap-3 text-xs text-[var(--text)]">
            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)]">
              <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase block">Email Dossier</span>
                <strong>{internationalDeskData.contact.email}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)]">
              <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase block">Hotline</span>
                <strong>{internationalDeskData.contact.phone}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)]">
              <MessageSquare className="w-4 h-4 text-[var(--sage)] shrink-0" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase block">WhatsApp Direct</span>
                <strong>{internationalDeskData.contact.whatsapp}</strong>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Download Info Kit Modal */}
      <Modal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
        title={isHi ? 'अंतरराष्ट्रीय मरीज सूचना पैकेज' : 'International Patient Services Info Package'}
      >
        <div className="flex flex-col gap-4 text-xs text-[var(--text-muted)]">
          <p className="text-sm text-[var(--text)] font-semibold">
            Download complete travel and clinical coordination dossier (PDF):
          </p>
          <ul className="flex flex-col gap-2">
            <li className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
              <div>
                <strong className="text-[var(--text)] block">1. Medical Visa Application Guide</strong>
                <span>Step-by-step embassy requirements and invitation letter protocol.</span>
              </div>
              <Download className="w-4 h-4 text-[var(--accent)]" />
            </li>
            <li className="p-3 rounded bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between">
              <div>
                <strong className="text-[var(--text)] block">2. Overseas Patient Concierge Tariff</strong>
                <span>Airport pickup, hotel arrangements, and interpreter services overview.</span>
              </div>
              <Download className="w-4 h-4 text-[var(--accent)]" />
            </li>
          </ul>
          <Button variant="primary" size="md" onClick={() => setBrochureModalOpen(false)} className="mt-2">
            Done & Close
          </Button>
        </div>
      </Modal>

      {/* Visa & Treatment Inquiry Modal */}
      <Modal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        title={isHi ? 'अंतरराष्ट्रीय मेडिकल वीजा अनुरोध' : 'International Medical Visa Assistance'}
      >
        <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4 text-sm">
          {submitted ? (
            <div className="p-6 text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-[var(--sage)] animate-bounce" />
              <h3 className="font-display text-xl font-bold text-[var(--text)]">
                {isHi ? 'अनुरोध सफलतापूर्वक भेजा गया!' : 'Inquiry Successfully Submitted!'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Our international liaison officer will email your provisional treatment opinion within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Dedicated International Patient Service
              </div>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Patient Full Name (as per Passport)
                <input
                  type="text"
                  required
                  defaultValue="Alexander Vance"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Country of Residence / Citizenship
                <input
                  type="text"
                  required
                  defaultValue="United Kingdom"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Email Address
                <input
                  type="email"
                  required
                  defaultValue="alex.vance@lanthera.org"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <Button type="submit" variant="primary" size="md" className="mt-2">
                <ShieldCheck className="w-4 h-4 mr-2" />
                {isHi ? 'अनुरोध भेजें' : 'Submit Medical Travel Inquiry'}
              </Button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}

