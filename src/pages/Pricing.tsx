
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for trying out the platform",
    features: [
      "10 generations per month",
      "Basic Indian and international styles",
      "Text-to-image generation",
      "Limited dashboard storage (7 days)",
      "Standard resolution downloads"
    ],
    action: "Get Started",
    highlight: false
  },
  {
    name: "Professional",
    price: "₹1,499",
    period: "/month",
    description: "For architects and designers",
    features: [
      "100 generations per month",
      "All architectural styles",
      "Text and sketch-to-image generation",
      "Unlimited dashboard storage",
      "High resolution downloads",
      "Priority rendering"
    ],
    action: "Subscribe",
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For architecture firms and businesses",
    features: [
      "Unlimited generations",
      "Custom style training",
      "API access",
      "Team collaboration features",
      "Dedicated support",
      "White-label option"
    ],
    action: "Contact Us",
    highlight: false
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-cream py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6 text-indigo">
                Simple, Transparent <span className="text-terracotta">Pricing</span>
              </h1>
              <p className="text-lg text-charcoal/70 mb-4">
                Choose the plan that's right for your architectural visualization needs
              </p>
              <div className="flex justify-center items-center gap-2 text-sm">
                <span className="text-charcoal/70">Billed monthly</span>
                <div className="w-10 h-5 bg-indigo/20 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-indigo"></div>
                </div>
                <span className="text-charcoal/70">Billed annually (save 20%)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`border ${plan.highlight ? 'border-goldAccent shadow-lg shadow-goldAccent/5' : 'border-goldAccent/20'} overflow-hidden`}
                >
                  {plan.highlight && (
                    <div className="bg-goldAccent text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className={`${plan.highlight ? 'bg-cream' : ''}`}>
                    <h3 className="text-2xl font-bold font-playfair text-indigo mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-indigo">{plan.price}</span>
                      {plan.period && <span className="text-charcoal/70">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-charcoal/70 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-terracotta font-bold">✓</span>
                          <span className="text-charcoal/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to={plan.name === "Enterprise" ? "/contact" : "/signup"} className="w-full">
                      <Button 
                        className={`w-full ${plan.highlight ? 'bg-terracotta hover:bg-terracotta/90' : 'border-indigo text-indigo hover:bg-indigo hover:text-white'}`}
                        variant={plan.highlight ? "default" : "outline"}
                      >
                        {plan.action}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-playfair mb-8 text-indigo text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "How many images can I generate?",
                    a: "The number of generations depends on your plan. Free users get 10 per month, Professional users get 100, and Enterprise users have unlimited generations."
                  },
                  {
                    q: "What image resolution will I receive?",
                    a: "Free users receive standard resolution images (512x512px). Professional and Enterprise users can download high-resolution images up to 1024x1024px."
                  },
                  {
                    q: "Can I cancel my subscription anytime?",
                    a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period."
                  },
                  {
                    q: "Do you offer refunds?",
                    a: "We offer a 7-day money-back guarantee for first-time Professional subscribers if you're not satisfied with the service."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-goldAccent/10">
                    <h3 className="font-bold text-indigo mb-2">{faq.q}</h3>
                    <p className="text-charcoal/70 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-indigo text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-playfair mb-6">
                Ready to Transform Your Architectural Vision?
              </h2>
              <p className="text-white/80 mb-8">
                Get started today with our free tier or choose a plan that fits your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white w-full sm:w-auto">
                    Sign Up Free
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo w-full sm:w-auto">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
