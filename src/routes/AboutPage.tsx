import { useLocale } from '../hooks/useLocale';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Award, Heart, Activity, Compass } from 'lucide-react';
import { NightWatchStory } from '../components/nightwatch/NightWatchStory';

export default function AboutPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-12">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
          <Compass className="w-3.5 h-3.5" />
          {isHi ? 'हमारे बारे में' : 'About Lanthera Health'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
          {isHi ? 'पारदर्शिता, करुणा व 24×7 उत्कृष्ट चिकित्सा सेवा' : 'Illuminating Care — Our Founding Vision & Values'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-2 max-w-3xl leading-relaxed">
          {isHi
            ? 'लैंथेरा हेल्थ की स्थापना मरीजों और उनके परिवारों को स्वास्थ्य यात्रा के हर चरण में स्पष्टता और विश्वास प्रदान करने के उद्देश्य से की गई है।'
            : 'Lanthera Health was established with a singular mission: to eliminate healthcare anxiety through transparent pricing, clear patient journeys, and relentless 24×7 clinical excellence.'}
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)]">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {isHi ? 'मरीज-प्रथम दृष्टिकोण' : 'Patient-Centric Compassion'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'प्रत्येक मरीज और उनका परिवार सम्मान एवं स्पष्ट मार्गदर्शन का हकदार है।'
              : 'Every clinical protocol is designed around human empathy, minimizing anxiety and family distress.'}
          </p>
        </Card>

        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)]">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {isHi ? 'पारदर्शी वित्त प्रणाली' : 'Transparent Financial Ledger'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'प्रक्रिया से पहले स्पष्ट घटकवार अनुमान — बिना किसी छिपे प्रभार के।'
              : 'Pre-admission itemized procedure cost estimates so patients never face unexpected financial surprises.'}
          </p>
        </Card>

        <Card shape="lantern" className="p-6 flex flex-col gap-3 bg-[var(--surface-2)]">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text)]">
            {isHi ? 'राष्ट्रीय मान्यता व सुरक्षा' : 'NABH & JCI Accredited Standards'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'उच्चतम गुणवत्ता, सख्त संक्रमण नियंत्रण एवं 24×7 विशेषज्ञ डॉक्टर उपलब्धता।'
              : 'Adherence to international infection control, surgical safety, and continuous quality audits.'}
          </p>
        </Card>
      </div>

      {/* Embedded 24x7 Night Watch Story */}
      <div className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase font-semibold">
          <Activity className="w-4 h-4" />
          {isHi ? 'रात के 24 घंटे — द नाइट वॉच कहानी' : 'The Night Watch — 24x7 Hospital Operations'}
        </div>
        <NightWatchStory />
      </div>
    </div>
  );
}
