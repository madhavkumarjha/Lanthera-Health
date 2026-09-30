import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { articles } from '../data/articles';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  FileText,
  Printer,
  CheckCircle2,
} from 'lucide-react';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const defaultArticle = articles[0]!;
  const article = articles.find((a) => a.slug === slug) ?? defaultArticle;

  const [activeLayer, setActiveLayer] = useState<'s30' | 'm3' | 'deep'>('m3');

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Back Button */}
      <Link to="/understand" className="self-start text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" />
        {isHi ? 'ज्ञान पुस्तकालय पर वापस जाएं' : 'Back to Patient Knowledge Library'}
      </Link>

      {/* Article Header Card */}
      <Card shape="lantern" className="p-6 sm:p-10 flex flex-col gap-6 bg-[var(--surface-2)]">
        <div>
          <span className="text-xs font-mono uppercase text-[var(--accent)] font-semibold tracking-wider">
            {article.dept.toUpperCase()} MEDICAL GUIDE
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mt-2">
            {isHi ? article.title.hi : article.title.en}
          </h1>
          <p className="text-base text-[var(--text-muted)] mt-2 leading-relaxed">
            {isHi ? article.summary.hi : article.summary.en}
          </p>
        </div>

        {/* Credibility & Reviewer Badge */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--line)] pt-4">
          <span className="flex items-center gap-1.5 text-[var(--sage)]">
            <ShieldCheck className="w-4 h-4" />
            Peer-Reviewed: {article.reviewedBy}
          </span>
          <span>•</span>
          <span>Reviewed Date: {article.reviewedOn}</span>
        </div>

        {/* 3-Layer Format Switcher Tabs */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            Select Detail Layer:
          </span>
          <div className="grid sm:grid-cols-3 gap-2">
            {[
              { id: 's30', label: isHi ? '30-सेकंड सारांश' : '30-Second Takeaway', sub: 'Quick Scanning' },
              { id: 'm3', label: isHi ? '3-मिनट की समझ' : '3-Minute Understanding', sub: 'Core Concepts' },
              { id: 'deep', label: isHi ? 'गहन क्लिनिकल गाइड' : 'Deep Dive & Guidelines', sub: 'Clinical Details' },
            ].map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id as 's30' | 'm3' | 'deep')}
                className={`p-3 rounded-[var(--radius-sm)] border text-left flex flex-col justify-between transition-all ${
                  activeLayer === layer.id
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                    : 'bg-[var(--surface)] border-[var(--line)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                <span className="text-xs">{layer.label}</span>
                <span className="text-[10px] font-mono opacity-80 mt-1">{layer.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Article Active Layer Content Box */}
      <Card className="p-6 sm:p-10 flex flex-col gap-6 bg-[var(--surface)] leading-relaxed">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase font-semibold border-b border-[var(--line)] pb-3">
          <Clock className="w-4 h-4" />
          Active View: {activeLayer === 's30' ? '30-Second Summary' : activeLayer === 'm3' ? '3-Minute Overview' : 'Clinical Deep Dive'}
        </div>

        <div className="text-sm text-[var(--text)] whitespace-pre-line leading-relaxed font-sans space-y-4">
          {isHi ? article.layers[activeLayer].hi : article.layers[activeLayer].en}
        </div>
      </Card>

      {/* Medical Glossary & Doctor Questions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Glossary */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
            {isHi ? 'चिकित्सा शब्दावली (Medical Glossary)' : 'Plain-Language Medical Glossary'}
          </h2>
          <div className="flex flex-col gap-3">
            {article.glossary.map((g) => (
              <div key={g.term} className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)]">
                <div className="font-display font-bold text-sm text-[var(--accent)]">{g.term}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{isHi ? g.def.hi : g.def.en}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Questions to Ask Doctor */}
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--sage)]" />
              {isHi ? 'डॉक्टर से पूछने वाले सवाल' : 'Questions to Ask Your Doctor'}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => window.print()}>
              <Printer className="w-3.5 h-3.5 mr-1" />
              Print
            </Button>
          </div>
          <ul className="flex flex-col gap-2 text-xs text-[var(--text-muted)]">
            {article.askDoctor.map((q) => (
              <li key={q.en} className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--sage)] shrink-0 mt-0.5" />
                <span>{isHi ? q.hi : q.en}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Sources & Citations */}
      <Card shape="lantern" className="p-6 bg-[var(--surface-2)] border border-[var(--line)] flex flex-col gap-2 text-xs text-[var(--text-muted)]">
        <span className="font-mono text-[var(--accent)] font-semibold flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          Clinical Sources & Medical References:
        </span>
        <ul className="list-disc pl-5 space-y-1">
          {article.sources.map((src) => (
            <li key={src}>{src}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
