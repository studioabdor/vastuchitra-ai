
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const WorkflowSection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo">
            How <span className="text-terracotta">VastuChitra</span> Works
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            A simple three-step process to transform your architectural concepts into stunning visualizations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="h-full rounded-xl bg-white p-8 shadow-sm border border-goldAccent/10">
              <div className="w-12 h-12 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-lg mb-6">
                1
              </div>
              <h3 className="text-xl font-bold font-playfair mb-3 text-indigo">Upload or Describe</h3>
              <p className="text-charcoal/70 mb-4">
                Upload your architectural sketch or describe your vision in text. Choose from our extensive style library.
              </p>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-goldAccent/10 rounded-full -z-10 blur-md"></div>
            </div>
            <div className="hidden md:block absolute -right-5 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-10 h-10 text-2xl text-indigo opacity-50">→</div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative">
            <div className="h-full rounded-xl bg-white p-8 shadow-sm border border-goldAccent/10">
              <div className="w-12 h-12 rounded-full bg-indigo text-white flex items-center justify-center font-bold text-lg mb-6">
                2
              </div>
              <h3 className="text-xl font-bold font-playfair mb-3 text-indigo">AI Generation</h3>
              <p className="text-charcoal/70 mb-4">
                Our AI models process your input and generate a high-quality architectural visualization based on your specifications.
              </p>
              <div className="absolute top-0 left-0 w-20 h-20 bg-turquoise/10 rounded-full -z-10 blur-md"></div>
            </div>
            <div className="hidden md:block absolute -right-5 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-10 h-10 text-2xl text-indigo opacity-50">→</div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative">
            <div className="h-full rounded-xl bg-white p-8 shadow-sm border border-goldAccent/10">
              <div className="w-12 h-12 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-lg mb-6">
                3
              </div>
              <h3 className="text-xl font-bold font-playfair mb-3 text-indigo">Review & Download</h3>
              <p className="text-charcoal/70 mb-4">
                View your generated image, save it to your dashboard, and download it for use in your projects.
              </p>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-goldAccent/10 rounded-full -z-10 blur-md"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/signup">
            <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
              Try It Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
