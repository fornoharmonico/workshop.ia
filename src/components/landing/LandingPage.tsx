import React from 'react';
import { HeroSection } from './HeroSection';
import { ChallengeSection } from './ChallengeSection';
import { HowItWorksSection } from './HowItWorksSection';
import { MethodologySection } from './MethodologySection';
import { TimelineSection } from './TimelineSection';
import { ResultsSection } from './ResultsSection';
import { FacilitatorSection } from './FacilitatorSection';
import { FAQSection } from './FAQSection';
import { ContactSection } from './ContactSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <HeroSection />
      <ChallengeSection />
      <HowItWorksSection />
      <MethodologySection />
      <TimelineSection />
      <ResultsSection />
      <FacilitatorSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};
