import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { demoReports } from '../data/portal';
import { departments } from '../data/departments';
import { people } from '../data/people';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Printer,
  UserCheck,
  Calendar,
  Layers,
  ShieldCheck,
  HelpCircle,
  Check,
  Video,
} from 'lucide-react';

export default function PortalPage() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'report';
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const defaultReport = demoReports[0]!;
  const [selectedReportId, setSelectedReportId] = useState(defaultReport.id);
  const report = demoReports.find((r) => r.id === selectedReportId) ?? defaultReport;

  // Integrated Booking Form State
  const [selectedDeptSlug, setSelectedDeptSlug] = useState(departments[0]!.slug);
  const [selectedDoctorId, setSelectedDoctorId] = useState(people[0]!.id);
  const [mode, setMode] = useState<'in-person' | 'tele'>('in-person');
  const [slot, setSlot] = useState('10:00 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Integrated Ledger Calculator State
  const [procScenario, setProcScenario] = useState('angioplasty');
  const [roomTier, setRoomTier] = useState<'semi' | 'private' | 'deluxe'>('private');

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Tab 1: Report Explainer */}
      {activeTab === 'report' && (
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                {isHi ? 'सरल भाषा लैब रिपोर्ट अनुवादक' : 'Plain-Language Medical Report Explainer'}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
                {isHi ? 'अपनी लैब रिपोर्ट सरल भाषा में समझें' : 'Understand Your Lab & Diagnostic Reports'}
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
                {isHi
                  ? 'जटिल मेडिकल शब्दावली को आम भाषा में समझें।'
                  : 'Translates complex blood markers and lab abbreviations into clear, human-understandable terms.'}
              </p>
            </div>

            <Button variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" />
              {isHi ? 'रिपोर्ट प्रिंट करें' : 'Print Report'}
            </Button>
          </div>

          {/* Select Report */}
          <Card shape="lantern" className="p-6 bg-[var(--surface-2)] flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-[var(--text)]">
              {isHi ? 'डायग्नोस्टिक रिपोर्ट चुनें:' : 'Select Diagnostic Report:'}
              <select
                value={selectedReportId}
                onChange={(e) => setSelectedReportId(e.target.value)}
                className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              >
                {demoReports.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.date}) — {r.dept}
                  </option>
                ))}
              </select>
            </label>
          </Card>

          {/* Report Display */}
          <Card className="p-6 flex flex-col gap-4">
            <div className="flex flex-wrap justify-between items-center border-b border-[var(--line)] pb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <UserCheck className="w-4 h-4" />
                Patient: <strong>{report.patientName}</strong>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Calendar className="w-4 h-4" />
                Date: <strong>{report.date}</strong>
              </div>
              <div className="flex items-center gap-2 text-[var(--sage)]">
                <Layers className="w-4 h-4" />
                Dept: <strong>{report.dept}</strong>
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--accent)]/30 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[var(--accent)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--sage)]" />
                {isHi ? 'मुख्य सारांश (Plain Summary):' : 'Overall Physician Plain-Language Summary:'}
              </span>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                {isHi ? report.plainNotes.hi : report.plainNotes.en}
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <h2 className="font-display text-xl font-bold text-[var(--text)]">
                {isHi ? 'परीक्षण मान एवं सरल विवरण' : 'Itemized Test Values & Plain Explanations'}
              </h2>

              <div className="flex flex-col gap-4">
                {report.values.map((v) => {
                  const isNormal = v.status === 'normal';
                  return (
                    <div
                      key={v.name}
                      className={`p-4 rounded-[var(--radius-sm)] border flex flex-col gap-2 transition-all ${
                        isNormal
                          ? 'bg-[var(--surface-2)] border-[var(--line)]'
                          : 'bg-[var(--surface-2)] border-[var(--accent)]/40 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-bold text-base text-[var(--text)]">{v.name}</h3>
                          <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                            Normal Ref Range: {v.refRange[0]} – {v.refRange[1]} {v.unit}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-display font-bold text-lg text-[var(--text)]">
                            {v.value} {v.unit}
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              isNormal
                                ? 'bg-[var(--sage)]/20 text-[var(--sage)]'
                                : 'bg-[var(--accent)]/20 text-[var(--accent)]'
                            }`}
                          >
                            {isNormal ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                            {v.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--line)]/50 mt-1">
                        <strong className="text-[var(--text)]">What this means: </strong>
                        {isHi ? v.plainExp.hi : v.plainExp.en}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Book Consult (Integrated in Portal) */}
      {activeTab === 'book' && (
        <div className="flex flex-col gap-6">
          <div className="border-b border-[var(--line)] pb-4">
            <h1 className="font-display text-3xl font-bold text-[var(--text)]">
              {isHi ? 'पोर्टल अपॉइंटमेंट बुकिंग' : 'Portal Specialist Consultation Booking'}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Select department, specialist doctor, preferred mode, and time slot.
            </p>
          </div>

          <Card shape="lantern" className="p-6 sm:p-8 bg-[var(--surface-2)]">
            {bookingConfirmed ? (
              <div className="p-8 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-[var(--sage)] animate-bounce" />
                <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs font-mono text-[var(--accent)]">
                  Reference: #LAN-BK-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="text-xs text-[var(--text-muted)] max-w-md">
                  Your consultation with {people.find((p) => p.id === selectedDoctorId)?.name} is reserved for {slot}. A confirmation SMS has been sent to Alex Morgan.
                </p>
                <Button variant="secondary" size="md" onClick={() => setBookingConfirmed(false)}>
                  Book Another Consult
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 text-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                    Select Department
                    <select
                      value={selectedDeptSlug}
                      onChange={(e) => setSelectedDeptSlug(e.target.value)}
                      className="p-3 rounded bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)]"
                    >
                      {departments.map((d) => (
                        <option key={d.slug} value={d.slug}>
                          {d.name.en}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                    Select Specialist Doctor
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="p-3 rounded bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)]"
                    >
                      {people
                        .filter((p) => p.dept === selectedDeptSlug)
                        .map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name} ({doc.role.en})
                          </option>
                        ))}
                    </select>
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[var(--text)] block mb-1">
                      Consultation Mode
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMode('in-person')}
                        className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                          mode === 'in-person'
                            ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                            : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--line)]'
                        }`}
                      >
                        OPD In-Person
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode('tele')}
                        className={`flex-1 py-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                          mode === 'tele'
                            ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                            : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--line)]'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" /> Tele-Consult
                      </button>
                    </div>
                  </div>

                  <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--text)]">
                    Time Slot
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="p-3 rounded bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)]"
                    >
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                  </label>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setBookingConfirmed(true)}
                  className="mt-2 hover-glow"
                >
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Confirm Portal Appointment
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Tab 3: Visit Prep Sheet */}
      {activeTab === 'prep' && (
        <div className="flex flex-col gap-6">
          <div className="border-b border-[var(--line)] pb-4 flex justify-between items-end">
            <div>
              <h1 className="font-display text-3xl font-bold text-[var(--text)]">
                {isHi ? 'परामर्श पूर्व तैयारी शीट' : 'Pre-Consultation Visit Prep Sheet'}
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Print or download your pre-visit checklist to maximize consultation value.
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> Print Prep Sheet
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 flex flex-col gap-4 bg-[var(--surface-2)]">
              <h3 className="font-display font-bold text-lg text-[var(--text)] flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--sage)]" /> What to Bring to OPD
              </h3>
              <ul className="text-xs text-[var(--text-muted)] flex flex-col gap-2.5 list-disc list-inside">
                <li>Government Photo ID card and Health Insurance card</li>
                <li>All previous lab reports, X-rays, and ECG records (last 6 months)</li>
                <li>Current list of prescribed medications and supplements</li>
                <li>List of known drug allergies or food sensitivities</li>
              </ul>
            </Card>

            <Card className="p-6 flex flex-col gap-4 bg-[var(--surface-2)]">
              <h3 className="font-display font-bold text-lg text-[var(--text)] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[var(--accent)]" /> Key Questions to Ask Your Specialist
              </h3>
              <ul className="text-xs text-[var(--text-muted)] flex flex-col gap-2.5 list-disc list-inside">
                <li>What is the primary cause of my current symptoms?</li>
                <li>Are there non-surgical treatment options available?</li>
                <li>What lifestyle modifications or dietary changes should I start today?</li>
                <li>What symptoms require immediate emergency triage?</li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 4: Clear Ledger Costs (Integrated in Portal) */}
      {activeTab === 'ledger' && (
        <div className="flex flex-col gap-6">
          <div className="border-b border-[var(--line)] pb-4">
            <h1 className="font-display text-3xl font-bold text-[var(--text)]">
              {isHi ? 'क्लियर लेजर पारदर्शी खाता बही' : 'Clear Ledger Portal Billing & Estimates'}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Itemized procedure estimates and active patient account statements.
            </p>
          </div>

          <Card shape="lantern" className="p-6 sm:p-8 bg-[var(--surface-2)] flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[var(--sage)] uppercase font-bold">
                  ACTIVE ACCOUNT STATEMENT
                </span>
                <h3 className="font-display font-bold text-xl text-[var(--text)]">
                  Patient: Alex Morgan (#LAN-8910)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--text-muted)] font-mono">Current Outstanding:</span>
                <div className="font-mono text-2xl font-bold text-[var(--sage)]">$0.00 / Fully Cleared</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <label className="flex flex-col gap-1 font-semibold text-[var(--text)]">
                Select Surgical Procedure Scenario
                <select
                  value={procScenario}
                  onChange={(e) => setProcScenario(e.target.value)}
                  className="p-3 rounded bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)]"
                >
                  <option value="angioplasty">Primary Angioplasty & Stent Placement</option>
                  <option value="knee">Robotic Total Knee Replacement</option>
                  <option value="laparoscopic">Laparoscopic Cholecystectomy</option>
                  <option value="maternity">Normal Delivery Package</option>
                </select>
              </label>

              <label className="flex flex-col gap-1 font-semibold text-[var(--text)]">
                Select Room Category Tier
                <select
                  value={roomTier}
                  onChange={(e) => setRoomTier(e.target.value as any)}
                  className="p-3 rounded bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--text)]"
                >
                  <option value="semi">Twin Sharing / Semi-Private</option>
                  <option value="private">Private Single Room</option>
                  <option value="deluxe">Deluxe Suite</option>
                </select>
              </label>
            </div>

            {/* Estimated Itemized Breakdown */}
            <div className="p-4 rounded bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-bold text-[var(--text)] border-b border-[var(--line)]/50 pb-2">
                <span>Pre-Procedure Itemized Estimate</span>
                <span className="text-[var(--accent)] font-mono text-sm">
                  {procScenario === 'angioplasty' ? '$3,200 – $4,500' : '$2,800 – $3,900'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono text-[var(--text-muted)]">
                <div>Surgeon & OT Fee: <strong>Included</strong></div>
                <div>Anesthesia & ICU: <strong>Included</strong></div>
                <div>Post-Op Diagnostics: <strong>Included</strong></div>
                <div>Clear Ledger Guarantee: <strong>100% Verified</strong></div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
