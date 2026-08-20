import React from 'react';
import { HeroSection } from './HeroSection';
import { ChallengeSection } from './ChallengeSection';
import { JourneySection } from './JourneySection';
import { MethodologySection } from './MethodologySection';
import { ResultsSection } from './ResultsSection';
import { EthicsAndPrivacySection } from './EthicsAndPrivacySection';
import { FacilitatorSection } from './FacilitatorSection';
import { FAQSection } from './FAQSection';
import { ContactSection } from './ContactSection';

export const LandingPage: React.FC = () => {
  return (
    <main 
      id="main-content" 
      tabIndex={-1} 
      className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 outline-none"
    >
      <HeroSection />
      <ChallengeSection />
      <JourneySection />
      <MethodologySection />
      <ResultsSection />
      <EthicsAndPrivacySection />
      <FacilitatorSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
};
