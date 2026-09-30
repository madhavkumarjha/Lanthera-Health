import { useState, FormEvent } from 'react';
import { healthPackages } from '../data/packages';
import { Package } from '../types';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  PackageCheck,
  CheckCircle2,
  Clock,
  Home,
  Calendar,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export default function PackagesPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const filteredPackages = healthPackages.filter((pkg) => {
    if (selectedCategory !== 'all' && pkg.category !== selectedCategory) return false;
    return true;
  });

  const handleConfirmBooking = (e: FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      setSelectedPackage(null);
      setBookedSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <PackageCheck className="w-3.5 h-3.5" />
            {isHi ? 'स्वास्थ्य जांच पैकेज' : 'Preventive Health Packages'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'नियमित स्वास्थ्य जांच — स्वस्थ कल की ओर' : 'Comprehensive Wellness & Preventive Health Checks'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? 'आपकी उम्र, लिंग व जीवनशैली के अनुसार विशेष रूप से डिज़ाइन किए गए पारदर्शी पैकेज।'
              : 'Scientifically curated health checkup plans with home sample collection options and transparent pricing.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: isHi ? 'सभी पैकेज' : 'All Packages' },
            { id: 'preventive', label: isHi ? 'प्रिवेंटिव' : 'Preventive' },
            { id: 'senior', label: isHi ? 'सीनियर सिटीजन' : 'Senior Care' },
            { id: 'cardiac', label: isHi ? 'कार्डिएक' : 'Cardiac' },
            { id: 'women', label: isHi ? 'महिला स्वास्थ्य' : 'Women Wellness' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} shape="lantern" className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-[var(--surface-2)]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--accent)] uppercase font-semibold">
                    {pkg.category.toUpperCase()} PACKAGE
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[var(--text)] mt-1">
                    {isHi ? pkg.name.hi : pkg.name.en}
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display font-bold text-2xl text-[var(--accent)]">
                    ₹{pkg.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)]">
                    All taxes included
                  </div>
                </div>
              </div>

              <div className="text-xs text-[var(--text-muted)] flex items-center gap-4 border-t border-b border-[var(--line)]/50 py-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                  ~{pkg.durationMin} mins
                </span>
                <span className="flex items-center gap-1">
                  <Home className="w-3.5 h-3.5 text-[var(--sage)]" />
                  {isHi ? pkg.sampleMode.hi : pkg.sampleMode.en}
                </span>
              </div>

              <div className="text-xs text-[var(--text-muted)]">
                <strong>Suitable for:</strong> {pkg.audience}
              </div>

              {/* Tests Included List */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider">
                  {isHi ? 'शामिल परीक्षण व जांचें:' : 'Key Included Diagnostics:'}
                </span>
                <ul className="flex flex-col gap-1.5 text-xs text-[var(--text-muted)]">
                  {pkg.includes.map((inc) => (
                    <li key={inc.en} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--sage)] shrink-0 mt-0.5" />
                      <span>{isHi ? inc.hi : inc.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prep Guidelines */}
              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-xs text-[var(--text-muted)] flex flex-col gap-1 mt-2">
                <span className="font-mono text-[10px] text-[var(--accent)] font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {isHi ? 'जांच पूर्व सावधानियां:' : 'Preparation Guidelines:'}
                </span>
                {pkg.prep.map((p) => (
                  <div key={p.en} className="text-[11px]">• {isHi ? p.hi : p.en}</div>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setSelectedPackage(pkg)}
              className="w-full"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {isHi ? 'पैकेज बुक करें' : `Book Checkup (₹${pkg.price})`}
            </Button>
          </Card>
        ))}
      </div>

      {/* Package Booking Modal */}
      {selectedPackage && (
        <Modal
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          title={isHi ? 'स्वास्थ्य जांच बुकिंग (Demo)' : 'Book Preventive Health Check'}
        >
          <form onSubmit={handleConfirmBooking} className="flex flex-col gap-4 text-sm">
            {bookedSuccess ? (
              <div className="p-6 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-[var(--sage)] animate-bounce" />
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  {isHi ? 'बुकिंग की पुष्टि हो गई!' : 'Health Check Booked!'}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Demo booking for {isHi ? selectedPackage.name.hi : selectedPackage.name.en}. Our phlebotomist team will contact you.
                </p>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)]">
                  Package: {isHi ? selectedPackage.name.hi : selectedPackage.name.en} • Price: ₹{selectedPackage.price}
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
                  Contact Mobile
                  <input
                    type="text"
                    required
                    defaultValue="+91 98765 43210"
                    className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Preferred Date
                  <input
                    type="date"
                    required
                    defaultValue="2026-10-05"
                    className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                <Button type="submit" variant="primary" size="md" className="mt-2">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  {isHi ? 'बुकिंग कन्फर्म करें' : 'Confirm Demo Checkup Booking'}
                </Button>
              </>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
}
