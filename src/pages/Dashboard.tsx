
import React, { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { functions } from '@/services/firebase';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const architecturalStyles = [
  { label: "Mughal Architecture", value: "mughal" },
  { label: "Kerala Traditional", value: "kerala" },
  { label: "Rajasthani Haveli", value: "rajasthani" },
  { label: "Modern Indian", value: "modern_indian" },
  { label: "Buddhist Architecture", value: "buddhist" },
  { label: "Temple Architecture", value: "temple" },
  { label: "Colonial", value: "colonial" },
  { label: "Mediterranean", value: "mediterranean" },
  { label: "Modern Minimalist", value: "minimalist" },
  { label: "Art Deco", value: "art_deco" },
  { label: "Gothic", value: "gothic" },
  { label: "Victorian", value: "victorian" }
];

const Dashboard = () => {
  const [generationMethod, setGenerationMethod] = useState<string>('text');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [replicateId, setReplicateId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textPrompt, setTextPrompt] = useState<string>('indian architecture');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size exceeds 5MB limit",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleGenerate = () => {
    // Validate inputs
    if (generationMethod === 'text' && !textPrompt) {
      toast({
        title: "Error",
        description: "Please enter a text description",
        variant: "destructive",
      });
      return;
    }

    if (generationMethod === 'sketch' && !selectedFile) {
      toast({
        title: "Error",
        description: "Please upload a sketch",
        variant: "destructive",
      });
      return;
    }

    if (!selectedStyle) {
      toast({
        title: "Error",
        description: "Please select an architectural style",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Call the Firebase Function to start image generation
    const generateImage = httpsCallable(functions, 'generateImage');
    generateImage({ prompt: textPrompt, style: selectedStyle })
      .then((result) => {
        const replicate_id = result.data as string;
        setReplicateId(replicate_id);
        toast({
          title: "Generating",
          description: "Image generation started. This might take a few minutes.",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Image generation failed.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  useEffect(() => {
    // Check the status of the Replicate prediction
  }, [replicateId]);
  const handleDownloadImage = () => {
    if (generatedImage) {
    }
  };

  const handleSaveImage = () => {
  };

  return (
    <DashboardLayout activeTab="generate">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-playfair mb-6 text-indigo">Generate Images</h1>
        
        <Card className="mb-8 border-goldAccent/20">
          <CardContent className="p-6">
            <Tabs defaultValue="text" onValueChange={(value) => setGenerationMethod(value)}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="text">Text to Image</TabsTrigger>
                <TabsTrigger value="sketch">Sketch to Image</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="text-prompt">Describe your architectural concept</Label>
                  <Textarea
                    id="text-prompt"
                    placeholder="E.g., A modern minimalist house with large windows and a flat roof, surrounded by trees..."
                    className="min-h-[120px]"
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="sketch" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sketch-upload">Upload your architectural sketch (MAX: 5MB)</Label>
                  <Input
                    id="sketch-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <div className="mt-4">
                      <p className="text-sm text-charcoal/70">Selected file: {selectedFile.name}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <div className="space-y-2 mt-6">
                <Label htmlFor="style-select">Select Architectural Style</Label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger id="style-select" className="w-full">
                    <SelectValue placeholder="Choose a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="max-h-[300px] overflow-auto">
                      {architecturalStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-6 bg-terracotta hover:bg-terracotta/90"
              >
                {isGenerating ? "Generating..." : "Generate Image"}
              </Button>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Generated Image Section */}
        {replicateId && (
          <div className="bg-white p-6 rounded-lg border border-goldAccent/20 shadow-sm">
            <h2 className="text-xl font-bold font-playfair mb-4 text-indigo">Generated Image</h2>
            
            <div className="mb-6">
              <img 
                src={generatedImage} 
                alt="Generated architectural visualization" 
                className="w-full h-auto object-cover rounded-lg border border-goldAccent/20"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleSaveImage}
                variant="outline" 
                className="border-indigo text-indigo hover:bg-indigo hover:text-white"
              >
                Save to Gallery
              </Button>
              
              <Button 
                onClick={handleDownloadImage}
                className="bg-terracotta hover:bg-terracotta/90"
              >
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
