
import React from 'react';
import { Card, CardContent } from './ui/card';

const styles = [
  {
    name: "Mughal Architecture",
    origin: "Indian",
    description: "Characterized by grand domes, minarets, and intricate inlay work.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Kerala Traditional",
    origin: "Indian", 
    description: "Features sloped roofs, wooden architecture, and open courtyards.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Mediterranean",
    origin: "International",
    description: "Characterized by stucco walls, terracotta roofs, and arched doorways.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Modern Minimalist",
    origin: "International",
    description: "Clean lines, open spaces, and a focus on simplicity and functionality.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const StylesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo">
            Architectural <span className="text-terracotta">Styles</span> We Offer
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Choose from a wide range of Indian and international architectural styles for your visualizations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style, index) => (
            <Card key={index} className="overflow-hidden border-goldAccent/20 hover:shadow-md transition-all duration-300">
              <div className="relative h-48">
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-indigo">
                  {style.origin}
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold font-playfair mb-2 text-indigo">{style.name}</h3>
                <p className="text-sm text-charcoal/70">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-charcoal/60 italic">
            And many more styles available in our full library...
          </p>
        </div>
      </div>
    </section>
  );
};

export default StylesSection;
