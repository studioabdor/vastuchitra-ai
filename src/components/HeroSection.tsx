
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-cream/40 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 ornamental-border opacity-5 pointer-events-none"></div>
      
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 text-indigo leading-tight">
              Bring Your <span className="text-terracotta">Architectural</span> Vision to Life
            </h1>
            
            <p className="text-lg mb-8 text-charcoal/80">
              Transform your sketches and ideas into stunning architectural visualizations with 
              our AI-powered platform. Choose from both Indian and international architectural styles.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-indigo text-indigo hover:bg-indigo hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-8">
              <div className="text-center">
                <p className="font-playfair font-bold text-2xl text-indigo">15+</p>
                <p className="text-sm text-charcoal/70">Architectural Styles</p>
              </div>
              <div className="text-center">
                <p className="font-playfair font-bold text-2xl text-indigo">100%</p>
                <p className="text-sm text-charcoal/70">Online Processing</p>
              </div>
              <div className="text-center">
                <p className="font-playfair font-bold text-2xl text-indigo">Fast</p>
                <p className="text-sm text-charcoal/70">Generation</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="w-full aspect-square bg-white p-3 rounded-lg shadow-lg relative rotate-3 transition-all hover:rotate-0 duration-300">
              <div className="absolute inset-0 border-2 border-goldAccent/30 rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Indian architectural design" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-turquoise/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-terracotta/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
