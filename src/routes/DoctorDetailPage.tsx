import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { people } from '../data/people';
import { departments } from '../data/departments';
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
  Award,
  BookOpen,
  Star,
  Building,
  DollarSign,
  HeartPulse,
  UserCheck,
  PhoneCall,
  Video,
  Check,
} from 'lucide-react';

export default function DoctorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const defaultDoctor = people[0]!;
  const doctor = people.find((p) => p.id === slug) ?? defaultDoctor;
  const deptInfo = departments.find((d) => d.slug === doctor.dept);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(doctor.demoSlots[0] || '10:00 AM');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [patientName, setPatientName] = useState('Alex Morgan');
  const [patientPhone, setPatientPhone] = useState('+1 (800) 555-0199');
  const [consultReason, setConsultReason] = useState('General Consultation & Routine Checkup');

  const handleConfirmBooking = () => {
    setBookedSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookedSuccess(false);
    }, 2200);
  };

  const patientReviews = [
    {
      id: 1,
      author: 'Robert Vance',
      rating: 5,
      date: '2 weeks ago',
      comment: isHi
        ? 'डॉक्टर ने बहुत ही शांत और स्पष्ट तरीके से प्रक्रिया समझाई। कोई अनावश्यक परीक्षण नहीं लिखा।'
        : 'Doctor explained the entire diagnosis with immense clarity. Highly empathetic and answered every question.',
      tag: 'Verified OPD Patient',
    },
    {
      id: 2,
      author: 'Anjali Sharma',
      rating: 5,
      date: '1 month ago',
      comment: isHi
        ? 'आपातकालीन रात के समय तुरंत देखभाल मिली। टीम बहुत ही पेशेवर और संवेदनशील है।'
        : 'Received immediate care during the late night watch. Extremely professional and reassuring care team.',
      tag: 'Night Watch ER Patient',
    },
    {
      id: 3,
      author: 'David K.',
      rating: 5,
      date: '2 months ago',
      comment: isHi
        ? 'बहुत बढ़िया अनुभव। शुल्क पहले ही स्पष्ट कर दिए गए थे।'
        : 'Clear billing, no hidden surprises, and top-notch clinical treatment.',
      tag: 'Verified Procedure Patient',
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Back Link */}
      <Link
        to="/doctors"
        className="self-start text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1.5 transition-transform hover:-translate-x-1"
      >
        <ArrowLeft className="w-4 h-4" />
        {isHi ? 'सभी डॉक्टरों की निर्देशिका पर वापस जाएं' : 'Back to Doctors Directory'}
      </Link>

      {/* Main Profile Header Card */}
      <Card shape="lantern" className="p-6 sm:p-10 flex flex-col md:flex-row gap-8 bg-[var(--surface-2)] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <HeartPulse className="w-64 h-64 text-[var(--accent)]" />
        </div>

        {/* Halo Ring Portrait */}
        <div className="relative shrink-0 self-start md:self-center">
          <div className="absolute -inset-3 rounded-full border-2 border-[var(--accent)] opacity-60 blur-[2px] animate-pulse" />
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[var(--surface)] border-3 border-[var(--accent)] flex items-center justify-center font-display font-bold text-4xl sm:text-5xl text-[var(--accent)] relative z-10 shadow-2xl">
            {doctor.name.split(' ').map((n) => n[0]).join('')}
          </div>
        </div>

        {/* Primary Information Header */}
        <div className="flex flex-col gap-4 flex-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-xs font-mono text-[var(--accent)] font-semibold">
              <Award className="w-3.5 h-3.5" /> Reg ID: {doctor.regId}
            </span>
            {deptInfo && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono text-[var(--text-muted)]">
                <Building className="w-3.5 h-3.5 text-[var(--sage)]" />
                {isHi ? deptInfo.name.hi : deptInfo.name.en}
              </span>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
              {doctor.name}
            </h1>
            <div className="text-lg font-semibold text-[var(--accent)] mt-1">
              {isHi ? doctor.role.hi : doctor.role.en}
            </div>
          </div>

          {/* Rating Summary Bar */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-mono text-sm font-bold text-[var(--text)]">4.9 / 5.0</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              ({isHi ? '340+ सत्यापित परामर्श' : '340+ verified patient consults'})
            </span>
          </div>

          <p className="text-base text-[var(--text-muted)] leading-relaxed">
            {isHi ? doctor.bio.hi : doctor.bio.en}
          </p>

          {/* Qualifications & Languages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--line)] text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span className="text-[var(--text-muted)]">Qualifications:</span>
              <strong className="text-[var(--text)]">{doctor.qualifications.join(', ')}</strong>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[var(--sage)] shrink-0" />
              <span className="text-[var(--text-muted)]">Languages:</span>
              <strong className="text-[var(--text)]">{doctor.languages.join(', ')}</strong>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setBookingModalOpen(true)}
              className="hover-glow"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {isHi ? 'अपॉइंटमेंट बुक करें' : `Book OPD Visit`}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setBookingModalOpen(true)}
              className="hover-lift"
            >
              <Video className="w-4 h-4 mr-2" />
              {isHi ? 'वीडियो परामर्श (Tele-consult)' : 'Schedule Tele-Consult'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Grid Layout: Left Column (Clinical Info), Right Column (Timings & Price) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 7 Cols */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Clinical Expertise & Procedures */}
          <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 sm:p-8 flex flex-col gap-5 shadow-md">
            <h2 className="text-2xl font-display font-semibold text-[var(--text)] flex items-center gap-2.5">
              <HeartPulse className="w-6 h-6 text-[var(--accent)]" />
              <span>{isHi ? 'नैदानिक विशेषज्ञता और प्रक्रियाएं' : 'Clinical Expertise & Procedures'}</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {isHi
                ? 'डॉक्टर साक्ष्य-आधारित चिकित्सा प्रोटोकॉल और रोगी-केंद्रित देखभाल के सिद्धांतों का पालन करते हैं:'
                : 'Recognized for advanced clinical outcomes, transparent communication, and patient-first protocols:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Comprehensive Cardiac Assessment',
                'Advanced Triage & Critical Management',
                'Minimal Interventions & Precision Care',
                'Preventative Health Strategy & Screening',
                'Post-Procedure Rehabilitation Guidance',
                'Multidisciplinary Team Consultation',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-xs font-medium text-[var(--text)] hover-lift"
                >
                  <Check className="w-4 h-4 text-[var(--sage)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Academic Honors */}
          <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 sm:p-8 flex flex-col gap-5 shadow-md">
            <h2 className="text-2xl font-display font-semibold text-[var(--text)] flex items-center gap-2.5">
              <Award className="w-6 h-6 text-[var(--accent)]" />
              <span>{isHi ? 'शिक्षा, फेलोशिप और सदस्यताएँ' : 'Education & Academic Accreditations'}</span>
            </h2>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex gap-4 items-start">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-[var(--text)]">Advanced Clinical Residency & Fellowship</h3>
                  <p className="text-xs text-[var(--text-muted)]">Apex Medical Institute of Clinical Research & Specialization</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-3 h-3 rounded-full bg-[var(--sage)] mt-1.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-[var(--text)]">Board Certified Specialist</h3>
                  <p className="text-xs text-[var(--text-muted)]">Medical Council & International Clinical Board Registration</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-3 h-3 rounded-full bg-[var(--text-muted)] mt-1.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-[var(--text)]">Senior Member & Clinical Contributor</h3>
                  <p className="text-xs text-[var(--text-muted)]">International Association of Healthcare & Clinical Triage</p>
                </div>
              </div>
            </div>
          </section>

          {/* Verified Patient Reviews */}
          <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 sm:p-8 flex flex-col gap-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold text-[var(--text)] flex items-center gap-2.5">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <span>{isHi ? 'रोगी अनुभव व समीक्षाएँ' : 'Patient Reviews & Experiences'}</span>
              </h2>
              <span className="text-xs font-mono text-[var(--sage)] font-semibold bg-[var(--sage)]/10 px-3 py-1 rounded-full border border-[var(--sage)]/30">
                100% Verified
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {patientReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[var(--surface-2)] border border-[var(--line)] p-4 rounded-[var(--radius-md)] flex flex-col gap-2 hover-lift"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <strong className="text-[var(--text)]">{rev.author}</strong>
                      <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--line)]">
                        {rev.tag}
                      </span>
                    </div>
                    <span className="text-[var(--text-muted)] font-mono text-[11px]">{rev.date}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: 5 Cols */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* OPD Schedule & Chamber Timings */}
          <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-5 shadow-md">
            <h3 className="text-xl font-display font-semibold text-[var(--text)] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--accent)]" />
              <span>{isHi ? 'ओपीडी परामर्श अनुसूची' : 'OPD Consultation Schedule'}</span>
            </h3>

            <div className="flex flex-col gap-2 text-xs">
              {[
                { day: 'Monday – Wednesday', hours: '09:00 AM – 01:00 PM', room: 'OPD Chamber 104' },
                { day: 'Thursday – Friday', hours: '02:00 PM – 06:00 PM', room: 'OPD Chamber 208' },
                { day: 'Saturday', hours: '10:00 AM – 02:00 PM', room: 'Specialty Wing Gate 2' },
                { day: 'Sunday & Emergency', hours: '24×7 Night Watch', room: 'Emergency Triage Bay' },
              ].map((sch, i) => (
                <div
                  key={i}
                  className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] flex flex-col gap-1 hover-lift"
                >
                  <div className="flex justify-between font-bold text-[var(--text)]">
                    <span>{sch.day}</span>
                    <span className="text-[var(--accent)] font-mono">{sch.hours}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">
                    {sch.room}
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Slots Selector */}
            {doctor.demoSlots.length > 0 && (
              <div className="pt-2 border-t border-[var(--line)] flex flex-col gap-3">
                <span className="text-xs font-mono font-semibold text-[var(--text)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                  {isHi ? 'तत्काल स्लॉट चुनें:' : 'Available Time Slots:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {doctor.demoSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono transition-all ${
                        selectedSlot === slot
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md scale-105'
                          : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              onClick={() => setBookingModalOpen(true)}
              className="w-full mt-2 hover-glow"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {isHi ? 'स्लॉट बुक करें' : `Reserve ${selectedSlot || 'Slot'}`}
            </Button>
          </section>

          {/* Fee & Clear Ledger Transparency Card */}
          <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-4 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-semibold text-[var(--text)] flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[var(--sage)]" />
                <span>{isHi ? 'शुल्क पारदर्शी कार्ड' : 'Clear Ledger Fee Standard'}</span>
              </h3>
              <ShieldCheck className="w-5 h-5 text-[var(--sage)]" />
            </div>

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded bg-[var(--surface-2)] border border-[var(--line)]">
                <span className="text-[var(--text-muted)]">OPD In-Person Consult:</span>
                <strong className="font-mono text-sm text-[var(--accent)]">$80 / ₹1,500</strong>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded bg-[var(--surface-2)] border border-[var(--line)]">
                <span className="text-[var(--text-muted)]">Follow-up (within 14 days):</span>
                <strong className="font-mono text-sm text-[var(--sage)]">FREE / Included</strong>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded bg-[var(--surface-2)] border border-[var(--line)]">
                <span className="text-[var(--text-muted)]">Tele-Consultation:</span>
                <strong className="font-mono text-sm text-[var(--text)]">$60 / ₹1,200</strong>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] italic">
              {isHi
                ? 'कोई छिपे हुए प्रशासनिक शुल्क नहीं। सभी शुल्क हमारी स्पष्ट खाता बही नीति के अनुसार तय हैं।'
                : 'Zero hidden administrative charges. Governed by the Lanthera Clear Ledger Policy.'}
            </p>
          </section>

          {/* Emergency Direct Line */}
          <div className="bg-[var(--surface-2)] border-2 border-[var(--emergency)]/40 rounded-[var(--radius-lg)] p-5 flex flex-col gap-3 text-center items-center shadow-md">
            <PhoneCall className="w-7 h-7 text-[var(--emergency)] animate-bounce" />
            <div>
              <h4 className="font-display font-bold text-base text-[var(--emergency)]">
                {isHi ? '24×7 आपातकालीन हॉटलाइन' : '24×7 Emergency Hotline'}
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Direct access to Night Watch Triage Command
              </p>
            </div>
            <a
              href="tel:+18005268437"
              className="inline-flex items-center gap-2 bg-[var(--emergency)] text-white text-sm font-mono font-bold px-4 py-2 rounded-full hover:opacity-95 transition-opacity"
            >
              +1 (800) 526-8437
            </a>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={isHi ? `अपॉइंटमेंट बुकिंग: ${doctor.name}` : `Book Visit with ${doctor.name}`}
      >
        <div className="flex flex-col gap-4 text-sm">
          {bookedSuccess ? (
            <div className="p-8 text-center flex flex-col items-center gap-4 bg-[var(--surface-2)] rounded-[var(--radius-md)] border border-[var(--sage)]/40">
              <CheckCircle2 className="w-14 h-14 text-[var(--sage)] animate-bounce" />
              <div>
                <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                  {isHi ? 'अपॉइंटमेंट की पुष्टि हो गई!' : 'Appointment Confirmed!'}
                </h3>
                <p className="text-xs font-mono text-[var(--accent)] mt-1">
                  Confirmation Code: #LAN-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              <p className="text-xs text-[var(--text-muted)] max-w-sm">
                Appointment reserved with {doctor.name} on {selectedSlot || '10:00 AM'}. A confirmation message has been sent to your phone.
              </p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-xs font-mono flex items-center justify-between text-[var(--accent)]">
                <span>Doctor: {doctor.name}</span>
                <span className="font-bold">Slot: {selectedSlot || '10:00 AM'}</span>
              </div>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Patient Name
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:border-[var(--accent)] transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Contact Phone / WhatsApp
                <input
                  type="text"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="px-3.5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:border-[var(--accent)] transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                Reason for Visit / Symptoms
                <input
                  type="text"
                  value={consultReason}
                  onChange={(e) => setConsultReason(e.target.value)}
                  className="px-3.5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:border-[var(--accent)] transition-colors"
                />
              </label>

              <div className="p-3 bg-[var(--surface-2)] rounded-[var(--radius-sm)] border border-[var(--line)] text-xs text-[var(--text-muted)] flex justify-between items-center">
                <span>Estimated Fee (Clear Ledger):</span>
                <strong className="font-mono text-sm text-[var(--accent)]">$80 / ₹1,500</strong>
              </div>

              <Button variant="primary" size="lg" onClick={handleConfirmBooking} className="mt-2 hover-glow">
                <ShieldCheck className="w-5 h-5 mr-2" />
                {isHi ? 'अपॉइंटमेंट की पुष्टि करें' : 'Confirm & Book Appointment'}
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

