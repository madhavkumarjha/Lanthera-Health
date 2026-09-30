import { useState, FormEvent } from 'react';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setContactModalOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <PhoneCall className="w-3.5 h-3.5" />
            {isHi ? 'संपर्क करें' : 'Contact & Campus Directions'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? '24×7 सहायता व संपर्क विवरण' : 'We Are Here For You — 24×7 Helplines'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? 'आपातकालीन हॉटलाइन, विभाग विस्तार फोन नंबर एवं अस्पताल पता।'
              : 'Direct clinical extensions, emergency dispatch numbers, and campus location pointers.'}
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setContactModalOpen(true)}>
          <Send className="w-4 h-4 mr-2" />
          {isHi ? 'संदेश भेजें' : 'Send General Inquiry'}
        </Button>
      </div>

      {/* Emergency & Campus Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Emergency Call Box */}
        <Card shape="lantern" className="p-6 flex flex-col gap-4 bg-red-950/20 border-red-500/40">
          <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs uppercase">
            <PhoneCall className="w-4 h-4" />
            24×7 Emergency Desk
          </div>
          <div className="font-display font-bold text-2xl text-[var(--text)]">
            +91 11 102 9900
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Immediate trauma triage, ambulance dispatch, and critical care bed reservation.
          </p>
        </Card>

        {/* General Desk */}
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[var(--accent)] font-mono font-bold text-xs uppercase">
            <Building2 className="w-4 h-4" />
            Main Hospital Reception
          </div>
          <div className="font-display font-bold text-2xl text-[var(--text)]">
            +91 11 4982 7000
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            OPD appointments, billing query desk, and inpatient room inquiries.
          </p>
        </Card>

        {/* Email & Support */}
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[var(--sage)] font-mono font-bold text-xs uppercase">
            <Mail className="w-4 h-4" />
            Patient Help Desk
          </div>
          <div className="font-display font-bold text-lg text-[var(--text)]">
            care@lantherahealth.org
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Written queries, visit feedback, and insurance pre-authorization support.
          </p>
        </Card>
      </div>

      {/* Campus Directions & Dept Extensions Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Campus Location */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--accent)]" />
            {isHi ? 'अस्पताल परिसर पता' : 'Hospital Campus Location'}
          </h2>
          <div className="text-sm text-[var(--text)] leading-relaxed flex flex-col gap-1">
            <strong>Lanthera Health Medical Campus</strong>
            <span>Plot 42, Institutional Area, Sector 12</span>
            <span>New Delhi, 110075, India</span>
          </div>
          <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs text-[var(--text-muted)] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--sage)] shrink-0" />
            Emergency & ICU: 24 Hours Open | OPD Timings: Mon–Sat 08:00–20:00
          </div>
        </Card>

        {/* Department Extensions Table */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-[var(--sage)]" />
            {isHi ? 'विभाग फोन एक्सटेंशन' : 'Key Department Direct Extensions'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--line)] text-[var(--text-muted)] font-mono uppercase text-[10px]">
                  <th className="py-2 pr-4">Department</th>
                  <th className="py-2 text-right">Extension</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]/50 text-[var(--text)]">
                <tr><td className="py-2.5">Cardiology & Cath Lab</td><td className="py-2.5 text-right font-mono font-bold text-[var(--accent)]">Ext 401</td></tr>
                <tr><td className="py-2.5">Emergency & Triage</td><td className="py-2.5 text-right font-mono font-bold text-[var(--accent)]">Ext 101</td></tr>
                <tr><td className="py-2.5">Radiology (MRI/CT)</td><td className="py-2.5 text-right font-mono font-bold text-[var(--accent)]">Ext 305</td></tr>
                <tr><td className="py-2.5">International Patient Desk</td><td className="py-2.5 text-right font-mono font-bold text-[var(--accent)]">Ext 770</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Inquiry Modal */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title={isHi ? 'सामान्य पूछताछ (Demo)' : 'Send General Inquiry'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
          {submitted ? (
            <div className="p-6 text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-[var(--sage)] animate-bounce" />
              <h3 className="font-display text-xl font-bold text-[var(--text)]">
                {isHi ? 'संदेश भेजा गया!' : 'Message Received!'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Our patient relations desk will get back to you shortly.
              </p>
            </div>
          ) : (
            <>
              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Your Name
                <input
                  type="text"
                  required
                  defaultValue="Alex Demo"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Email Address
                <input
                  type="email"
                  required
                  defaultValue="alex@example.com"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Message / Query
                <textarea
                  rows={3}
                  required
                  defaultValue="I have a question about OPD timing and room booking."
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <Button type="submit" variant="primary" size="md" className="mt-2">
                <ShieldCheck className="w-4 h-4 mr-2" />
                {isHi ? 'संदेश जमा करें' : 'Submit Inquiry'}
              </Button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}
