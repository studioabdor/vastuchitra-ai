import React, { useState, ChangeEvent } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ArchitecturalStyleSelector from '../components/ArchitecturalStyleSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GenerateImageResponse {
  imageUrl: string;
  prompt: string;
  style?: string;
  createdAt: any;
}

const GenerateImage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [negativePrompt, setNegativePrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const generateImageFunction = httpsCallable<
    { prompt: string; style?: string; negativePrompt?: string },
    GenerateImageResponse
  >(functions, 'generateImage');

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleNegativePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNegativePrompt(event.target.value);
  };

  const handleStyleSelect = (selectedStyle: string, generatedPrompt: string, negativePromptText: string) => {
    setStyle(selectedStyle);
    if (generatedPrompt) {
      setPrompt(generatedPrompt);
    }
    setNegativePrompt(negativePromptText);
  };

  const handleCustomPromptChange = (customPrompt: string) => {
    setPrompt(customPrompt);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setImageUrl(null);

    try {
      const result = await generateImageFunction({ 
        prompt: prompt.trim(),
        style: style || undefined,
        negativePrompt: negativePrompt.trim() || undefined
      });

      setImageUrl(result.data.imageUrl);
      toast({
        title: "Success",
        description: "Image generated successfully!",
      });
    } catch (err: any) {
      console.error('Generation error:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Architectural Image</CardTitle>
          <CardDescription>
            Create beautiful Indian architectural designs using AI
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="templates">Style Templates</TabsTrigger>
              <TabsTrigger value="basic">Basic Prompt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <ArchitecturalStyleSelector 
                onStyleSelect={handleStyleSelect}
                onCustomPromptChange={handleCustomPromptChange}
                customPrompt={prompt}
              />
            </TabsContent>
            
            <TabsContent value="basic">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Input
                    id="prompt"
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Describe the architectural design you want to generate..."
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="negativePrompt">Negative Prompt (Optional)</Label>
                  <Input
                    id="negativePrompt"
                    value={negativePrompt}
                    onChange={handleNegativePromptChange}
                    placeholder="Describe what you don't want in the image..."
                    disabled={isLoading}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </Button>

          {imageUrl && (
            <div className="mt-6">
              <img
                src={imageUrl}
                alt="Generated architectural design"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateImage;