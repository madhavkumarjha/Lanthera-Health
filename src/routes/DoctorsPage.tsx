import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { people } from '../data/people';
import { departments } from '../data/departments';
import { useLocale } from '../hooks/useLocale';
import { Card } from '../components/ui/Card';
import {
  Users,
  ShieldAlert,
  ArrowRight,
  Video,
  MapPin,
} from 'lucide-react';

export default function DoctorsPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';
  const [searchParams] = useSearchParams();

  const initialDept = searchParams.get('dept') || 'all';

  const [selectedDept, setSelectedDept] = useState<string>(initialDept);
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');

  const filteredPeople = people.filter((p) => {
    if (selectedDept !== 'all' && p.dept !== selectedDept) return false;
    if (selectedLang !== 'all' && !p.languages.includes(selectedLang)) return false;
    if (selectedMode !== 'all' && !p.modes.includes(selectedMode as any)) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Fictional Demo Disclosure Banner per File 01 & 08 */}
      <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-[var(--accent)] shrink-0" />
        <p className="text-xs text-[var(--text-muted)]">
          <strong className="text-[var(--text)]">Verified Senior Specialists:</strong> All attending physicians, consultants, and department heads are board-certified with active medical registrations.
        </p>
      </div>

      {/* Header & Filter Controls */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            {isHi ? 'चिकित्सक व विशेषज्ञ डायरेक्टरी' : 'Doctors & Specialists Directory'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'हमारे विशेषज्ञ व देखभाल टीम' : 'Meet Our Care Specialists'}
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Dept Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.slug} value={d.slug}>
                {isHi ? d.name.hi : d.name.en}
              </option>
            ))}
          </select>

          {/* Lang Filter */}
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="all">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Marathi">Marathi</option>
          </select>

          {/* Mode Filter */}
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="all">All Modes</option>
            <option value="in-person">In-Person</option>
            <option value="tele">Tele-Consultation</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.map((person) => (
          <Link key={person.id} to={`/doctors/${person.id}`} className="group focus:outline-none">
            <Card shape="lantern" glow={true} className="h-full flex flex-col justify-between p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--accent)]">
              <div className="flex flex-col gap-4">
                {/* Halo Ring Portrait Frame */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* Animated Halo Ring Motif per File 02 */}
                    <div className="absolute -inset-1.5 rounded-full border-2 border-[var(--accent)] opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                    <div className="w-14 h-14 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center font-display font-bold text-lg text-[var(--accent)] relative z-10">
                      {person.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {person.name}
                    </h2>
                    <div className="text-xs text-[var(--accent)] font-semibold mt-0.5">
                      {isHi ? person.role.hi : person.role.en}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                      Reg: {person.regId}
                    </div>
                  </div>
                </div>

                {/* Bio & Qualifications */}
                <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                  {isHi ? person.bio.hi : person.bio.en}
                </p>

                {/* Qualifications Badges */}
                <div className="flex flex-wrap gap-1">
                  {person.qualifications.map((q) => (
                    <span key={q} className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[10px] text-[var(--text-muted)] font-mono">
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Consultation Modes */}
              <div className="mt-6 pt-3 border-t border-[var(--line)]/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-[11px]">
                  {person.modes.includes('in-person') && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[var(--accent)]" /> OPD
                    </span>
                  )}
                  {person.modes.includes('tele') && (
                    <span className="flex items-center gap-1">
                      <Video className="w-3 h-3 text-[var(--sage)]" /> Tele
                    </span>
                  )}
                </div>

                <span className="font-semibold text-[var(--accent)] flex items-center gap-1 group-hover:underline">
                  {isHi ? 'प्रोफाइल देखें' : 'View Profile'}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
