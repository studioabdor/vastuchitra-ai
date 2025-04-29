
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-cream py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6 text-indigo">
                About <span className="text-terracotta">VastuChitra</span>
              </h1>
              <p className="text-lg text-charcoal/70">
                Bridging traditional architectural wisdom with cutting-edge AI technology
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-playfair mb-6 text-indigo gradient-border-bottom pb-3">
                  Our Story
                </h2>
                <p className="mb-4 text-charcoal/80">
                  VastuChitra was born from a passion for preserving and celebrating architectural heritage while embracing the future of design technology. Our founder, an architect with deep appreciation for both Indian traditional architecture and modern design principles, noticed the gap between conceptualization and visualization in architectural practice.
                </p>
                <p className="mb-4 text-charcoal/80">
                  In 2023, we assembled a team of architects, AI specialists, and design enthusiasts to create a platform that could transform architectural concepts into stunning visualizations using the power of artificial intelligence, with particular emphasis on Indian architectural styles that are often underrepresented in design tools.
                </p>
                <p className="text-charcoal/80">
                  Today, VastuChitra helps architects, designers, students, and enthusiasts around the world bring their ideas to life with cultural richness and technological precision.
                </p>
              </div>
              <div className="relative">
                <div className="w-full aspect-video bg-white p-3 rounded-lg shadow-lg">
                  <div className="absolute inset-0 border-2 border-goldAccent/30 rounded-lg"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Traditional and modern architecture" 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-turquoise/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-playfair mb-6 text-indigo">
                Our Mission
              </h2>
              <p className="text-xl text-charcoal/80 italic mb-8">
                "To democratize architectural visualization by creating tools that honor cultural heritage while embracing technological innovation."
              </p>
              <div className="flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-goldAccent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-playfair mb-12 text-indigo text-center">
              Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Aditya Sharma",
                  role: "Founder & Lead Architect",
                  bio: "Passionate about blending traditional Indian architectural principles with modern technology."
                },
                {
                  name: "Priya Mehta",
                  role: "AI Research Lead",
                  bio: "Specialist in computer vision and generative models with focus on architectural applications."
                },
                {
                  name: "Raj Patel",
                  role: "Product Design",
                  bio: "Experienced UX designer focused on creating intuitive interfaces for creative professionals."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-goldAccent/10 text-center">
                  <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-playfair text-indigo">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-bold font-playfair text-xl text-indigo mb-2">{member.name}</h3>
                  <p className="text-terracotta font-medium text-sm mb-4">{member.role}</p>
                  <p className="text-charcoal/70 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-indigo text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-playfair mb-6">
                Join Us on This Journey
              </h2>
              <p className="text-white/80 mb-8">
                Experience the fusion of architectural tradition and technological innovation. Start creating with VastuChitra today.
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
