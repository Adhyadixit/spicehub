import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, X } from 'lucide-react';
import imageService from '@/services/imageService';

interface ImageUploaderProps {
  initialImage?: string;
  onImageUpload: (url: string) => void;
  onImageRemove?: () => void;
  className?: string;
  folder?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImage,
  onImageUpload,
  onImageRemove,
  className = '',
  folder = 'products'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialImage);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB max
      alert('Image must be less than 5MB');
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Create local preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload to Supabase
      console.log('Starting image upload to Supabase...');
      const url = await imageService.upload(file, folder);
      console.log('Image upload result URL:', url);
      
      if (url) {
        console.log('Calling onImageUpload with URL:', url);
        onImageUpload(url);
        console.log('Image URL should now be set in parent component');
      } else {
        console.error('Image upload failed - no URL returned');
        alert('Failed to upload image');
        setPreviewUrl(initialImage);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemove = () => {
    if (previewUrl && onImageRemove) {
      onImageRemove();
      setPreviewUrl(undefined);
    }
  };
  
  return (
    <div className={`relative border-2 border-dashed rounded-lg p-4 ${className}`}>
      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-48 object-contain" 
          />
          <Button 
            variant="destructive" 
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48">
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Click or drag to upload an image</p>
        </div>
      )}
      
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      
      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="bg-white p-4 rounded-lg flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-brand-saffron" />
            <span>Uploading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
