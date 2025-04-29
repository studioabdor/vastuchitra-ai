
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import WorkflowSection from '@/components/WorkflowSection';
import StylesSection from '@/components/StylesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import VisualizeSection from '@/components/VisualizeSection';
import Toolbar from '@/components/Toolbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toolbar />
      <main className="flex-grow ml-0 md:ml-16 transition-all duration-300">
        <HeroSection />
        <VisualizeSection />
        <FeaturesSection />
        <StylesSection />
        <WorkflowSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
