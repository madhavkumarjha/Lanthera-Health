import { useState } from 'react';
import { people } from '../data/people';
import { departments } from '../data/departments';
import { Person } from '../types';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  Users,
  Network,
  List,
  ArrowRight,
  User,
} from 'lucide-react';
import { Link } from 'react-router';

export default function TeamPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [viewMode, setViewMode] = useState<'constellation' | 'tree'>('constellation');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [activePerson, setActivePerson] = useState<Person | null>(null);

  const filteredPeople = people.filter((p) => {
    if (selectedDept !== 'all' && p.dept !== selectedDept) return false;
    return true;
  });

  const defaultFounder = people[0]!;
  const founder = people.find((p) => p.kind === 'founder') ?? defaultFounder;
  const heads = filteredPeople.filter((p) => p.kind === 'head');
  const doctors = filteredPeople.filter((p) => p.kind === 'doctor');
  const supportStaff = filteredPeople.filter((p) => p.kind === 'nurse' || p.kind === 'diagnostics');

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header & View Mode Switch */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            {isHi ? 'सर्कल ऑफ केयर (टीम जवाबदेही)' : 'Circle of Care (Multidisciplinary Team)'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'किसकी क्या जवाबदेही है — पारदर्शी टीम' : 'Visible Accountability — Who Leads Whom'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? 'अस्पताल के संस्थापकों से लेकर विभागाध्यक्षों, डॉक्टरों व नर्सों तक का पारदर्शी ढांचा।'
              : 'Interactive constellation showing executive leadership, department heads, attending physicians, and care staff.'}
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
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

          {/* View Toggle */}
          <div className="flex rounded-[var(--radius-sm)] bg-[var(--surface-2)] p-1 border border-[var(--line)]">
            <button
              type="button"
              onClick={() => setViewMode('constellation')}
              className={`px-3 py-1 rounded-[var(--radius-sm)] text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'constellation'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              {isHi ? 'ताराग्राम (Constellation)' : 'Constellation'}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1 rounded-[var(--radius-sm)] text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'tree'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              {isHi ? 'सूची (Tree List)' : 'Accessible Tree'}
            </button>
          </div>
        </div>
      </div>

      {/* CONSTELLATION VIEW */}
      {viewMode === 'constellation' ? (
        <Card shape="lantern" className="p-8 bg-[var(--surface-2)] border-[var(--line)] flex flex-col items-center gap-12 relative overflow-hidden">
          {/* Orbit Halo Rings Motif Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-[600px] h-[600px] rounded-full border border-[var(--accent)] animate-spin [animation-duration:60s]" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-[var(--accent)]" />
          </div>

          {/* Core Founder Node */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <button
              type="button"
              onClick={() => setActivePerson(founder)}
              className="group flex flex-col items-center focus:outline-none"
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full border-2 border-[var(--accent)] opacity-60 blur-sm animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center font-display font-bold text-xl text-[var(--accent)] shadow-xl relative z-10 group-hover:scale-105 transition-transform">
                  {founder.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>
              <span className="font-display font-bold text-base text-[var(--text)] mt-3 group-hover:text-[var(--accent)]">
                {founder.name}
              </span>
              <span className="text-xs font-mono text-[var(--accent)]">
                {isHi ? founder.role.hi : founder.role.en}
              </span>
            </button>
          </div>

          {/* Department Heads Ring */}
          <div className="w-full flex flex-col gap-3 relative z-10">
            <div className="text-xs font-mono text-center text-[var(--text-muted)] uppercase tracking-widest border-t border-b border-[var(--line)]/50 py-1.5">
              Inner Ring • Department Heads & Leads
            </div>

            <div className="flex flex-wrap justify-center gap-6 py-4">
              {heads.map((head) => (
                <button
                  key={head.id}
                  type="button"
                  onClick={() => setActivePerson(head)}
                  className="group flex flex-col items-center p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all w-44 focus:outline-none"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] border border-[var(--accent)] flex items-center justify-center font-display font-bold text-sm text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform">
                    {head.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="font-display font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent)] text-center line-clamp-1">
                    {head.name}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] text-center line-clamp-1">
                    {isHi ? head.role.hi : head.role.en}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Staff & Doctors Ring */}
          {(doctors.length > 0 || supportStaff.length > 0) && (
            <div className="w-full flex flex-col gap-3 relative z-10">
              <div className="text-xs font-mono text-center text-[var(--text-muted)] uppercase tracking-widest border-t border-b border-[var(--line)]/50 py-1.5">
                Outer Ring • Attending Physicians & Care Staff
              </div>

              <div className="flex flex-wrap justify-center gap-4 py-4">
                {[...doctors, ...supportStaff].map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => setActivePerson(person)}
                    className="group flex items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center font-display font-bold text-xs text-[var(--accent)]">
                      {person.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <div className="font-display font-bold text-xs text-[var(--text)] group-hover:text-[var(--accent)]">
                        {person.name}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">
                        {isHi ? person.role.hi : person.role.en}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      ) : (
        /* ACCESSIBLE TREE LIST VIEW */
        <Card className="p-6 flex flex-col gap-6">
          <h2 className="font-display text-xl font-bold text-[var(--text)]">
            {isHi ? 'संरचित टीम पदानुक्रम (Hierarchical List)' : 'Hierarchical Care Team Tree'}
          </h2>

          <ol className="flex flex-col gap-6 list-decimal pl-5">
            <li className="font-semibold text-base text-[var(--accent)]">
              {founder.name} — <span className="text-sm font-normal text-[var(--text)]">{isHi ? founder.role.hi : founder.role.en}</span>
              <ul className="mt-3 flex flex-col gap-4 list-disc pl-5 font-normal">
                {heads.map((head) => (
                  <li key={head.id} className="text-sm font-medium text-[var(--text)]">
                    {head.name} ({isHi ? head.role.hi : head.role.en})
                    <ul className="mt-2 flex flex-col gap-1.5 list-circle pl-5 text-xs text-[var(--text-muted)]">
                      {people
                        .filter((p) => p.reportsTo === head.id)
                        .map((sub) => (
                          <li key={sub.id}>
                            <Link to={`/doctors/${sub.id}`} className="hover:text-[var(--accent)] underline">
                              {sub.name} — {isHi ? sub.role.hi : sub.role.en} (Reg: {sub.regId})
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </Card>
      )}

      {/* Person Detail Modal */}
      {activePerson && (
        <Modal
          isOpen={!!activePerson}
          onClose={() => setActivePerson(null)}
          title={activePerson.name}
        >
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)]">
              <User className="w-8 h-8 text-[var(--accent)] shrink-0" />
              <div>
                <div className="font-display font-bold text-base text-[var(--text)]">
                  {activePerson.name}
                </div>
                <div className="text-xs text-[var(--accent)] font-semibold">
                  {isHi ? activePerson.role.hi : activePerson.role.en}
                </div>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {isHi ? activePerson.bio.hi : activePerson.bio.en}
            </p>

            <div className="text-xs text-[var(--text-muted)] flex flex-col gap-1 pt-2 border-t border-[var(--line)]">
              <div><strong>Registration ID:</strong> {activePerson.regId}</div>
              <div><strong>Languages Spoken:</strong> {activePerson.languages.join(', ')}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Link to={`/doctors/${activePerson.id}`} onClick={() => setActivePerson(null)}>
                <Button variant="primary" size="sm">
                  {isHi ? 'पूर्ण प्रोफाइल देखें' : 'View Full Profile'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
