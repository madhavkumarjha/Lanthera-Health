import { Link } from 'react-router';
import { useLocale } from '../hooks/useLocale';
import { Card } from '../components/ui/Card';
import { Network, ArrowRight } from 'lucide-react';

export default function SitemapPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const routeGroups = [
    {
      category: isHi ? 'मुख्य व आपातकालीन पृष्ठ' : 'Core & Emergency Routes',
      routes: [
        { path: '/', label: 'Home Page (/)' },
        { path: '/emergency', label: 'Emergency Fast Triage (/emergency)' },
        { path: '/guide', label: 'Lantern Care Guide Wizard (/guide)' },
        { path: '/path', label: 'The Path — Journey Roadmap (/path)' },
        { path: '/board', label: 'Waiting Room Live Monitor (/board)' },
        { path: '/families', label: 'Family Care & Status (/families)' },
      ],
    },
    {
      category: isHi ? 'विभाग व चिकित्सा टीम' : 'Departments & Medical Care Team',
      routes: [
        { path: '/departments', label: 'Medical Departments (/departments)' },
        { path: '/doctors', label: 'Doctors & Specialists Directory (/doctors)' },
        { path: '/team', label: 'Circle of Care Team Hierarchy (/team)' },
        { path: '/book', label: 'Appointment Booking Wizard (/book)' },
      ],
    },
    {
      category: isHi ? 'वित्त, जांचें व अंतरराष्ट्रीय' : 'Finance, Diagnostics & International',
      routes: [
        { path: '/ledger', label: 'Clear Financial Ledger (/ledger)' },
        { path: '/packages', label: 'Preventive Health Packages (/packages)' },
        { path: '/diagnostics', label: 'Diagnostic Directory (/diagnostics)' },
        { path: '/international', label: 'International Patient Services (/international)' },
      ],
    },
    {
      category: isHi ? 'मरीज ज्ञान व पोर्टल' : 'Patient Knowledge & Medical Portal',
      routes: [
        { path: '/understand', label: 'Patient Knowledge Library (/understand)' },
        { path: '/portal', label: 'Plain-Language Report Explainer (/portal)' },
        { path: '/careers', label: 'Careers at Lanthera (/careers)' },
        { path: '/about', label: 'About Lanthera Health (/about)' },
        { path: '/contact', label: 'Contact & Helplines (/contact)' },
        { path: '/accessibility', label: 'Accessibility Statement (/accessibility)' },
        { path: '/demo-disclosure', label: 'Demo Disclosure & Disclaimer (/demo-disclosure)' },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <Network className="w-3.5 h-3.5" />
          {isHi ? 'साइटमैप' : 'Visual Semantic Sitemap'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
          {isHi ? 'संपूर्ण साइट नेविगेशन मानचित्र' : 'Complete Architecture & Route Map'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
          {isHi
            ? 'अस्पताल पोर्टल के सभी पृष्ठों और नेविगेशन लिंक की श्रेणीबद्ध सूची।'
            : 'Structured list of all available routes and interactive application modules.'}
        </p>
      </div>

      {/* Sitemap Groups Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {routeGroups.map((group) => (
          <Card key={group.category} className="p-6 flex flex-col gap-4">
            <h2 className="font-display text-lg font-bold text-[var(--accent)] border-b border-[var(--line)] pb-2">
              {group.category}
            </h2>
            <ul className="flex flex-col gap-2">
              {group.routes.map((r) => (
                <li key={r.path}>
                  <Link
                    to={r.path}
                    className="group p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between text-xs text-[var(--text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                  >
                    <span className="font-mono">{r.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
