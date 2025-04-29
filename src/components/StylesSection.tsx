
import React from 'react';
import { Card, CardContent } from './ui/card';

const styles = [
  {
    name: "Mughal Architecture",
    origin: "North Indian",
    description: "Characterized by grand domes, intricate inlay work, and symmetrical designs with garden elements. Incorporates Persian influences with indigenous craftsmanship.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Kerala Traditional",
    origin: "South Indian", 
    description: "Features sloped roofs, wooden architecture, intricate carvings, and inner courtyards that enhance natural cooling. Prioritizes harmony with the tropical climate.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Temple Architecture",
    origin: "Classical Indian",
    description: "Sacred geometry with intricate stone carvings, gopurams, and mandapas following ancient Vastu principles. Embodies spiritual symbolism in every element.",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Rajasthani Haveli",
    origin: "Western Indian",
    description: "Ornate facades with jharokhas, jaalis, and frescoed walls reflecting desert adaptations. Features colorful murals and carved stone balconies.",
    image: "https://images.unsplash.com/photo-1590687755772-3925e3fba0eb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Bengali Terracotta",
    origin: "Eastern Indian",
    description: "Distinctive curved cornices, terracotta relief work on facades, and ornate archways. Showcases detailed mythology narratives on temple exteriors.",
    image: "https://images.unsplash.com/photo-1635321593217-40050ad13c74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Indo-Saracenic",
    origin: "Colonial Fusion",
    description: "Blend of Indian architectural elements with Gothic and Neoclassical influences. Features domes, minarets, and pointed arches with Victorian structural concepts.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Himalayan Vernacular",
    origin: "Northern Indian",
    description: "Wooden post and beam with stone masonry adapted to mountain terrain. Incorporates pitched roofs, carved woodwork, and climate resilience.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Contemporary Vernacular",
    origin: "Modern Indian",
    description: "Sustainable adaptation of traditional principles with modern materials. Balances courtyards, passive cooling, and indigenous spatial concepts with contemporary needs.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const StylesSection = () => {
  return (
    <section className="py-16 md:py-24 relative bg-cream/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 ornamental-border opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="w-20 h-1 bg-gradient-to-r from-terracotta/20 to-goldAccent/20 absolute -top-6 left-1/2 transform -translate-x-1/2"></div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo/90">
              Sacred <span className="text-terracotta/80">Architectural</span> Styles
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-goldAccent/20 to-terracotta/20 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto mt-8">
            Choose from a curated collection of traditional Indian and fusion architectural styles for your visualizations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style, index) => (
            <Card key={index} className="overflow-hidden border-goldAccent/10 hover:shadow-sm transition-all duration-300 group bg-white/80">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-indigo/70 border border-goldAccent/10">
                  {style.origin}
                </div>
                
                {/* Traditional corner ornaments */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="relative pt-6 pb-6">
                <h3 className="text-lg font-bold font-playfair mb-2 text-indigo/90 relative inline-block">
                  {style.name}
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </h3>
                <p className="text-sm text-charcoal/60">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-cream/50 rounded-lg border border-goldAccent/10">
            <p className="text-charcoal/70 italic font-playfair">
              "Architecture is the learned game, correct and magnificent, of forms assembled in the light." — <span className="text-terracotta/80">Le Corbusier</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StylesSection;
