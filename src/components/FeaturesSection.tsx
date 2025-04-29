
import React from 'react';
import { Card, CardContent } from './ui/card';

const features = [
  {
    title: "Sketch to Render",
    description: "Upload your architectural sketches and transform them into detailed renders in your chosen style.",
    icon: "✏️"
  },
  {
    title: "Text to Architecture",
    description: "Describe your architectural vision in words and watch as our AI brings your ideas to life.",
    icon: "💬"
  },
  {
    title: "Multiple Styles",
    description: "Choose from Indian styles like Mughal, Kerala, or international options like Mediterranean or Modern.",
    icon: "🏛️"
  },
  {
    title: "Personal Dashboard",
    description: "Save, organize, and download your generated images in your private dashboard.",
    icon: "📊"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-cream/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo">
            Transform Your <span className="text-terracotta">Ideas</span> Into Reality
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Our AI-powered platform offers multiple ways to visualize your architectural concepts with stunning detail and cultural richness.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-goldAccent/20 hover:border-goldAccent/40 hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <div className="h-14 w-14 rounded-full bg-cream flex items-center justify-center text-3xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-playfair mb-3 text-indigo">{feature.title}</h3>
                <p className="text-charcoal/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
