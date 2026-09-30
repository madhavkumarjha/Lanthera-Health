import { NightWatchStory } from '../components/nightwatch/NightWatchStory';
import { useLocale } from '../hooks/useLocale';
import { ShieldCheck, HeartPulse, Award } from 'lucide-react';

export default function AboutPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="min-h-screen py-12 flex flex-col gap-12">
      {/* About Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider font-bold">
            {isHi ? 'हमारे बारे में • द लैंटर्न दर्शन' : 'About Us • The Lantern Philosophy'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--text)]">
            {isHi ? 'अंधेरे में जलती रोशनी — लैंटर्न हेल्थ' : 'The light that stays on when others dim.'}
          </h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">
            {isHi
              ? 'लैंटर्न हेल्थ की स्थापना इस सोच के साथ हुई थी कि अस्पताल को मशीनी नहीं, बल्कि मानवीय और पारदर्शी होना चाहिए। रात 3 बजे भी हमारी पूरी टीम मुस्तैद रहती है।'
              : 'Lanthera Health was founded on a simple principle: hospitals should feel human, transparent, and steady at every hour. No hidden surprises, just clear guidance.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex flex-col gap-3">
            <ShieldCheck className="w-8 h-8 text-[var(--accent)]" />
            <h2 className="font-display text-xl font-bold text-[var(--text)]">
              {isHi ? '24×7 जवाबदेही' : '24×7 Accountability'}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {isHi ? 'रात के किसी भी पहर में डॉक्टर, नर्स व लैब विशेषज्ञ तत्पर रहते हैं।' : 'Attending specialists, emergency nurses, and lab techs present all night.'}
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex flex-col gap-3">
            <HeartPulse className="w-8 h-8 text-[var(--clay)]" />
            <h2 className="font-display text-xl font-bold text-[var(--text)]">
              {isHi ? 'शांत व स्पष्ट मार्गदर्शन' : 'Calm & Plain Words'}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {isHi ? 'कोई जटिल मेडिकल शब्दावली नहीं, हर कदम का स्पष्ट ब्योरा।' : 'Plain-language lab reports, clear cost estimators, and zero jargon.'}
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex flex-col gap-3">
            <Award className="w-8 h-8 text-[var(--sage)]" />
            <h2 className="font-display text-xl font-bold text-[var(--text)]">
              {isHi ? 'मरीज व परिवार प्रथम' : 'Patient & Family First'}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {isHi ? 'परिजनों के लिए लाइव स्टेटस बोर्ड व शांत प्रतीक्षा क्षेत्र।' : 'Real-time family tracking board, quiet waiting rooms, and printable prep sheets.'}
            </p>
          </div>
        </div>
      </section>

      {/* Embedded 24×7 Night Watch Story */}
      <NightWatchStory />
    </div>
  );
}
