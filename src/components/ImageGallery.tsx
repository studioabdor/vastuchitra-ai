import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Trash2 } from "lucide-react";
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

interface ImageRecord {
  id: string;
  imageUrl: string;
  prompt: string;
  style?: string;
  createdAt: any;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const imagesQuery = query(
          collection(db, 'images'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(imagesQuery);
        const imageData: ImageRecord[] = [];
        
        querySnapshot.forEach((doc) => {
          imageData.push({
            id: doc.id,
            ...doc.data() as Omit<ImageRecord, 'id'>
          });
        });
        
        setImages(imageData);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load your image history');
        toast({
          title: "Error",
          description: "Failed to load your image history",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user, toast]);

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vastuchitra-${prompt.substring(0, 20).replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Success",
        description: "Image downloaded successfully",
      });
    } catch (err) {
      console.error('Error downloading image:', err);
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">No images yet</h3>
        <p className="text-muted-foreground mt-2">
          Your generated images will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img 
              src={image.imageUrl} 
              alt={image.prompt} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => handleDownload(image.imageUrl, image.prompt)}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <p className="font-medium line-clamp-2">{image.prompt}</p>
            {image.style && (
              <p className="text-sm text-muted-foreground mt-1">
                Style: {image.style}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {format(image.createdAt.toDate(), 'MMM d, yyyy h:mm a')}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageGallery; 