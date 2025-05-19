import { supabase } from '@/integrations/supabase/client';

// Make sure this matches the bucket name you created in Supabase
const BUCKET_NAME = 'product_images';

// Create bucket if it doesn't exist
const createBucketIfNeeded = async () => {
  try {
    // First list buckets to see if our bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    console.log('Available buckets:', buckets?.map(b => b.name) || []);
    
    // Check if our bucket exists
    if (!buckets || !buckets.some(b => b.name === BUCKET_NAME)) {
      console.log(`Bucket '${BUCKET_NAME}' not found, attempting to create it...`);
      
      // Create the bucket
      const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // Make it publicly accessible
        fileSizeLimit: 5 * 1024 * 1024 // 5MB limit
      });
      
      if (error) {
        console.error('Error creating bucket:', error);
      } else {
        console.log(`Successfully created bucket '${BUCKET_NAME}'`);
      }
    } else {
      console.log(`Bucket '${BUCKET_NAME}' already exists`);
    }
  } catch (err) {
    console.error('Failed to create bucket:', err);
  }
};

// Call this when the app loads
createBucketIfNeeded();

export const imageService = {
  // Upload a single image and return its URL
  upload: async (file: File, folder: string = 'products'): Promise<string | null> => {
    try {
      console.log('Starting upload to bucket:', BUCKET_NAME, 'folder:', folder);
      
      // Create a unique file name to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      console.log('Uploading file:', filePath);
      
      // Check if bucket exists first
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets || !buckets.some(b => b.name === BUCKET_NAME)) {
        console.log(`Bucket '${BUCKET_NAME}' not found, attempting to create it now...`);
        
        // Try to create the bucket
        const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
          public: true,
          fileSizeLimit: 5 * 1024 * 1024 // 5MB limit
        });
        
        if (createError) {
          console.error('Error creating bucket:', createError);
          alert(`Failed to create storage bucket: ${createError.message}`);
          return null;
        }
        
        console.log(`Successfully created bucket '${BUCKET_NAME}' during upload`);
      }
      
      // Upload the file
      const { data, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Use upsert to overwrite if file exists
        });
        
      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw uploadError;
      }
      
      console.log('Upload successful, data:', data);
      
      // Get public URL of the uploaded file
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);
      
      // Make sure we have a valid URL
      if (!urlData || !urlData.publicUrl) {
        console.error('Failed to generate public URL');
        return null;
      }
      
      // Log the URL for debugging
      console.log('Generated public URL:', urlData.publicUrl);
      
      // Ensure the URL is absolute
      let finalUrl = urlData.publicUrl;
      if (!finalUrl.startsWith('http')) {
        // If it's not an absolute URL, construct one using the Supabase project URL
        // Get the Supabase URL from the environment or use a hardcoded one
        const supabaseUrl = "https://vbfqmrhokeuhyqjujduw.supabase.co";
        finalUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;
        console.log('Constructed absolute URL:', finalUrl);
      }
      
      return finalUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  },
  
  // Delete an image by its URL
  delete: async (url: string): Promise<boolean> => {
    try {
      // Extract file path from URL
      const path = url.split(`${BUCKET_NAME}/`)[1];
      if (!path) return false;
      
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([path]);
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  },
  
  // Upload multiple images and return array of URLs
  uploadMultiple: async (files: File[], folder: string = 'products'): Promise<string[]> => {
    const promises = files.map(file => imageService.upload(file, folder));
    const results = await Promise.all(promises);
    return results.filter(url => url !== null) as string[];
  }
};

export default imageService;
