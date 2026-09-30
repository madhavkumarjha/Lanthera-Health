import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { departments } from '../data/departments';
import { people } from '../data/people';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Layers,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Calendar,
  User,
  Activity,
  ChevronDown,
} from 'lucide-react';

export default function DepartmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const defaultDept = departments[0]!;
  const dept = departments.find((d) => d.slug === slug) ?? defaultDept;

  const defaultHead = people[0]!;
  const deptHead = people.find((p) => p.id === dept.headId) ?? defaultHead;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Back Button */}
      <Link to="/departments" className="self-start text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" />
        {isHi ? 'सभी विभागों पर वापस जाएं' : 'Back to All Departments'}
      </Link>

      {/* Department Banner Header */}
      <Card shape="lantern" className="p-6 sm:p-10 flex flex-col md:flex-row justify-between gap-8 bg-[var(--surface-2)]">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider self-start">
            <Layers className="w-3.5 h-3.5" />
            24×7 Active Care Center
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? dept.name.hi : dept.name.en}
          </h1>
          <p className="text-base text-[var(--text-muted)] leading-relaxed">
            {isHi ? dept.blurb.hi : dept.blurb.en}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to={`/book?dept=${dept.slug}`}>
              <Button variant="primary" size="md">
                <Calendar className="w-4 h-4 mr-2" />
                {isHi ? 'अपॉइंटमेंट बुक करें' : 'Book Department Visit'}
              </Button>
            </Link>
            <Link to={`/doctors?dept=${dept.slug}`}>
              <Button variant="secondary" size="md">
                <User className="w-4 h-4 mr-2" />
                {isHi ? 'डॉक्टर देखें' : 'View Specialists'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Dept Head Mini Profile Card */}
        {deptHead && (
          <div className="p-5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-3 shrink-0 w-full md:w-72 self-start">
            <span className="text-[10px] font-mono uppercase text-[var(--accent)] font-bold">
              {isHi ? 'विभाग प्रमुख' : 'Department Head'}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center font-display font-bold text-[var(--accent)]">
                {deptHead.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <Link to={`/doctors/${deptHead.id}`} className="font-display font-bold text-sm text-[var(--text)] hover:text-[var(--accent)]">
                  {deptHead.name}
                </Link>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">
                  {isHi ? deptHead.role.hi : deptHead.role.en}
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] border-t border-[var(--line)]/50 pt-2">
              Reg: {deptHead.regId}
            </span>
          </div>
        )}
      </Card>

      {/* Conditions Treated & Diagnostic Tests Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Conditions Treated */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[var(--sage)]" />
            {isHi ? 'प्रमुख स्थितियां व इलाज' : 'Conditions Treated'}
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-[var(--text-muted)]">
            {dept.conditions.map((c) => (
              <li key={c.en} className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] flex items-center justify-between">
                <span className="font-medium text-[var(--text)]">{isHi ? c.hi : c.en}</span>
                <CheckCircle2 className="w-4 h-4 text-[var(--sage)]" />
              </li>
            ))}
          </ul>
        </Card>

        {/* Diagnostic Tests */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[var(--accent)]" />
            {isHi ? 'उपलब्ध नैदानिक जांचें' : 'Diagnostic Tests Available'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {dept.tests.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs font-mono text-[var(--text)] border border-[var(--line)]">
                {t}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Department FAQ Accordion */}
      {dept.faq.length > 0 && (
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[var(--accent)]" />
            {isHi ? 'अक्सर पूछे जाने वाले सवाल (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <div className="flex flex-col gap-3">
            {dept.faq.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={f.q.en} className="border border-[var(--line)] rounded-[var(--radius-sm)] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-display font-semibold text-sm text-[var(--text)] flex justify-between items-center bg-[var(--surface-2)] hover:bg-[var(--surface-2)]/80"
                  >
                    <span>{isHi ? f.q.hi : f.q.en}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs text-[var(--text-muted)] leading-relaxed bg-[var(--surface)] border-t border-[var(--line)]">
                      {isHi ? f.a.hi : f.a.en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
