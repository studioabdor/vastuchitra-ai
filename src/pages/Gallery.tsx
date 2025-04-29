import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gallery: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Image Gallery</CardTitle>
          <CardDescription>
            View and manage your generated architectural designs
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Images</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ImageGallery />
        </TabsContent>
        
        <TabsContent value="recent">
          <ImageGallery />
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="text-center p-8">
            <h3 className="text-lg font-medium">Favorites feature coming soon</h3>
            <p className="text-muted-foreground mt-2">
              You'll be able to mark your favorite designs here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Gallery;
