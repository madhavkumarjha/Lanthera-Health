import { useState, FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router';
import { departments } from '../data/departments';
import { people } from '../data/people';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Calendar,
  CheckCircle2,
  User,
  Clock,
  MapPin,
  Video,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function BookPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';
  const [searchParams] = useSearchParams();

  const defaultDept = departments[0]!;
  const prefilledDeptSlug = searchParams.get('dept') || defaultDept.slug;
  const [selectedDeptSlug, setSelectedDeptSlug] = useState(prefilledDeptSlug);

  const availableDoctors = people.filter((p) => p.dept === selectedDeptSlug || p.kind === 'head');
  const defaultDoctor = availableDoctors[0] ?? people[0]!;
  const [selectedDoctorId, setSelectedDoctorId] = useState(defaultDoctor.id);

  const [mode, setMode] = useState<'in-person' | 'tele'>('in-person');
  const [date, setDate] = useState('2026-10-02');
  const [slot, setSlot] = useState('10:00 AM');
  const [patientName, setPatientName] = useState('Alex Morgan');
  const [phone, setPhone] = useState('+1 (800) 555-0199');
  const [confirmed, setConfirmed] = useState(false);

  const selectedDept = departments.find((d) => d.slug === selectedDeptSlug) ?? defaultDept;
  const selectedDoctor = people.find((p) => p.id === selectedDoctorId) ?? defaultDoctor;

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5" />
          {isHi ? 'अपॉइंटमेंट बुकिंग' : 'Book Appointment'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
          {isHi ? 'चिकित्सक परामर्श अपॉइंटमेंट' : 'Schedule a Specialist Consultation'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          {isHi
            ? 'विभाग व डॉक्टर चुनें, सुविधाजनक समय स्लॉट चुनें।'
            : 'Select department, specialist doctor, preferred consultation mode, and time slot.'}
        </p>
      </div>

      {confirmed ? (
        <Card shape="lantern" className="p-8 text-center flex flex-col items-center gap-4 bg-[var(--surface-2)]">
          <CheckCircle2 className="w-16 h-16 text-[var(--sage)] animate-bounce" />
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            {isHi ? 'अपॉइंटमेंट सफलतापूर्वक बुक हो गया!' : 'Appointment Successfully Scheduled!'}
          </h2>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] text-xs font-mono text-left w-full max-w-md flex flex-col gap-2 border border-[var(--line)]">
            <div><strong>Patient Name:</strong> {patientName}</div>
            <div><strong>Department:</strong> {isHi ? selectedDept.name.hi : selectedDept.name.en}</div>
            <div><strong>Specialist:</strong> {selectedDoctor.name}</div>
            <div><strong>Mode:</strong> {mode === 'tele' ? 'Video Tele-Consultation' : 'OPD In-Person Visit'}</div>
            <div><strong>Date & Time:</strong> {date} at {slot}</div>
            <div><strong>Booking Reference:</strong> LAN-BK-{Math.floor(100000 + Math.random() * 900000)}</div>
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-md">
            {isHi
              ? 'आपकी अपॉइंटमेंट की पुष्टि हो गई है। पुष्टि एसएमएस और व्हाट्सएप संदेश आपके फोन पर भेज दिया गया है।'
              : 'Your specialist appointment is confirmed. Confirmation details have been sent to your registered phone number.'}
          </p>
          <div className="flex gap-4 pt-2">
            <Button variant="ghost" size="md" onClick={() => setConfirmed(false)}>
              {isHi ? 'दूसरा अपॉइंटमेंट बुक करें' : 'Book Another Appointment'}
            </Button>
            <Link to="/portal">
              <Button variant="primary" size="md">
                {isHi ? 'पोर्टल पर जाएं' : 'View in Portal'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleConfirm} className="flex flex-col gap-6">
          <Card shape="lantern" className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Step 1: Department & Doctor */}
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--accent)]" />
                1. Select Department & Specialist
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Department
                  <select
                    value={selectedDeptSlug}
                    onChange={(e) => {
                      setSelectedDeptSlug(e.target.value);
                      const docs = people.filter((p) => p.dept === e.target.value || p.kind === 'head');
                      if (docs[0]) setSelectedDoctorId(docs[0].id);
                    }}
                    className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    {departments.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {isHi ? d.name.hi : d.name.en}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Specialist Doctor
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({isHi ? doc.role.hi : doc.role.en})
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {/* Step 2: Mode, Date & Time */}
            <div className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
              <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--accent)]" />
                2. Consultation Mode, Date & Time Slot
              </h2>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* Mode Selector */}
                <div className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Consultation Mode
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMode('in-person')}
                      className={`flex-1 p-2.5 rounded-[var(--radius-sm)] border text-xs font-medium flex items-center justify-center gap-1 transition-all ${
                        mode === 'in-person'
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold'
                          : 'bg-[var(--surface-2)] border-[var(--line)]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" /> OPD
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('tele')}
                      className={`flex-1 p-2.5 rounded-[var(--radius-sm)] border text-xs font-medium flex items-center justify-center gap-1 transition-all ${
                        mode === 'tele'
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold'
                          : 'bg-[var(--surface-2)] border-[var(--line)]'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" /> Tele
                    </button>
                  </div>
                </div>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Preferred Date
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Time Slot
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Step 3: Patient Info */}
            <div className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
              <h2 className="font-display text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                3. Patient Contact Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Full Name
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                  Mobile Number
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)]"
                  />
                </label>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              {isHi ? 'बुकिंग की पुष्टि करें' : 'Confirm Appointment'}
            </Button>
          </Card>
        </form>
      )}
    </div>
  );
}
