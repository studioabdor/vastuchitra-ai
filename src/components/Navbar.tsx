
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-cream border-b border-goldAccent/20 py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-terracotta to-indigo flex items-center justify-center">
            <span className="text-white font-playfair font-bold text-lg">V</span>
          </div>
          <h1 className="font-playfair font-bold text-2xl text-indigo">
            <span className="text-terracotta">Vastu</span>Chitra
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-terracotta transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-terracotta transition-colors">
            About
          </Link>
          <Link to="/pricing" className="font-medium hover:text-terracotta transition-colors">
            Pricing
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-terracotta text-white hover:bg-terracotta/90">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-cream absolute z-50 left-0 right-0 px-4 py-5 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium hover:text-terracotta transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="font-medium hover:text-terracotta transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className="font-medium hover:text-terracotta transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-terracotta text-white hover:bg-terracotta/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
