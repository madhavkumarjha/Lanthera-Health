import { useState } from 'react';
import { demoReports } from '../data/portal';
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
} from 'lucide-react';

export default function PortalPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const defaultReport = demoReports[0]!;
  const [selectedReportId, setSelectedReportId] = useState(defaultReport.id);

  const report = demoReports.find((r) => r.id === selectedReportId) ?? defaultReport;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            {isHi ? 'सरल भाषा लैब रिपोर्ट अनुवादक (Portal)' : 'Plain-Language Medical Report Explainer'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'बिना मेडिकल जटिलता के अपनी रिपोर्ट समझें' : 'Understand Your Lab & Diagnostic Reports in Plain English'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            {isHi
              ? 'जटिल लैब मानों का आम भाषा में सरल विवरण, संदर्भ दायरा और अगले कदम।'
              : 'Translates complex blood markers and lab abbreviations into clear, human-understandable terms.'}
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          <Printer className="w-4 h-4 mr-2" />
          {isHi ? 'रिपोर्ट प्रिंट करें' : 'Print Plain-Language Report'}
        </Button>
      </div>

      {/* Select Demo Report */}
      <Card shape="lantern" className="p-6 bg-[var(--surface-2)] flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-[var(--text)]">
          {isHi ? 'नमूना रिपोर्ट चुनें:' : 'Select Demo Diagnostic Report:'}
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

      {/* Report Info Banner */}
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

        {/* Doctor's Overall Plain Summary */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--accent)]/30 flex flex-col gap-2">
          <span className="text-xs font-mono font-bold uppercase text-[var(--accent)] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--sage)]" />
            {isHi ? 'मुख्य सारांश (Plain Summary):' : 'Overall Physician Plain-Language Summary:'}
          </span>
          <p className="text-xs text-[var(--text)] leading-relaxed">
            {isHi ? report.plainNotes.hi : report.plainNotes.en}
          </p>
        </div>

        {/* Detailed Translated Markers */}
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
                        {isNormal ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        {v.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Plain Language Explanation Box */}
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
  );
}
