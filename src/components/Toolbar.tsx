
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const ToolbarItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="toolbar-icon">
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-white/90 dark:bg-deep-indigo/90 border border-saffron-gold/20">
          <p className="text-xs font-medium text-deep-taupe dark:text-ivory-white">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="mb-3 text-center">
        <div className="w-4 h-4 mx-auto rounded-full bg-gradient-to-br from-saffron-gold/30 to-sindoor-red/30 mb-1"></div>
        <div className="w-6 h-1 mx-auto bg-saffron-gold/20 rounded-full"></div>
      </div>
      
      <ToolbarItem 
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
        } 
        label="Sketch to Render" 
      />
      
      <ToolbarItem 
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="12" x2="21" y2="3"></line>
            <path d="M16 8V3h5"></path>
            <rect x="3" y="3" width="6" height="6" rx="1"></rect>
            <rect x="3" y="15" width="6" height="6" rx="1"></rect>
            <rect x="15" y="15" width="6" height="6" rx="1"></rect>
          </svg>
        } 
        label="Sketch to 3D" 
      />
      
      <div className="toolbar-separator"></div>
      
      <ToolbarItem 
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        } 
        label="Image to 3D" 
      />
      
      <ToolbarItem 
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 L12 22"></path>
            <path d="M2 12 L22 12"></path>
            <path d="M20 16 a4 4 0 0 1-4 4"></path>
            <path d="M14 8 a4 4 0 0 1-4-4"></path>
            <path d="M8 10 a4 4 0 0 1-4 4"></path>
          </svg>
        } 
        label="Texture Creation" 
      />
      
      <div className="toolbar-separator"></div>
      
      <ToolbarItem 
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3z"></path>
            <path d="M20.2 20.2c2.4-2.4 2.4-6.3 0-8.7-2.4-2.4-6.3-2.4-8.7 0-2.4 2.4-2.4 6.3 0 8.7 2.4 2.4 6.3 2.4 8.7 0z"></path>
            <path d="M3.8 12.5c-2.4 2.4-2.4 6.3 0 8.7 2.4 2.4 6.3 2.4 8.7 0 2.4-2.4 2.4-6.3 0-8.7-2.4-2.4-6.3-2.4-8.7 0z"></path>
            <path d="M20.2 3.8c-2.4-2.4-6.3-2.4-8.7 0-2.4 2.4-2.4 6.3 0 8.7 2.4 2.4 6.3 2.4 8.7 0 2.4-2.4 2.4-6.3 0-8.7z"></path>
          </svg>
        } 
        label="Enhance Image" 
      />
      
      <div className="mt-3 text-center">
        <div className="w-6 h-1 mx-auto bg-saffron-gold/20 rounded-full mb-1"></div>
        <div className="w-4 h-4 mx-auto rounded-full bg-gradient-to-br from-sindoor-red/30 to-saffron-gold/30"></div>
      </div>
    </div>
  );
};

export default Toolbar;
