import { useState } from 'react';
import { Link } from 'react-router';
import { departments } from '../data/departments';
import { useLocale } from '../hooks/useLocale';
import { Card } from '../components/ui/Card';
import {
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function DepartmentsPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  const filteredDepts = departments.filter((d) => {
    if (selectedAudience === 'all') return true;
    return d.audience.includes(selectedAudience as any);
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            {isHi ? 'चिकित्सा विभाग (12 विशेष केंद्र)' : 'Medical Departments (12 Centers)'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? '24×7 बहु-विषयक चिकित्सा विभाग' : 'Multidisciplinary Medical Care Centers'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? 'आपातकालीन हृदय देखभाल से लेकर बाल रोग व न्यूरोलॉजी तक, सभी विभाग 24 घंटे तत्पर हैं।'
              : 'From 24×7 emergency trauma and cardiology to pediatrics, maternity, and oncology.'}
          </p>
        </div>

        {/* Audience Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            {isHi ? 'फिल्टर:' : 'Filter:'}
          </span>
          {[
            { id: 'all', label: isHi ? 'सभी (All)' : 'All Departments' },
            { id: 'adult', label: isHi ? 'वयस्क' : 'Adult' },
            { id: 'child', label: isHi ? 'बाल रोग' : 'Children' },
            { id: 'women', label: isHi ? 'महिला' : 'Women' },
            { id: 'senior', label: isHi ? 'वरिष्ठ' : 'Seniors' },
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setSelectedAudience(chip.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedAudience === chip.id
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* 12 Department Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <Link key={dept.slug} to={`/departments/${dept.slug}`} className="group focus:outline-none">
            <Card shape="lantern" glow={true} className="h-full flex flex-col justify-between p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--accent)]">
              <div className="flex flex-col gap-4">
                {/* Lit Window Badge Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] transition-colors">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--accent)] uppercase font-semibold">
                    24×7 Active
                  </span>
                </div>

                {/* Title & Blurb */}
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {isHi ? dept.name.hi : dept.name.en}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-1.5">
                    {isHi ? dept.blurb.hi : dept.blurb.en}
                  </p>
                </div>

                {/* Key Conditions Treated */}
                <div className="flex flex-wrap gap-1.5">
                  {dept.conditions.slice(0, 2).map((c) => (
                    <span key={c.en} className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[10px] text-[var(--text-muted)]">
                      {isHi ? c.hi : c.en}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="mt-6 pt-4 border-t border-[var(--line)]/50 flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
                <span>{isHi ? 'विभाग विवरण देखें' : 'View Department Details'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
