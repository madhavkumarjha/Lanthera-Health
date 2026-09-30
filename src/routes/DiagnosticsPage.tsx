import { useState, FormEvent } from 'react';
import { diagnosticTests } from '../data/diagnostics';
import { DiagnosticItem } from '../types';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  Activity,
  Search,
  Clock,
  Home,
  AlertCircle,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export default function DiagnosticsPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPrepId, setExpandedPrepId] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<DiagnosticItem | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const filteredTests = diagnosticTests.filter((test) => {
    if (selectedCategory !== 'all' && test.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNameEn = test.name.en.toLowerCase().includes(q);
      const matchNameHi = test.name.hi.toLowerCase().includes(q);
      const matchCode = test.code.toLowerCase().includes(q);
      return matchNameEn || matchNameHi || matchCode;
    }
    return true;
  });

  const handleConfirmBooking = (e: FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      setSelectedTest(null);
      setBookedSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            {isHi ? 'डायग्नोस्टिक्स व लैब निर्देशिका' : 'Diagnostic Imaging & Pathology Directory'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'सटीक नैदानिक जांचें एवं होम सैंपल' : 'Precision Diagnostics & Home Sample Collection'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? '3T MRI, 128-Slice CT, उन्नत पैथोलॉजी व जीनोमिक्स जांचों के लिए तैयारी निर्देश और पारदर्शी दरें।'
              : 'Search 3T MRI, CT Coronary Angiography, molecular pathology, and home blood collection options.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isHi ? 'जांच या कोड खोजें...' : 'Search test name or code...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: isHi ? 'सभी जांचें' : 'All Tests' },
          { id: 'radiology', label: isHi ? 'रेडियोलॉजी (MRI/CT)' : 'Radiology & Imaging' },
          { id: 'pathology', label: isHi ? 'पैथोलॉजी (रक्त जांच)' : 'Pathology' },
          { id: 'cardiac', label: isHi ? 'कार्डिएक (होलटर/ECG)' : 'Cardiac Diagnostics' },
          { id: 'genomics', label: isHi ? 'जीनोमिक्स (कैंसर पैनल)' : 'Genomics' },
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

      {/* Tests Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTests.map((test) => {
          const isPrepOpen = expandedPrepId === test.id;
          return (
            <Card key={test.id} shape="lantern" className="p-6 flex flex-col justify-between gap-5 bg-[var(--surface-2)]">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--accent)] uppercase font-semibold">
                      {test.code}
                    </span>
                    <h2 className="font-display text-xl font-bold text-[var(--text)] mt-0.5">
                      {isHi ? test.name.hi : test.name.en}
                    </h2>
                  </div>
                  <div className="font-display font-bold text-xl text-[var(--accent)] shrink-0">
                    ₹{test.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] border-t border-b border-[var(--line)]/50 py-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {test.tatHours}h Report TAT
                  </span>
                  {test.homeSample ? (
                    <span className="flex items-center gap-1 font-mono text-[var(--sage)] font-semibold">
                      <Home className="w-3.5 h-3.5" />
                      Home Sample Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-mono text-[var(--text-muted)] opacity-70">
                      Hospital Visit Required
                    </span>
                  )}
                </div>

                {/* Preparation Instructions Accordion */}
                <div className="border border-[var(--line)] rounded-[var(--radius-sm)] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedPrepId(isPrepOpen ? null : test.id)}
                    className="w-full p-2.5 text-left font-mono text-xs text-[var(--text)] flex justify-between items-center bg-[var(--surface)] hover:bg-[var(--surface)]/80"
                  >
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {isHi ? 'जांच तैयारी निर्देश' : 'Preparation Guidelines'}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPrepOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isPrepOpen && (
                    <div className="p-3 text-xs text-[var(--text-muted)] leading-relaxed bg-[var(--surface-2)] border-t border-[var(--line)] flex flex-col gap-1.5">
                      {test.prepInstructions.map((p) => (
                        <div key={p.en} className="flex items-start gap-1.5">
                          <span className="text-[var(--accent)]">•</span>
                          <span>{isHi ? p.hi : p.en}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setSelectedTest(test)}
                className="w-full"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {isHi ? 'जांच / सैंपल बुक करें' : `Book Test (₹${test.price})`}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Booking Modal */}
      {selectedTest && (
        <Modal
          isOpen={!!selectedTest}
          onClose={() => setSelectedTest(null)}
          title={isHi ? 'नैदानिक जांच बुकिंग' : 'Book Diagnostic Test'}
        >
          <form onSubmit={handleConfirmBooking} className="flex flex-col gap-4 text-sm">
            {bookedSuccess ? (
              <div className="p-6 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-[var(--sage)] animate-bounce" />
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  {isHi ? 'जांच बुकिंग कन्फर्म हो गई!' : 'Diagnostic Slot Confirmed!'}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Appointment reserved for {selectedTest.code} ({isHi ? selectedTest.name.hi : selectedTest.name.en}).
                </p>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)]">
                  Test: {selectedTest.code} • Fee: ₹{selectedTest.price}
                </div>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Patient Name
                  <input
                    type="text"
                    required
                    defaultValue="Alex Morgan"
                    className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Contact Mobile
                  <input
                    type="text"
                    required
                    defaultValue="+1 (800) 555-0199"
                    className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                {selectedTest.homeSample && (
                  <label className="flex items-center gap-2 text-xs font-semibold text-[var(--sage)]">
                    <input type="checkbox" defaultChecked className="rounded border-[var(--line)]" />
                    Opt for Home Sample Collection (Complimentary Service)
                  </label>
                )}

                <Button type="submit" variant="primary" size="md" className="mt-2">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  {isHi ? 'बुकिंग की पुष्टि करें' : 'Confirm Test Appointment'}
                </Button>
              </>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
}
