
import React from 'react';
import { Card, CardContent } from './ui/card';

const features = [
  {
    title: "Sketch to Render",
    description: "Upload your architectural sketches and transform them into detailed renders with traditional elements.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M8 2H4C2.89543 2 2 2.89543 2 4V8M8 22H4C2.89543 22 2 21.1046 2 20V16M22 8V4C22 2.89543 21.1046 2 20 2H16M22 16V20C22 21.1046 21.1046 22 20 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 7.5L16.5 12L12 16.5L7.5 12L12 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Text to Architecture",
    description: "Describe your architectural vision using traditional Indian elements and watch as our AI brings it to life.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M3 5H21M3 12H21M3 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Traditional Styles",
    description: "Choose from sacred Indian styles like Temple Architecture, Mughal, Kerala, or blend them with contemporary designs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M2 20H22M3 20V9L12 4L21 9V20M7 20V13H17V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Artistic Dashboard",
    description: "Save, organize, and download your generated images in your personalized dashboard inspired by traditional patterns.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M4 5C4 4.44772 4.44772 4 5 4H9.5C9.5 4 10 4 10 4.5C10 5 9.5 5 9.5 5H5V19H19V14.5C19 14.5 19 14 19.5 14C20 14 20 14.5 20 14.5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5Z" fill="currentColor"/>
        <path d="M14 4C14 3.44772 14.4477 3 15 3H20C20.5523 3 21 3.44772 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V6.41421L11.7071 13.7071C11.3166 14.0976 10.6834 14.0976 10.2929 13.7071C9.90237 13.3166 9.90237 12.6834 10.2929 12.2929L17.5858 5H15C14.4477 5 14 4.55228 14 4Z" fill="currentColor"/>
      </svg>
    )
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-cream/30 relative">
      {/* Traditional ornamental patterns */}
      <div className="absolute top-0 left-0 w-full h-4 bg-repeat-x" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='8' viewBox='0 0 40 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H40L32 4L40 8H0L8 4L0 0Z' fill='%23C45240' fill-opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 8px'
      }}></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo/90 relative inline-block">
            Sacred <span className="text-terracotta/80">Design</span> Principles
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-goldAccent/30 to-transparent"></div>
          </h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
            Our AI-powered platform honors traditional Indian architectural principles while offering multiple ways to visualize your concepts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-goldAccent/10 hover:border-goldAccent/20 hover:shadow-sm transition-all duration-300 bg-white/80">
              <div className="absolute top-0 right-0">
                <div className="border-t-[40px] border-t-terracotta/5 border-l-[40px] border-l-transparent"></div>
              </div>
              
              <CardContent className="pt-6 relative z-10">
                <div className="h-16 w-16 rounded-full bg-cream/70 flex items-center justify-center text-indigo/80 mb-6 relative">
                  {feature.icon}
                  <div className="absolute -inset-1 border border-goldAccent/20 rounded-full opacity-30"></div>
                </div>
                
                <h3 className="text-xl font-bold font-playfair mb-3 text-indigo/90">{feature.title}</h3>
                <p className="text-charcoal/60">{feature.description}</p>
                
                {/* Traditional decorative element */}
                <div className="absolute bottom-2 right-2 w-8 h-8 opacity-5">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#D4AF37"/>
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Traditional ornamental patterns */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-repeat-x" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='8' viewBox='0 0 40 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8H40L32 4L40 0H0L8 4L0 8Z' fill='%23C45240' fill-opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 8px'
      }}></div>
    </section>
  );
};

export default FeaturesSection;
