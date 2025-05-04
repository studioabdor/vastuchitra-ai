import React, { useState } from "react";
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Download, Eye, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const getBackendUrl = () => {
  return process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
};

const VisualizeSection = () => {
  const [generationMethod, setGenerationMethod] = useState('text');
  const [textPrompt, setTextPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      if (!textPrompt) {
        toast({
          title: "Error",
          description: "Please enter a text description",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }
      if (!selectedStyle) {
        toast({
          title: "Error",
          description: "Please select an architectural style",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }
      const response = await fetch(`${getBackendUrl()}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textPrompt, style: selectedStyle })
      });
      const data = await response.json();
      if (data.images && data.images.length > 0) {
        setGeneratedImage(data.images[0]);
      } else {
        setGeneratedImage(null);
        toast({
          title: "Error",
          description: "No image generated. Try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setGeneratedImage(null);
      toast({
        title: "Error",
        description: "Error generating image: " + error,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      {/* Traditional ornamental border pattern as background */}
      <div className="absolute inset-0 ornamental-border opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-indigo">
              Experience the <span className="text-terracotta">Magic</span> of VastuChitra
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Transform your architectural vision into reality with our AI-powered visualization tool.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <Card className="border-goldAccent/20 hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-indigo text-white p-4 border-b border-goldAccent/30">
                <h3 className="font-playfair text-xl font-bold flex items-center gap-2">
                  <Palette size={20} />
                  Create Your Vision
                </h3>
              </div>
              <CardContent className="p-6">
                <Tabs defaultValue="text" onValueChange={(value) => setGenerationMethod(value)}>
                  <TabsList className="grid grid-cols-2 mb-6 bg-cream">
                    <TabsTrigger value="text" className="data-[state=active]:bg-terracotta data-[state=active]:text-white">
                      Text to Image
                    </TabsTrigger>
                    <TabsTrigger value="sketch" className="data-[state=active]:bg-terracotta data-[state=active]:text-white">
                      Sketch to Render
                    </TabsTrigger>
                  </TabsList>

                  {/* Text to Image Tab */}
                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-text-prompt" className="text-indigo font-medium">
                        Describe your architectural concept
                      </Label>
                      <Textarea
                        id="demo-text-prompt"
                        placeholder="E.g., A modern courtyard house with traditional Indian elements, marble flooring, and a central water feature..."
                        className="min-h-[120px] border-goldAccent/30"
                        value={textPrompt}
                        onChange={(e) => setTextPrompt(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  {/* Sketch to Render Tab */}
                  <TabsContent value="sketch" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-sketch-upload" className="text-indigo font-medium">
                        Upload your architectural sketch
                      </Label>
                      <div className="border-2 border-dashed border-goldAccent/30 rounded-lg p-8 text-center bg-cream/50">
                        <Input
                          id="demo-sketch-upload"
                          type="file"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          onChange={() => {}}
                        />
                        <label
                          htmlFor="demo-sketch-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-indigo/10 flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <p className="text-indigo font-medium">Click to upload</p>
                          <p className="text-sm text-charcoal/60 mt-1">PNG, JPG (MAX. 5MB)</p>
                        </label>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Style Selection - Common to both tabs */}
                  <div className="space-y-2 mt-6">
                    <Label htmlFor="style-select" className="text-indigo font-medium">
                      Select Architectural Style
                    </Label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger id="style-select" className="border-goldAccent/30">
                        <SelectValue placeholder="Choose a style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mughal">Mughal Architecture</SelectItem>
                        <SelectItem value="kerala">Kerala Traditional</SelectItem>
                        <SelectItem value="rajasthani">Rajasthani Haveli</SelectItem>
                        <SelectItem value="temple">Temple Architecture</SelectItem>
                        <SelectItem value="colonial">Colonial</SelectItem>
                        <SelectItem value="modern_indian">Modern Indian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full mt-6 bg-terracotta hover:bg-terracotta/90 relative overflow-hidden group"
                  >
                    <span className={`transition-all duration-300 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
                      Generate Visualization
                    </span>
                    {isGenerating && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-goldAccent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </Button>
                </Tabs>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="text-indigo/80 hover:text-indigo text-sm">
                    Sign up for full access to all architectural styles and features
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="flex flex-col h-full">
              <Card className={`border-goldAccent/20 hover:shadow-md transition-all duration-300 h-full flex flex-col ${!generatedImage ? 'bg-cream/30' : ''}`}>
                <div className="bg-indigo text-white p-4 border-b border-goldAccent/30">
                  <h3 className="font-playfair text-xl font-bold">Generated Visualization</h3>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col items-center justify-center">
                  {!generatedImage ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 mx-auto mb-4 opacity-30">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L13 15.25M10.915 12.823C11.9522 11.5037 13.3973 11.0518 14.6856 11.5526C14.8822 11.6235 15.0726 11.7136 15.2546 11.8229L19.25 14.5M7 3.75H17C18.2426 3.75 19.25 4.75736 19.25 6V18C19.25 19.2426 18.2426 20.25 17 20.25H7C5.75736 20.25 4.75 19.2426 4.75 18V6C4.75 4.75736 5.75736 3.75 7 3.75Z" stroke="#483475" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 8.75C7 8.19772 7.44772 7.75 8 7.75C8.55228 7.75 9 8.19772 9 8.75C9 9.30228 8.55228 9.75 8 9.75C7.44772 9.75 7 9.30228 7 8.75Z" stroke="#483475" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-indigo/70 font-medium text-lg">Visualizations will appear here</p>
                      <p className="text-sm text-charcoal/60 mt-1 max-w-xs mx-auto">
                        Enter your description or upload a sketch and select a style to generate an architectural visualization
                      </p>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="relative aspect-video w-full mb-4 border border-goldAccent/20 rounded-md overflow-hidden">
                        <img
                          src={generatedImage}
                          alt="Generated architectural visualization"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-medium text-indigo">
                          Kerala Traditional
                        </div>
                      </div>

                      <div className="flex justify-center gap-4">
                        <Button
                          variant="outline"
                          className="border-indigo text-indigo hover:bg-indigo hover:text-white flex gap-2 items-center"
                        >
                          <Eye size={18} />
                          View Details
                        </Button>
                        <Button
                          className="bg-terracotta hover:bg-terracotta/90 flex gap-2 items-center"
                        >
                          <Download size={18} />
                          Download
                        </Button>
                      </div>

                      <div className="mt-8">
                        <div className="text-center">
                          <p className="text-sm text-charcoal/70">
                            Sign up to save to your gallery and access more features
                          </p>
                          <Link to="/signup">
                            <Button variant="link" className="text-indigo mt-1">
                              Create Free Account
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute -bottom-8 left-0 w-24 h-24">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
          <path d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z" fill="#D4AF37"/>
        </svg>
      </div>
      <div className="hidden md:block absolute -top-8 right-0 w-16 h-16">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
          <circle cx="50" cy="50" r="45" stroke="#C45240" strokeWidth="10"/>
        </svg>
      </div>
    </section>
  );
};

export default VisualizeSection;
