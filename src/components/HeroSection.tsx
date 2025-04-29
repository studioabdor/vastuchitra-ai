
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
            <div className="mb-6 inline-block">
              <div className="px-4 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium">
                Traditional Values • Modern Technology
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 text-indigo leading-tight">
              Bringing <span className="text-terracotta relative">
                Sacred Architecture
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C118.957 4.47226 238.043 4.47226 354 9" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </span> to Life
            </h1>
            
            <p className="text-lg mb-8 text-charcoal/80">
              Transform your architectural vision into stunning visualizations with our AI-powered platform. 
              From sacred temple architecture to contemporary designs with traditional elements.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white relative overflow-hidden group">
                  <span>Begin Your Journey</span>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-goldAccent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-indigo text-indigo hover:bg-indigo hover:text-white relative overflow-hidden group">
                  <span>Explore Our Heritage</span>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-goldAccent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Button>
              </Link>
            </div>
            
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative">
                  <p className="font-playfair font-bold text-2xl text-indigo">15+</p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-terracotta/30"></div>
                </div>
                <p className="text-sm mt-2 text-charcoal/70">Traditional Styles</p>
              </div>
              <div className="text-center">
                <div className="relative">
                  <p className="font-playfair font-bold text-2xl text-indigo">100%</p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-terracotta/30"></div>
                </div>
                <p className="text-sm mt-2 text-charcoal/70">Cloud Powered</p>
              </div>
              <div className="text-center">
                <div className="relative">
                  <p className="font-playfair font-bold text-2xl text-indigo">Fast</p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-terracotta/30"></div>
                </div>
                <p className="text-sm mt-2 text-charcoal/70">Visualization</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="w-full aspect-square relative">
              {/* Traditional pattern frame */}
              <div className="absolute inset-0 border-8 border-goldAccent/10 rounded-lg transform rotate-3"></div>
              
              {/* Image container */}
              <div className="absolute inset-2 bg-white p-3 rounded-lg shadow-lg transform rotate-3 transition-all hover:rotate-0 duration-300">
                <div className="absolute inset-0 border-2 border-goldAccent/30 rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Indian architectural design" 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-goldAccent/40 rounded-tl-lg"></div>
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-goldAccent/40 rounded-tr-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-goldAccent/40 rounded-bl-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-goldAccent/40 rounded-br-lg"></div>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-turquoise/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-terracotta/10 rounded-full blur-2xl"></div>
            
            {/* Small decorative elements */}
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-16 h-16">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
                <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="2"/>
                <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2"/>
                <circle cx="50" cy="50" r="20" stroke="#D4AF37" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
