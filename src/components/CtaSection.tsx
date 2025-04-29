
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-20 bg-indigo text-white relative overflow-hidden">
      <div className="absolute inset-0 ornamental-border opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-6">
            Ready to Transform Your <span className="text-goldAccent">Architectural</span> Vision?
          </h2>
          
          <p className="text-lg opacity-80 mb-8 md:mb-10">
            Join thousands of architects, designers, and enthusiasts who use VastuChitra to bring their ideas to life with AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-terracotta hover:bg-terracotta/90 text-white">
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-indigo">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-terracotta/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-goldAccent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default CtaSection;
