import { Link } from 'react-router';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Users,
  Tv,
  Clock,
  Coffee,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function FamiliesPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <Users className="w-3.5 h-3.5" />
          {isHi ? 'परिवार सहायता केंद्र' : 'Family Care & Visiting Guide'}
        </div>
        <h1 className="font-display text-4xl font-bold text-[var(--text)]">
          {isHi ? 'परिजनों के लिए सुविधाएं व शांत विश्राम' : 'Supporting Families at Every Hour'}
        </h1>
        <p className="text-base text-[var(--text-muted)] mt-1">
          {isHi
            ? 'वेटिंग रूम लाइव बोर्ड, शांत लाउंज, विजिटिंग नियम और फैमिली सुविधाएं।'
            : 'Explore family waiting lounges, visiting guidelines, meal services, and real-time surgical status tracking.'}
        </p>
      </div>

      {/* Primary Waiting Room Live Hero Banner */}
      <Card shape="lantern" className="p-8 bg-gradient-to-r from-[var(--surface)] to-[var(--surface-2)] border-[var(--accent)]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[var(--elevation-shadow)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] shrink-0">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">
              {isHi ? 'वेटिंग रूम लाइव स्टेटस बोर्ड' : 'Waiting Room Live Status Board'}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
              {isHi
                ? 'गोपनीयता सुरक्षा के साथ टोकन द्वारा सर्जरी व रिकवरी की लाइव स्थिति देखें।'
                : 'Track anonymised tokens (e.g. L-204) through preparation, procedure, recovery, and room assignment.'}
            </p>
          </div>
        </div>

        <Link to="/families/board" className="shrink-0">
          <Button variant="primary" size="lg">
            <Tv className="w-5 h-5 mr-2" />
            {isHi ? 'लाइव बोर्ड खोलें' : 'Open Waiting Room Live Board'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </Card>

      {/* Family Amenities & Guidelines Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col gap-3">
          <Clock className="w-8 h-8 text-[var(--accent)]" />
          <h3 className="font-display text-xl font-bold text-[var(--text)]">
            {isHi ? 'विजिटिंग घंटे' : 'Visiting Hours & Guidelines'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Inpatient Wards: 10:00 AM – 1:00 PM & 5:00 PM – 8:00 PM. ICU visiting: 4:00 PM – 6:00 PM (1 visitor at a time).
          </p>
        </Card>

        <Card className="p-6 flex flex-col gap-3">
          <Coffee className="w-8 h-8 text-[var(--clay)]" />
          <h3 className="font-display text-xl font-bold text-[var(--text)]">
            {isHi ? 'शांत लाउंज व कैफे' : 'Quiet Lounges & Cafeteria'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            24×7 warm tea/coffee stations, comfortable reclining seating, power charging outlets, and silent prayer spaces.
          </p>
        </Card>

        <Card className="p-6 flex flex-col gap-3">
          <ShieldCheck className="w-8 h-8 text-[var(--sage)]" />
          <h3 className="font-display text-xl font-bold text-[var(--text)]">
            {isHi ? 'परिवार हेल्प डेस्क' : 'Family Help Desk'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Dedicated family liaison coordinators present on Floor 1 & Floor 3 to answer non-clinical stay queries.
          </p>
        </Card>
      </div>
    </div>
  );
}
