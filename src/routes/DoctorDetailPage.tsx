import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { people } from '../data/people';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function DoctorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const defaultDoctor = people[0]!;
  const doctor = people.find((p) => p.id === slug) ?? defaultDoctor;
  const [selectedSlot, setSelectedSlot] = useState<string | null>(doctor.demoSlots[0] || null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const handleConfirmBooking = () => {
    setBookedSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookedSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Back Link */}
      <Link to="/doctors" className="self-start text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" />
        {isHi ? 'सभी डॉक्टरों पर वापस जाएं' : 'Back to Doctors Directory'}
      </Link>

      {/* Doctor Profile Banner Card */}
      <Card shape="lantern" className="p-6 sm:p-10 flex flex-col md:flex-row gap-8 bg-[var(--surface-2)]">
        {/* Halo Ring Portrait */}
        <div className="relative shrink-0 self-start">
          <div className="absolute -inset-2 rounded-full border-2 border-[var(--accent)] opacity-60 blur-[1px] animate-pulse" />
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center font-display font-bold text-3xl text-[var(--accent)] relative z-10 shadow-lg">
            {doctor.name.split(' ').map((n) => n[0]).join('')}
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] text-xs font-mono text-[var(--accent)] font-semibold mb-2">
              Reg ID: {doctor.regId}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
              {doctor.name}
            </h1>
            <div className="text-base text-[var(--accent)] font-semibold mt-1">
              {isHi ? doctor.role.hi : doctor.role.en}
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {isHi ? doctor.bio.hi : doctor.bio.en}
          </p>

          {/* Languages & Modes */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--line)]">
            <div>
              <strong>Languages:</strong> {doctor.languages.join(', ')}
            </div>
            <div>
              <strong>Qualifications:</strong> {doctor.qualifications.join(', ')}
            </div>
          </div>

          {/* Demo Slots & Booking */}
          {doctor.demoSlots.length > 0 && (
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-xs font-mono font-semibold text-[var(--text)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                {isHi ? 'उपलब्ध डेमो स्लॉट:' : 'Select Demo Slot:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {doctor.demoSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono transition-all ${
                      selectedSlot === slot
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                        : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setBookingModalOpen(true)}
              className="w-full sm:w-auto"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {isHi ? 'अपॉइंटमेंट बुक करें' : `Book Visit with ${doctor.name}`}
            </Button>
          </div>
        </div>
      </Card>

      {/* Booking Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={isHi ? 'अपॉइंटमेंट बुकिंग (Demo)' : 'Book Demo Appointment'}
      >
        <div className="flex flex-col gap-4 text-sm">
          {bookedSuccess ? (
            <div className="p-6 text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-[var(--sage)] animate-bounce" />
              <h3 className="font-display text-xl font-bold text-[var(--text)]">
                {isHi ? 'अपॉइंटमेंट की पुष्टि हो गई!' : 'Appointment Confirmed!'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Demo booking for {doctor.name} at {selectedSlot || '10:00 AM'}.
              </p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)]">
                Doctor: {doctor.name} • Slot: {selectedSlot || '10:00 AM'}
              </div>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Patient Name
                <input
                  type="text"
                  defaultValue="Alex Demo"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Contact Phone
                <input
                  type="text"
                  defaultValue="+91 98765 43210"
                  className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                />
              </label>

              <Button variant="primary" size="md" onClick={handleConfirmBooking} className="mt-2">
                <ShieldCheck className="w-4 h-4 mr-2" />
                {isHi ? 'बुकिंग की पुष्टि करें' : 'Confirm Demo Booking'}
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
