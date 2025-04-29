
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { auth } from '@/services/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import Footer from './Footer';

type DashboardLayoutProps = {
  children: React.ReactNode;
  activeTab?: 'generate' | 'gallery';
};

const DashboardLayout = ({ children, activeTab = 'generate' }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-cream border-b border-goldAccent/20 py-4 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-terracotta to-indigo flex items-center justify-center">
              <span className="text-white font-playfair font-bold text-lg">V</span>
            </div>
            <h1 className="font-playfair font-bold text-2xl text-indigo">
              <span className="text-terracotta">Vastu</span>Chitra
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="text-charcoal hover:text-terracotta"
              >
                Log Out
              </Button>
              <Link to="/pricing">
                <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white">
                  Upgrade
                </Button>
              </Link>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              <span className="sr-only">Open menu</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-goldAccent/20 pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="text-charcoal hover:text-terracotta justify-start"
              >
                Log Out
              </Button>
              <Link to="/pricing" className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                >
                  Upgrade
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Dashboard Navigation */}
      <div className="bg-cream border-b border-goldAccent/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center md:justify-start space-x-8">
            <Link 
              to="/dashboard" 
              className={`py-4 px-2 border-b-2 transition-colors ${activeTab === 'generate' ? 'border-terracotta text-terracotta' : 'border-transparent hover:text-terracotta'}`}
            >
              Generate
            </Link>
            <Link 
              to="/dashboard/gallery" 
              className={`py-4 px-2 border-b-2 transition-colors ${activeTab === 'gallery' ? 'border-terracotta text-terracotta' : 'border-transparent hover:text-terracotta'}`}
            >
              My Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-cream/30 py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
