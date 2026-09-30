import { useState, FormEvent } from 'react';
import { careerListings } from '../data/careers';
import { CareerOption } from '../types';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function CareersPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedRole, setSelectedRole] = useState<CareerOption | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const filteredRoles = careerListings.filter((role) => {
    if (selectedDept !== 'all' && role.dept !== selectedDept) return false;
    return true;
  });

  const handleApply = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSelectedRole(null);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            {isHi ? 'करियर व रोजगार' : 'Careers at Lanthera Health'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'करुणा व उत्कृष्टता के साथ सेवा में शामिल हों' : 'Join Our Compassionate Care Team'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? 'अस्पताल के विभिन्न विभागों में चिकित्सकों, नर्सों एवं तकनीशियनों के लिए अवसर।'
              : 'Clinical, nursing, diagnostic, and administrative openings at our tertiary medical campus.'}
          </p>
        </div>

        {/* Dept Filter */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: isHi ? 'सभी अवसर' : 'All Roles' },
            { id: 'nursing', label: isHi ? 'नर्सिंग' : 'Nursing' },
            { id: 'emergency', label: isHi ? 'आपातकालीन' : 'Emergency Medicine' },
            { id: 'diagnostics', label: isHi ? 'डायग्नोस्टिक्स' : 'Diagnostics' },
          ].map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDept(d.id)}
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all ${
                selectedDept === d.id
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredRoles.map((role) => (
          <Card key={role.id} shape="lantern" className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-[var(--surface-2)]">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-mono text-[var(--accent)] uppercase font-semibold">
                  {role.dept.toUpperCase()} • {role.type}
                </span>
                <h2 className="font-display text-2xl font-bold text-[var(--text)] mt-1">
                  {isHi ? role.title.hi : role.title.en}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] border-t border-b border-[var(--line)]/50 py-2">
                <span className="flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  {role.location}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[var(--sage)]" />
                  {role.experience}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider">
                  {isHi ? 'योग्यता व आवश्यकताएं:' : 'Key Requirements:'}
                </span>
                <ul className="flex flex-col gap-1.5 text-xs text-[var(--text-muted)]">
                  {role.reqs.map((req) => (
                    <li key={req.en} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--sage)] shrink-0 mt-0.5" />
                      <span>{isHi ? req.hi : req.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setSelectedRole(role)}
              className="w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              {isHi ? 'आवेदन करें' : 'Apply for this Role'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Application Modal */}
      {selectedRole && (
        <Modal
          isOpen={!!selectedRole}
          onClose={() => setSelectedRole(null)}
          title={isHi ? 'आवेदन पत्र (Demo)' : 'Apply for Career Role'}
        >
          <form onSubmit={handleApply} className="flex flex-col gap-4 text-sm">
            {submitted ? (
              <div className="p-6 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-[var(--sage)] animate-bounce" />
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  {isHi ? 'आवेदन सफलतापूर्वक जमा!' : 'Application Submitted!'}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Our HR talent acquisition team will review your CV.
                </p>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Role: {isHi ? selectedRole.title.hi : selectedRole.title.en}
                </div>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Full Name
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
                    defaultValue="alex.demo@example.com"
                    className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Contact Mobile
                  <input
                    type="text"
                    required
                    defaultValue="+91 98765 43210"
                    className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                <Button type="submit" variant="primary" size="md" className="mt-2">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  {isHi ? 'आवेदन भेजें' : 'Submit Demo Application'}
                </Button>
              </>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
}
