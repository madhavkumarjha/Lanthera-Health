import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Layers,
  Users,
  FileText,
  Activity,
  HeartPulse,
  PhoneCall,
  BookOpen,
  Calendar,
  Building2,
  Award,
  CheckCircle2,
  PackageCheck,
  Globe,
  Quote,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { NightWatchStory } from '../components/nightwatch/NightWatchStory';
import { HeroVisualCard } from '../components/home/HeroVisualCard';
import { useLocale } from '../hooks/useLocale';
import { departments } from '../data/departments';
import { people } from '../data/people';

export default function HomePage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const featureTiles = [
    {
      id: 'guide',
      title: isHi ? 'लैंटर्न गाइड (Lantern Guide)' : 'Lantern Guide',
      subtitle: isHi ? '2 मिनट में आपातकालीन व आगमन निर्णय वृक्ष' : '2-minute emergency & arrival decision tree',
      href: '/guide',
      icon: Compass,
      badge: 'Highest Utility',
    },
    {
      id: 'path',
      title: isHi ? 'द पाथ (The Path)' : 'The Path (Patient Journeys)',
      subtitle: isHi ? 'इमरजेंसी, सर्जरी व आईसीयू के 5 मार्गदर्शक चरण' : '5 step-by-step tracks from arrival to recovery',
      href: '/path',
      icon: MapPin,
      badge: 'Step-by-step',
    },
    {
      id: 'nightwatch',
      title: isHi ? 'द नाइट वॉच (The Night Watch)' : 'The Night Watch (24×7)',
      subtitle: isHi ? 'रात 2 बजे सक्रिय देखभाल इकाइयां व टीम' : '24×7 active care units & lit hospital rooms',
      href: '/about',
      icon: Clock,
      badge: '24×7 Active Care',
    },
    {
      id: 'board',
      title: isHi ? 'वेटिंग रूम लाइव (Waiting Room Live)' : 'Waiting Room Live',
      subtitle: isHi ? 'परिजनों के लिए रियल-टाइम ट्रैकिंग बोर्ड' : 'Real-time tracking board & quiet waiting space',
      href: '/families/board',
      icon: Activity,
      badge: 'Real-time Tracking',
    },
    {
      id: 'ledger',
      title: isHi ? 'क्लियर लेजर (Clear Ledger)' : 'Clear Ledger',
      subtitle: isHi ? 'अनुमानित खर्च व पारदर्शी बिलिंग शब्दावली' : 'Transparent out-of-pocket estimator & billing guide',
      href: '/ledger',
      icon: FileText,
      badge: 'No Surprises',
    },
    {
      id: 'team',
      title: isHi ? 'सर्कल ऑफ केयर (Circle of Care)' : 'Circle of Care',
      subtitle: isHi ? 'बहु-विषय विशेषज्ञ टीम व जवाबदेही' : 'Multidisciplinary care constellation & lead doctors',
      href: '/team',
      icon: Users,
      badge: 'Accountable Team',
    },
    {
      id: 'portal',
      title: isHi ? 'लैंटर्न पोर्टल व लैब रिपोर्ट' : 'Lantern Portal & Diagnostics',
      subtitle: isHi ? 'सरल भाषा में लैब रिपोर्ट व मेडिकल टाइमलाइन' : 'Plain-language lab report viewer & patient portal',
      href: '/portal',
      icon: ShieldCheck,
      badge: 'Plain Language',
    },
    {
      id: 'understand',
      title: isHi ? 'अंडरस्टैंड मेडिकल हब (Understand)' : 'Understand Hub',
      subtitle: isHi ? '3-स्तरीय चिकित्सा ज्ञानकोष (हिंदी व अंग्रेजी)' : '3-layer medical knowledge explainers for patients',
      href: '/understand',
      icon: BookOpen,
      badge: 'Patient Knowledge',
    },
  ];

  const topDoctors = people.slice(0, 4);
  const featuredDepts = departments.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Interactive Glow */}
      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[var(--line)] bg-[var(--bg)]"
      >
        {/* Dynamic Interactive Glow Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-all duration-300 opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(240, 178, 74, 0.18), transparent 70%)`,
          }}
        />

        {/* Paper fold subtle texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#F0B24A_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main Hero Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Emergency Status Pill */}
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-xs font-mono text-[var(--accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--sage)] animate-pulse" />
                <span>{isHi ? '24×7 लैंटर्न सक्रिय • आपातकालीन सेवा चालू' : '24×7 Lantern Active • Emergency Services Ready'}</span>
              </div>

              {/* Main Display XL Headline per File 02 */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-[1.08]">
                {isHi
                  ? 'आप इस परिस्थिति में अकेले नहीं हैं। जानिए आगे क्या होगा।'
                  : 'You are not alone in this. Here is what happens next.'}
              </h1>

              {/* Subheading in Plain Language */}
              <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
                {isHi
                  ? 'लैंथेरा हेल्थ २४x७ आपके और आपके परिवार के साथ है। स्पष्ट मार्गदर्शन, कोई छुपे शुल्क नहीं, और हर मोड़ पर आपका साथ।'
                  : 'Lanthera Health stands with you at every hour. Clear guidance, transparent billing, and steady care when you need it most.'}
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/guide">
                  <Button variant="primary" size="lg" className="shadow-lg shadow-[var(--accent)]/20">
                    <Compass className="w-5 h-5 mr-2" />
                    {isHi ? 'सही रास्ता खोजें (Lantern Guide)' : 'Find the right place to go'}
                  </Button>
                </Link>

                <Link to="/book">
                  <Button variant="secondary" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    {isHi ? 'अपॉइंटमेंट बुक करें' : 'Book Specialist Visit'}
                  </Button>
                </Link>

                <Link to="/emergency" className="sm:hidden w-full">
                  <Button variant="emergency" size="lg" className="w-full">
                    <PhoneCall className="w-5 h-5 mr-2" />
                    {isHi ? 'आपातकालीन सहायता (Emergency)' : 'Emergency 24×7 Call'}
                  </Button>
                </Link>
              </div>

              {/* Live Metric Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--line)] max-w-lg">
                <div>
                  <div className="font-mono text-xl font-bold text-[var(--accent)]">24×7</div>
                  <div className="text-xs text-[var(--text-muted)]">{isHi ? 'सक्रिय नाइट वॉच' : 'Active Night Watch'}</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-[var(--sage)]">&lt; 3 mins</div>
                  <div className="text-xs text-[var(--text-muted)]">{isHi ? 'आगमन ट्राइएज समय' : 'Arrival Triage Time'}</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-[var(--text)]">100%</div>
                  <div className="text-xs text-[var(--text-muted)]">{isHi ? 'पारदर्शी अनुमान' : 'Price Transparency'}</div>
                </div>
              </div>
            </div>

            {/* Hero Cinematic Visual Container */}
            <div className="lg:col-span-5 relative">
              <HeroVisualCard />
            </div>
          </div>
        </div>
      </section>

      {/* Direct Shortcuts Grid */}
      <section className="py-10 bg-[var(--surface-2)] border-b border-[var(--line)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/ledger" className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all flex items-center gap-3">
            <FileText className="w-6 h-6 text-[var(--accent)] shrink-0" />
            <div>
              <div className="font-display font-bold text-sm text-[var(--text)]">{isHi ? 'खर्च कैलकुलेटर' : 'Cost Calculator'}</div>
              <div className="text-[11px] text-[var(--text-muted)]">{isHi ? 'अनुमानित बिल देखें' : 'Pre-procedure ledger'}</div>
            </div>
          </Link>

          <Link to="/packages" className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all flex items-center gap-3">
            <PackageCheck className="w-6 h-6 text-[var(--sage)] shrink-0" />
            <div>
              <div className="font-display font-bold text-sm text-[var(--text)]">{isHi ? 'हेल्थ पैकेज' : 'Health Packages'}</div>
              <div className="text-[11px] text-[var(--text-muted)]">{isHi ? 'होम सैंपल सुविधा' : 'Preventive checkups'}</div>
            </div>
          </Link>

          <Link to="/international" className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all flex items-center gap-3">
            <Globe className="w-6 h-6 text-[var(--accent)] shrink-0" />
            <div>
              <div className="font-display font-bold text-sm text-[var(--text)]">{isHi ? 'अंतरराष्ट्रीय डेस्क' : 'Overseas Desk'}</div>
              <div className="text-[11px] text-[var(--text-muted)]">{isHi ? 'वीजा व यात्रा सहायता' : 'Visa & travel desk'}</div>
            </div>
          </Link>

          <Link to="/portal" className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[var(--sage)] shrink-0" />
            <div>
              <div className="font-display font-bold text-sm text-[var(--text)]">{isHi ? 'लैब रिपोर्ट पोर्टल' : 'Lab Report Portal'}</div>
              <div className="text-[11px] text-[var(--text-muted)]">{isHi ? 'सरल भाषा में व्याख्या' : 'Plain-language notes'}</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Signature Feature Route Tiles Grid */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              {isHi ? 'मुख्य विशेषताएं' : 'Signature Features'}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
              {isHi ? 'जरूरत के हिसाब से मार्गदर्शन चुनें' : 'Guided care designed around your needs'}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            {isHi
              ? 'आपातकालीन सहायता से लेकर इलाज के खर्च और पोर्टल तक, हर सवाल का स्पष्ट जवाब।'
              : 'From 2-minute emergency triage to itemized billing ranges and patient portals.'}
          </p>
        </div>

        {/* 8 Signature Feature Route Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link key={tile.id} to={tile.href} className="group focus:outline-none">
                <Card shape="lantern" glow={true} className="h-full flex flex-col justify-between p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--accent)] group-hover:shadow-[var(--elevation-shadow)]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)]">
                        {tile.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {tile.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--line)]/50 flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
                    <span>{isHi ? 'विवरण देखें' : 'Explore Feature'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Clinical Care Centers Grid */}
      <section className="py-16 bg-[var(--surface-2)] border-t border-b border-[var(--line)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5" />
                {isHi ? 'प्रमुख चिकित्सा विभाग' : 'Specialized Care Centers'}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
                {isHi ? '24×7 विश्वस्तरीय नैदानिक केंद्र' : 'Tertiary Clinical Specialty Departments'}
              </h2>
            </div>
            <Link to="/departments">
              <Button variant="secondary" size="md">
                {isHi ? 'सभी 12 विभाग देखें' : 'View All 12 Care Centers'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredDepts.map((d) => (
              <Card key={d.slug} className="p-6 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-[var(--accent)] uppercase font-semibold">24×7 ACTIVE CENTER</span>
                  <h3 className="font-display text-xl font-bold text-[var(--text)]">
                    {isHi ? d.name.hi : d.name.en}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {isHi ? d.blurb.hi : d.blurb.en}
                  </p>
                </div>
                <Link to={`/departments/${d.slug}`} className="text-xs font-mono text-[var(--accent)] font-semibold hover:underline flex items-center gap-1 self-start">
                  {isHi ? 'विभाग देखें' : 'Explore Department'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" />
              {isHi ? 'विशेषज्ञ चिकित्सक टीम' : 'Leading Specialists & Department Heads'}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
              {isHi ? 'पारदर्शी नेतृत्व व वरिष्ठ चिकित्सक' : 'Experienced Multidisciplinary Physicians'}
            </h2>
          </div>
          <Link to="/doctors">
            <Button variant="secondary" size="md">
              {isHi ? 'सभी डॉक्टर देखें' : 'View Full Specialist Directory'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDoctors.map((doc) => (
            <Card key={doc.id} shape="lantern" className="p-6 flex flex-col items-center text-center gap-4 bg-[var(--surface-2)]">
              <div className="w-20 h-20 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center font-display font-bold text-xl text-[var(--accent)] shadow-md">
                {doc.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[var(--text)]">{doc.name}</h3>
                <div className="text-xs text-[var(--accent)] font-semibold mt-0.5">
                  {isHi ? doc.role.hi : doc.role.en}
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">Reg: {doc.regId}</div>
              </div>
              <Link to={`/doctors/${doc.id}`} className="w-full mt-2">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  {isHi ? 'प्रोफाइल देखें' : 'View Profile'}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Patient Trust & Testimonial Section */}
      <section className="py-16 bg-[var(--surface-2)] border-t border-b border-[var(--line)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-10 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] text-xs font-mono text-[var(--sage)] uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              {isHi ? 'मरीज विश्वास व गुणवत्ता' : 'Patient Experience & Trust'}
            </div>
            <h2 className="font-display text-3xl font-bold text-[var(--text)]">
              {isHi ? 'स्पष्टता और विश्वास की कहानियां' : 'Empathetic Healthcare Built on Clear Trust'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card shape="lantern" className="p-6 flex flex-col gap-4 bg-[var(--surface)]">
              <Quote className="w-8 h-8 text-[var(--accent)]/40" />
              <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
                "{isHi
                  ? 'इमरजेंसी में आने पर हमें Clear Ledger की वजह से पहले ही पता था कि कितना खर्च होगा। कोई छुपा शुल्क नहीं मिला।'
                  : 'During an emergency, the Clear Ledger tool gave us complete transparency on costs upfront. No unexpected final bill surprises.'}"
              </p>
              <div className="flex items-center gap-2 text-xs border-t border-[var(--line)]/50 pt-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--sage)]" />
                <span className="font-semibold text-[var(--text)]">Rajesh & Family (Surgery Patient)</span>
              </div>
            </Card>

            <Card shape="lantern" className="p-6 flex flex-col gap-4 bg-[var(--surface)]">
              <Quote className="w-8 h-8 text-[var(--accent)]/40" />
              <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
                "{isHi
                  ? 'Waiting Room Live की मदद से पूरे परिवार को मरीज के रिकवरी स्टेज की तुरंत अपडेट मिलती रही।'
                  : 'Waiting Room Live kept our family updated throughout the surgery stages without constant anxious inquiries.'}"
              </p>
              <div className="flex items-center gap-2 text-xs border-t border-[var(--line)]/50 pt-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--sage)]" />
                <span className="font-semibold text-[var(--text)]">Anitha K. (Maternity Care)</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Night Watch 24×7 Story Section */}
      <NightWatchStory />

      {/* Emergency Assurance Banner */}
      <section className="bg-[var(--surface)] border-t border-[var(--line)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--emergency)]/15 border border-[var(--emergency)] flex items-center justify-center text-[var(--emergency)] shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--text)]">
                {isHi ? 'क्या तुरंत आपातकालीन चिकित्सा सहायता चाहिए?' : 'Need immediate 24×7 emergency assistance?'}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {isHi
                  ? 'इमरजेंसी टीम 24 घंटे तत्पर है। एक क्लिक में निकटतम सेंटर व हेल्पलाइन प्राप्त करें।'
                  : 'Our emergency team is awake and ready. Instant directions, triage explainer, and direct lines.'}
              </p>
            </div>
          </div>
          <Link to="/emergency">
            <Button variant="emergency" size="lg" className="w-full sm:w-auto">
              <PhoneCall className="w-5 h-5 mr-2" />
              {isHi ? 'इमरजेंसी 24×7 पेज पर जाएं' : 'Open Emergency 24×7 Hub'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
