
import React from 'react';

const testimonials = [
  {
    text: "VastuChitra has revolutionized how I present concepts to my clients. The ability to transform rough sketches into polished renders in various traditional Indian styles has been invaluable.",
    author: "Aryan Sharma",
    position: "Principal Architect, Sharma Designs"
  },
  {
    text: "As an architecture student, this tool has helped me visualize my ideas quickly and experiment with different styles. The text-to-image feature is particularly impressive!",
    author: "Priya Patel",
    position: "Architecture Student, NIT"
  },
  {
    text: "The range of architectural styles available is extraordinary. From modern minimalist to ornate Mughal, VastuChitra delivers consistent quality across all styles.",
    author: "Robert Chen",
    position: "Urban Planner, Global Planning Associates"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo">
            What Our <span className="text-terracotta">Users</span> Say
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Trusted by architects, designers, and enthusiasts worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-goldAccent/10">
              <div className="mb-4 text-goldAccent">
                ★★★★★
              </div>
              <blockquote className="mb-6">
                <p className="text-charcoal/80 italic">"{testimonial.text}"</p>
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-indigo font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-indigo">{testimonial.author}</p>
                  <p className="text-xs text-charcoal/60">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
