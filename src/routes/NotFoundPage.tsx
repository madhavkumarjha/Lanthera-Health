import { Link } from 'react-router';
import { Compass, Home, PhoneCall, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLocale } from '../hooks/useLocale';

export default function NotFoundPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-8">
      {/* Lantern Glow Illustration */}
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-[var(--accent)]/20 blur-2xl animate-pulse" />
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[var(--surface-2)] border-2 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] relative z-10 shadow-2xl">
          <Compass className="w-14 h-14 animate-[spin_12s_linear_infinite]" />
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-lg">
        <div className="inline-flex items-center gap-2 self-center px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] font-bold">
          404 — PAGE NOT FOUND
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
          {isHi ? 'रास्ता भटक गए? हम मार्गदर्शन करते हैं।' : 'Lost your way? Let us light the path.'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {isHi
            ? 'आप जिस पृष्ठ को खोज रहे हैं वह स्थानांतरित कर दिया गया है या मौजूद नहीं है। आप नीचे दिए गए मुख्य रास्तों से शुरुआत कर सकते हैं।'
            : 'The clinical resource or page you requested could not be found. Let our Lantern Guide help you navigate back to safety.'}
        </p>
      </div>

      {/* Quick Route Cards */}
      <div className="grid sm:grid-cols-3 gap-4 w-full text-left">
        <Link to="/" className="group">
          <Card className="p-4 bg-[var(--surface-2)] border border-[var(--line)] group-hover:border-[var(--accent)] transition-all hover-lift flex flex-col gap-2">
            <Home className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="font-bold text-sm text-[var(--text)]">Home Page</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Return to main healthcare overview</p>
          </Card>
        </Link>

        <Link to="/guide" className="group">
          <Card className="p-4 bg-[var(--surface-2)] border border-[var(--line)] group-hover:border-[var(--accent)] transition-all hover-lift flex flex-col gap-2">
            <Compass className="w-5 h-5 text-[var(--sage)]" />
            <h3 className="font-bold text-sm text-[var(--text)]">Lantern Guide</h3>
            <p className="text-[11px] text-[var(--text-muted)]">2-minute triage & decision tree</p>
          </Card>
        </Link>

        <Link to="/emergency" className="group">
          <Card className="p-4 bg-[var(--surface-2)] border border-[var(--line)] group-hover:border-[var(--emergency)] transition-all hover-lift flex flex-col gap-2">
            <PhoneCall className="w-5 h-5 text-[var(--emergency)]" />
            <h3 className="font-bold text-sm text-[var(--emergency)]">Emergency 24×7</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Direct helpline & ambulance triage</p>
          </Card>
        </Link>
      </div>

      {/* Primary Action Button */}
      <Link to="/">
        <Button variant="primary" size="lg" className="hover-glow">
          <Home className="w-5 h-5 mr-2" />
          {isHi ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Return to Home Page'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
