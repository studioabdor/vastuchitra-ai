
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Sample generated images for demonstration
const sampleImages = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Modern Minimalist Villa",
    style: "Modern Minimalist",
    createdAt: new Date("2023-04-15").toLocaleDateString()
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Mediterranean Courtyard",
    style: "Mediterranean",
    createdAt: new Date("2023-04-10").toLocaleDateString()
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Kerala Traditional House",
    style: "Kerala Traditional",
    createdAt: new Date("2023-04-08").toLocaleDateString()
  },
  {
    id: "img4",
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Mughal Inspired Structure",
    style: "Mughal Architecture",
    createdAt: new Date("2023-04-05").toLocaleDateString()
  }
];

const Gallery = () => {
  const { toast } = useToast();

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `vastuchitra-${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (imageId: string) => {
    // In a real application, you would delete the image from Firebase
    toast({
      title: "Image Deleted",
      description: "The image has been removed from your gallery",
    });
  };

  return (
    <DashboardLayout activeTab="gallery">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold font-playfair mb-6 text-indigo">My Gallery</h1>
        
        <div className="bg-white p-6 rounded-lg border border-goldAccent/20 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-playfair text-indigo">Saved Images</h2>
            <p className="text-sm text-charcoal/70">4 images (Free tier: 10 images max)</p>
          </div>
          
          {sampleImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleImages.map((image) => (
                <Card key={image.id} className="overflow-hidden border-goldAccent/20 hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-square">
                    <img 
                      src={image.url} 
                      alt={image.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold font-playfair text-lg mb-1 text-indigo">{image.title}</h3>
                    <p className="text-sm text-charcoal/70 mb-3">
                      <span className="font-medium">Style:</span> {image.style}
                    </p>
                    <p className="text-xs text-charcoal/60 mb-4">Created: {image.createdAt}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-indigo text-indigo hover:bg-indigo hover:text-white"
                        onClick={() => handleDownload(image.url, image.title)}
                      >
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                        onClick={() => handleDelete(image.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-charcoal/70 mb-4">Your gallery is empty</p>
              <p className="text-sm text-charcoal/60 mb-6">Generate images and save them to see them here</p>
              <Button 
                className="bg-terracotta hover:bg-terracotta/90"
                onClick={() => window.location.href = '/dashboard'}
              >
                Generate Images
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Gallery;
