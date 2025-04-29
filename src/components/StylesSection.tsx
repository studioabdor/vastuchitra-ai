
import React from 'react';
import { Card, CardContent } from './ui/card';

const styles = [
  {
    name: "Mughal Architecture",
    origin: "Indian",
    description: "Characterized by grand domes, intricate inlay work, and symmetrical designs with garden elements.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Kerala Traditional",
    origin: "Indian", 
    description: "Features sloped roofs, wooden architecture, intricate carvings, and inner courtyards that enhance natural cooling.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Temple Architecture",
    origin: "Indian",
    description: "Sacred geometry with intricate stone carvings, gopurams, and mandapas following ancient Vastu principles.",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Modern Indian",
    origin: "Fusion",
    description: "Contemporary designs that incorporate traditional elements like jharokhas, jaalis, and courtyards.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const StylesSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 ornamental-border opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="w-20 h-1 bg-gradient-to-r from-terracotta/30 to-goldAccent/30 absolute -top-6 left-1/2 transform -translate-x-1/2"></div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo">
              Sacred <span className="text-terracotta">Architectural</span> Styles
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-goldAccent/30 to-terracotta/30 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto mt-8">
            Choose from a wide range of traditional Indian and fusion architectural styles for your visualizations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style, index) => (
            <Card key={index} className="overflow-hidden border-goldAccent/20 hover:shadow-md transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-indigo border border-goldAccent/20">
                  {style.origin}
                </div>
                
                {/* Traditional corner ornaments */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="relative pt-6 pb-8">
                <h3 className="text-xl font-bold font-playfair mb-2 text-indigo relative inline-block">
                  {style.name}
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </h3>
                <p className="text-sm text-charcoal/70">{style.description}</p>
                
                {/* Traditional decorative element */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="20" stroke="#D4AF37" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="10" stroke="#D4AF37" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="5" fill="#D4AF37"/>
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-cream rounded-lg border border-goldAccent/20">
            <p className="text-charcoal/80 italic font-playfair">
              "Architecture is the reaching out for the truth." — <span className="text-terracotta">Louis Kahn</span>
            </p>
          </div>
          <p className="mt-8 text-charcoal/60">
            And many more styles available in our full library...
          </p>
        </div>
      </div>
    </section>
  );
};

export default StylesSection;
