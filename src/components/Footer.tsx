
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-indigo dark:bg-indigo/80 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-terracotta to-goldAccent flex items-center justify-center">
                <span className="text-white font-playfair font-bold text-lg">V</span>
              </div>
              <h3 className="font-playfair font-bold text-xl text-white">
                <span className="text-terracotta">Vastu</span>Chitra
              </h3>
            </Link>
            <p className="mt-4 text-sm opacity-80">
              Transform your architectural concepts into stunning visuals with AI-powered design generation.
            </p>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="opacity-80 hover:opacity-100 transition-opacity">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-80">Text to Architectural Image</li>
              <li className="opacity-80">Sketch to Render</li>
              <li className="opacity-80">Multiple Style Options</li>
              <li className="opacity-80">Dashboard Storage</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-80">support@vastuchitra.com</li>
              <li className="opacity-80">+91 123-456-7890</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <span className="sr-only">Twitter</span>
                <span className="w-6 h-6">🕊️</span>
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <span className="sr-only">Instagram</span>
                <span className="w-6 h-6">📸</span>
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <span className="sr-only">LinkedIn</span>
                <span className="w-6 h-6">💼</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10 text-sm text-center opacity-60">
          <p>© {new Date().getFullYear()} VastuChitra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
