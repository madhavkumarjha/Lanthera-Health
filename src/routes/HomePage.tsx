import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Users,
  FileText,
  Activity,
  HeartPulse,
  PhoneCall,
  BookOpen,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { NightWatchStory } from '../components/nightwatch/NightWatchStory';
import { useLocale } from '../hooks/useLocale';

export default function HomePage() {
  const { locale } = useLocale();
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
      title: locale === 'hi' ? 'लैंटर्न गाइड (Lantern Guide)' : 'Lantern Guide',
      subtitle: locale === 'hi' ? '2 मिनट में आपातकालीन व आगमन निर्णय वृक्ष' : '2-minute emergency & arrival decision tree',
      href: '/guide',
      icon: Compass,
      badge: 'Highest Utility',
      accentColor: 'var(--accent)',
    },
    {
      id: 'path',
      title: locale === 'hi' ? 'द पाथ (The Path)' : 'The Path (Patient Journeys)',
      subtitle: locale === 'hi' ? 'इमरजेंसी, सर्जरी व आईसीयू के 5 मार्गदर्शक चरण' : '5 step-by-step tracks from arrival to recovery',
      href: '/path',
      icon: MapPin,
      badge: 'Step-by-step',
      accentColor: 'var(--clay)',
    },
    {
      id: 'nightwatch',
      title: locale === 'hi' ? 'द नाइट वॉच (The Night Watch)' : 'The Night Watch (24×7)',
      subtitle: locale === 'hi' ? 'रात 2 बजे सक्रिय देखभाल इकाइयां व टीम' : '24×7 active care units & lit hospital rooms',
      href: '/about',
      icon: Clock,
      badge: '24×7 Active Care',
      accentColor: 'var(--accent)',
    },
    {
      id: 'board',
      title: locale === 'hi' ? 'वेटिंग रूम लाइव (Waiting Room Live)' : 'Waiting Room Live',
      subtitle: locale === 'hi' ? 'परिजनों के लिए रियल-टाइम ट्रैकिंग बोर्ड' : 'Real-time tracking board & quiet waiting space',
      href: '/families/board',
      icon: Activity,
      badge: 'Real-time Tracking',
      accentColor: 'var(--sage)',
    },
    {
      id: 'ledger',
      title: locale === 'hi' ? 'क्लियर लेजर (Clear Ledger)' : 'Clear Ledger',
      subtitle: locale === 'hi' ? 'अनुमानित खर्च व पारदर्शी बिलिंग शब्दावली' : 'Transparent out-of-pocket estimator & billing guide',
      href: '/ledger',
      icon: FileText,
      badge: 'No Surprises',
      accentColor: 'var(--plum)',
    },
    {
      id: 'team',
      title: locale === 'hi' ? 'सर्कल ऑफ केयर (Circle of Care)' : 'Circle of Care',
      subtitle: locale === 'hi' ? 'बहु-विषय विशेषज्ञ टीम व जवाबदेही' : 'Multidisciplinary care constellation & lead doctors',
      href: '/team',
      icon: Users,
      badge: 'Accountable Team',
      accentColor: 'var(--sage)',
    },
    {
      id: 'portal',
      title: locale === 'hi' ? 'लैंटर्न पोर्टल व लैब रिपोर्ट' : 'Lantern Portal & Diagnostics',
      subtitle: locale === 'hi' ? 'सरल भाषा में लैब रिपोर्ट व मेडिकल टाइमलाइन' : 'Plain-language lab report viewer & patient portal',
      href: '/portal',
      icon: ShieldCheck,
      badge: 'Plain Language',
      accentColor: 'var(--accent)',
    },
    {
      id: 'understand',
      title: locale === 'hi' ? 'अंडरस्टैंड मेडिकल हब (Understand)' : 'Understand Hub',
      subtitle: locale === 'hi' ? '3-स्तरीय चिकित्सा ज्ञानकोष (हिंदी व अंग्रेजी)' : '3-layer medical knowledge explainers for patients',
      href: '/understand',
      icon: BookOpen,
      badge: 'Patient Knowledge',
      accentColor: 'var(--clay)',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Interactive Glow */}
      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--line)] bg-[var(--bg)]"
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
                <span>{locale === 'hi' ? '24×7 लैंटर्न सक्रिय • आपातकालीन सेवा चालू' : '24×7 Lantern Active • Emergency Services Ready'}</span>
              </div>

              {/* Main Display XL Headline per File 02 */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-[1.08]">
                {locale === 'hi'
                  ? 'आप इस परिस्थिति में अकेले नहीं हैं। जानिए आगे क्या होगा।'
                  : 'You are not alone in this. Here is what happens next.'}
              </h1>

              {/* Subheading in Plain Language */}
              <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
                {locale === 'hi'
                  ? 'लैंटर्न हेल्थ २४x७ आपके और आपके परिवार के साथ है। स्पष्ट मार्गदर्शन, कोई छुपे शुल्क नहीं, और हर मोड़ पर आपका साथ।'
                  : 'Lanthera Health stands with you at every hour. Clear guidance, transparent billing, and steady care when you need it most.'}
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/guide">
                  <Button variant="primary" size="lg" className="shadow-lg shadow-[var(--accent)]/20">
                    <Compass className="w-5 h-5 mr-2" />
                    {locale === 'hi' ? 'सही रास्ता खोजें (Lantern Guide)' : 'Find the right place to go'}
                  </Button>
                </Link>

                <Link to="/path">
                  <Button variant="secondary" size="lg">
                    {locale === 'hi' ? 'आगे क्या होगा देखें' : 'See what happens next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Link to="/emergency" className="sm:hidden w-full">
                  <Button variant="emergency" size="lg" className="w-full">
                    <PhoneCall className="w-5 h-5 mr-2" />
                    {locale === 'hi' ? 'आपातकालीन सहायता (Emergency)' : 'Emergency 24×7 Call'}
                  </Button>
                </Link>
              </div>

              {/* Live Metric Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--line)] max-w-lg">
                <div>
                  <div className="font-mono text-xl font-bold text-[var(--accent)]">24×7</div>
                  <div className="text-xs text-[var(--text-muted)]">{locale === 'hi' ? 'सक्रिय नाइट वॉच' : 'Active Night Watch'}</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-[var(--sage)]">&lt; 3 mins</div>
                  <div className="text-xs text-[var(--text-muted)]">{locale === 'hi' ? 'आगमन ट्राइएज समय' : 'Arrival Triage Time'}</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-[var(--text)]">40 / 40</div>
                  <div className="text-xs text-[var(--text-muted)]">{locale === 'hi' ? 'रोशन देखभाल कक्ष' : 'Lit Care Windows'}</div>
                </div>
              </div>
            </div>

            {/* Hero Cinematic Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] bg-[var(--surface-2)] shadow-[var(--elevation-shadow)] group">
                {/* Hero Image */}
                <img
                  src="/img/hero/hero-01.webp"
                  alt={
                    locale === 'hi'
                      ? 'गर्म एम्बर नाइट लाइटों से रोशन शांत अस्पताल का गलियारा।'
                      : 'Quiet hospital corridor lit by warm amber night lights.'
                  }
                  className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to SVG if image loading fails
                    e.currentTarget.src = '/img/hero/hero-01.svg';
                  }}
                />

                {/* Overlaid Lantern Frame Ornament */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-80" />

                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[var(--radius-md)] bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--line)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)] shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-[var(--text)]">
                        {locale === 'hi' ? 'लैंटर्न की रोशनी हमेशा जलती है' : 'The light stays on at Lanthera'}
                      </h2>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {locale === 'hi'
                          ? 'रात के किसी भी पहर में आपको स्पष्ट जानकारी मिलेगी।'
                          : 'Human, warm, and steady care at any hour of the night.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Feature Route Tiles Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'मुख्य विशेषताएं' : 'Signature Features'}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
              {locale === 'hi' ? 'जरूरत के हिसाब से मार्गदर्शन चुनें' : 'Guided care designed around your needs'}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            {locale === 'hi'
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
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)]">
                        {tile.badge}
                      </span>
                    </div>

                    {/* Card Title & Description */}
                    <h3 className="font-display text-xl font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {tile.subtitle}
                    </p>
                  </div>

                  {/* Card Footer Arrow */}
                  <div className="mt-6 pt-4 border-t border-[var(--line)]/50 flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
                    <span>{locale === 'hi' ? 'विवरण देखें' : 'Explore Feature'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
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
                {locale === 'hi' ? 'क्या तुरंत आपातकालीन चिकित्सा सहायता चाहिए?' : 'Need immediate 24×7 emergency assistance?'}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {locale === 'hi'
                  ? 'इमरजेंसी टीम 24 घंटे तत्पर है। एक क्लिक में निकटतम सेंटर व हेल्पलाइन प्राप्त करें।'
                  : 'Our emergency team is awake and ready. Instant directions, triage explainer, and direct lines.'}
              </p>
            </div>
          </div>
          <Link to="/emergency">
            <Button variant="emergency" size="lg" className="w-full sm:w-auto">
              <PhoneCall className="w-5 h-5 mr-2" />
              {locale === 'hi' ? 'इमरजेंसी 24×7 पेज पर जाएं' : 'Open Emergency 24×7 Hub'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
