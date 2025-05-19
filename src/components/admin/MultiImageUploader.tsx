import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface MultiImageUploaderProps {
  initialImages?: string[];
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
  folder?: string;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  initialImages = [],
  onImagesChange,
  maxImages = 5,
  folder = 'products'
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  
  const handleAddImage = (url: string) => {
    const newImages = [...images, url];
    setImages(newImages);
    onImagesChange(newImages);
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img 
              src={image} 
              alt={`Product ${index + 1}`} 
              className="w-full h-32 object-cover rounded-lg" 
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => handleRemoveImage(index)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <div className="border-2 border-dashed rounded-lg flex items-center justify-center h-32">
            <ImageUploader
              onImageUpload={handleAddImage}
              folder={folder}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
      
      {images.length >= maxImages && (
        <p className="text-sm text-amber-600">
          Maximum of {maxImages} images allowed
        </p>
      )}
    </div>
  );
};

export default MultiImageUploader;
