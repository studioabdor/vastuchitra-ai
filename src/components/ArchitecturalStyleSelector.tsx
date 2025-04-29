import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

interface ArchitecturalStyle {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
  negativePrompt: string;
  examples: string[];
}

const ARCHITECTURAL_STYLES: ArchitecturalStyle[] = [
  {
    id: 'modern-indian',
    name: 'Modern Indian',
    description: 'Contemporary Indian architecture with clean lines, sustainable materials, and traditional elements reimagined.',
    promptTemplate: 'A modern Indian {buildingType} with {features}, featuring {materials}, {style}',
    negativePrompt: 'ugly, blurry, distorted, unrealistic, cartoon, anime, low quality, poor lighting',
    examples: [
      'Modern Indian house with courtyard, featuring exposed brick and concrete',
      'Contemporary Indian office building with traditional jali screens',
      'Modern Indian villa with sustainable materials and traditional motifs'
    ]
  },
  {
    id: 'traditional-indian',
    name: 'Traditional Indian',
    description: 'Classic Indian architectural styles from various regions, preserving historical design elements.',
    promptTemplate: 'A traditional Indian {buildingType} in {region} style, featuring {features}, made of {materials}',
    negativePrompt: 'modern, contemporary, glass, steel, ugly, blurry, distorted, unrealistic, cartoon, anime, low quality',
    examples: [
      'Traditional Indian haveli with ornate carvings and courtyards',
      'Kerala traditional house with sloping roof and wooden elements',
      'Rajasthani fort with intricate jali work and domes'
    ]
  },
  {
    id: 'indo-colonial',
    name: 'Indo-Colonial',
    description: 'Fusion of Indian and colonial architectural elements, creating a unique hybrid style.',
    promptTemplate: 'An Indo-Colonial {buildingType} with {features}, featuring {colonialElements} and {indianElements}',
    negativePrompt: 'ugly, blurry, distorted, unrealistic, cartoon, anime, low quality, poor lighting',
    examples: [
      'Indo-Colonial bungalow with verandah and traditional Indian elements',
      'Colonial-style Indian government building with Indian architectural details',
      'Indo-Colonial mansion with European columns and Indian decorative elements'
    ]
  },
  {
    id: 'contemporary-indian',
    name: 'Contemporary Indian',
    description: 'Modern interpretations of Indian architecture with innovative materials and sustainable design.',
    promptTemplate: 'A contemporary Indian {buildingType} with {features}, using {materials}, incorporating {elements}',
    negativePrompt: 'ugly, blurry, distorted, unrealistic, cartoon, anime, low quality, poor lighting',
    examples: [
      'Contemporary Indian residence with traditional courtyard and modern materials',
      'Modern Indian cultural center with traditional elements',
      'Contemporary Indian office complex with sustainable features'
    ]
  },
  {
    id: 'vernacular-indian',
    name: 'Vernacular Indian',
    description: 'Region-specific traditional architecture using local materials and construction techniques.',
    promptTemplate: 'A vernacular Indian {buildingType} from {region}, built with {materials}, featuring {features}',
    negativePrompt: 'modern, contemporary, glass, steel, ugly, blurry, distorted, unrealistic, cartoon, anime, low quality',
    examples: [
      'Vernacular Indian house from Kerala with sloping roof and wooden elements',
      'Traditional Indian village house from Rajasthan with mud walls and thatched roof',
      'Vernacular Indian temple from Tamil Nadu with stone carvings and gopuram'
    ]
  }
];

interface ArchitecturalStyleSelectorProps {
  onStyleSelect: (style: string, prompt: string, negativePrompt: string) => void;
  onCustomPromptChange: (prompt: string) => void;
  customPrompt: string;
}

const ArchitecturalStyleSelector: React.FC<ArchitecturalStyleSelectorProps> = ({
  onStyleSelect,
  onCustomPromptChange,
  customPrompt
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [buildingType, setBuildingType] = useState<string>('house');
  const [features, setFeatures] = useState<string>('');
  const [materials, setMaterials] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [colonialElements, setColonialElements] = useState<string>('');
  const [indianElements, setIndianElements] = useState<string>('');
  const [elements, setElements] = useState<string>('');

  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId);
    const style = ARCHITECTURAL_STYLES.find(s => s.id === styleId);
    if (style) {
      onStyleSelect(styleId, '', style.negativePrompt);
    }
  };

  const generatePrompt = () => {
    const style = ARCHITECTURAL_STYLES.find(s => s.id === selectedStyle);
    if (!style) return;

    let prompt = style.promptTemplate;
    
    // Replace placeholders with user inputs
    prompt = prompt.replace('{buildingType}', buildingType);
    prompt = prompt.replace('{features}', features || 'traditional elements');
    prompt = prompt.replace('{materials}', materials || 'local materials');
    prompt = prompt.replace('{style}', 'contemporary design');
    prompt = prompt.replace('{region}', region || 'Rajasthani');
    prompt = prompt.replace('{colonialElements}', colonialElements || 'classical columns and arches');
    prompt = prompt.replace('{indianElements}', indianElements || 'traditional carvings and motifs');
    prompt = prompt.replace('{elements}', elements || 'traditional architectural elements');

    onStyleSelect(selectedStyle, prompt, style.negativePrompt);
  };

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCustomPromptChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="style">Select Architectural Style</Label>
        <Select value={selectedStyle} onValueChange={handleStyleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a style" />
          </SelectTrigger>
          <SelectContent>
            {ARCHITECTURAL_STYLES.map((style) => (
              <SelectItem key={style.id} value={style.id}>
                {style.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedStyle && (
        <>
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm">{ARCHITECTURAL_STYLES.find(s => s.id === selectedStyle)?.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="buildingType">Building Type</Label>
            <Input
              id="buildingType"
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              placeholder="house, temple, palace, etc."
            />
          </div>

          {selectedStyle === 'modern-indian' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Input
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="courtyard, open spaces, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materials">Materials</Label>
                <Input
                  id="materials"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="exposed brick, concrete, wood, etc."
                />
              </div>
            </>
          )}

          {selectedStyle === 'traditional-indian' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Rajasthani, Kerala, Tamil, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Input
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="carvings, courtyards, domes, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materials">Materials</Label>
                <Input
                  id="materials"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="stone, wood, mud, etc."
                />
              </div>
            </>
          )}

          {selectedStyle === 'indo-colonial' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="colonialElements">Colonial Elements</Label>
                <Input
                  id="colonialElements"
                  value={colonialElements}
                  onChange={(e) => setColonialElements(e.target.value)}
                  placeholder="columns, arches, verandahs, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="indianElements">Indian Elements</Label>
                <Input
                  id="indianElements"
                  value={indianElements}
                  onChange={(e) => setIndianElements(e.target.value)}
                  placeholder="carvings, jali work, domes, etc."
                />
              </div>
            </>
          )}

          {selectedStyle === 'contemporary-indian' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Input
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="sustainable design, open spaces, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materials">Materials</Label>
                <Input
                  id="materials"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="recycled materials, solar panels, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="elements">Traditional Elements</Label>
                <Input
                  id="elements"
                  value={elements}
                  onChange={(e) => setElements(e.target.value)}
                  placeholder="traditional motifs, courtyards, etc."
                />
              </div>
            </>
          )}

          {selectedStyle === 'vernacular-indian' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Kerala, Rajasthan, Tamil Nadu, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materials">Materials</Label>
                <Input
                  id="materials"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="mud, thatch, wood, stone, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Input
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="sloping roof, courtyards, etc."
                />
              </div>
            </>
          )}

          <Button onClick={generatePrompt} className="w-full">
            Generate Prompt
          </Button>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Example Prompts:</h4>
            <ScrollArea className="h-24 rounded-md border p-2">
              {ARCHITECTURAL_STYLES.find(s => s.id === selectedStyle)?.examples.map((example, index) => (
                <div key={index} className="text-sm p-1 hover:bg-muted cursor-pointer" onClick={() => onStyleSelect(selectedStyle, example, ARCHITECTURAL_STYLES.find(s => s.id === selectedStyle)?.negativePrompt || '')}>
                  {example}
                </div>
              ))}
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
};

export default ArchitecturalStyleSelector; 