import { useState } from 'react';
import { Link } from 'react-router';
import { articles } from '../data/articles';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BookOpen, Search, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function UnderstandPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredArticles = articles.filter((art) => {
    if (selectedDept !== 'all' && art.dept !== selectedDept) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitleEn = art.title.en.toLowerCase().includes(q);
      const matchTitleHi = art.title.hi.toLowerCase().includes(q);
      const matchSummaryEn = art.summary.en.toLowerCase().includes(q);
      return matchTitleEn || matchTitleHi || matchSummaryEn;
    }
    return true;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            {isHi ? 'मरीज ज्ञान केंद्र (Understand)' : 'Patient Knowledge Library'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'स्पष्ट, बिना चिकित्सा जटिलता के स्वास्थ्य जानकारी' : 'Clear, Plain-Language Health Insights'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? '30-सेकंड त्वरित सारांश, 3-मिनट की समझ और गहराई से क्लिनिकल जानकारी।'
              : 'Multi-layered patient articles: 30-second summary, 3-minute overview, and clinical deep dives.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isHi ? 'विषय या बीमारी खोजें...' : 'Search articles or symptoms...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: isHi ? 'सभी लेख' : 'All Articles' },
          { id: 'cardiology', label: isHi ? 'हृदय रोग (Cardiology)' : 'Cardiology' },
          { id: 'neurology', label: isHi ? 'न्यूरोलॉजी (Neurology)' : 'Neurology' },
          { id: 'orthopedics', label: isHi ? 'ऑर्थोपेडिक्स (Orthopedics)' : 'Orthopedics' },
          { id: 'general-surgery', label: isHi ? 'शल्य चिकित्सा (Surgery)' : 'General Surgery' },
        ].map((dept) => (
          <button
            key={dept.id}
            type="button"
            onClick={() => setSelectedDept(dept.id)}
            className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all ${
              selectedDept === dept.id
                ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => (
          <Card key={art.slug} shape="lantern" className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-[var(--surface-2)]">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-mono text-[var(--accent)]">
                <span className="uppercase">{art.dept}</span>
                <span className="flex items-center gap-1 opacity-80">
                  <Clock className="w-3 h-3" />
                  3-Layer Article
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                <Link to={`/understand/${art.slug}`}>
                  {isHi ? art.title.hi : art.title.en}
                </Link>
              </h2>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {isHi ? art.summary.hi : art.summary.en}
              </p>

              {/* 30s Snippet Teaser Box */}
              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--text)] flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider">
                  30-Second Takeaway:
                </span>
                <p className="text-xs text-[var(--text-muted)] italic">
                  "{isHi ? art.layers.s30.hi : art.layers.s30.en}"
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-[var(--line)]/50 pt-4">
              <span className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--sage)]" />
                Reviewed by {art.reviewedBy}
              </span>

              <Link to={`/understand/${art.slug}`}>
                <Button variant="secondary" size="sm">
                  {isHi ? 'पूरा लेख पढ़ें' : 'Read 3-Layer Article'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
