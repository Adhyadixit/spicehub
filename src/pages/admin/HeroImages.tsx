import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

interface HeroImage {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
  display_order: number;
}

const HeroImages = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroImage | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    image_url: '',
    link_url: '',
    is_active: true,
    display_order: 0
  });
  const [saving, setSaving] = useState(false);

  // Fetch hero images
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_images')
          .select('*')
          .order('display_order');

        if (error) throw error;
        setHeroImages(data || []);
      } catch (err: any) {
        console.error('Error fetching hero images:', err);
        setError(err.message || 'Failed to load hero images');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_active: checked }));
  };

  // Open dialog for new hero image
  const handleNewHero = () => {
    setEditingHero(null);
    // Set next display order
    const nextOrder = heroImages.length > 0 
      ? Math.max(...heroImages.map(h => h.display_order)) + 1 
      : 1;
    
    setFormData({
      id: `hero${Date.now()}`,
      title: '',
      subtitle: '',
      image_url: '',
      link_url: '',
      is_active: true,
      display_order: nextOrder
    });
    setDialogOpen(true);
  };

  // Open dialog for editing hero image
  const handleEditHero = (hero: HeroImage) => {
    setEditingHero(hero);
    setFormData({
      id: hero.id,
      title: hero.title || '',
      subtitle: hero.subtitle || '',
      image_url: hero.image_url || '',
      link_url: hero.link_url || '',
      is_active: hero.is_active || false,
      display_order: hero.display_order || 0
    });
    setDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const heroData = {
        title: formData.title,
        subtitle: formData.subtitle,
        image_url: formData.image_url,
        link_url: formData.link_url,
        is_active: formData.is_active,
        display_order: formData.display_order
      };

      let result;

      if (editingHero) {
        // Update existing hero image
        result = await supabase
          .from('hero_images')
          .update(heroData)
          .eq('id', editingHero.id);
      } else {
        // Create new hero image
        result = await supabase
          .from('hero_images')
          .insert([{ id: formData.id, ...heroData }]);
      }

      if (result.error) throw result.error;

      // Refresh hero images list
      const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setHeroImages(data || []);

      // Close dialog
      setDialogOpen(false);
    } catch (err: any) {
      console.error('Error saving hero image:', err);
      setError(err.message || 'Failed to save hero image');
    } finally {
      setSaving(false);
    }
  };

  // Handle hero image deletion
  const handleDeleteHero = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this hero image?')) return;

    try {
      const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from local state
      setHeroImages(heroImages.filter(hero => hero.id !== id));
    } catch (err: any) {
      console.error('Error deleting hero image:', err);
      alert('Failed to delete hero image: ' + err.message);
    }
  };

  // Move hero image up in order
  const handleMoveUp = async (hero: HeroImage) => {
    const currentIndex = heroImages.findIndex(h => h.id === hero.id);
    if (currentIndex <= 0) return; // Already at the top
    
    const prevHero = heroImages[currentIndex - 1];
    
    try {
      // Swap display orders
      const { error: error1 } = await supabase
        .from('hero_images')
        .update({ display_order: prevHero.display_order })
        .eq('id', hero.id);
        
      const { error: error2 } = await supabase
        .from('hero_images')
        .update({ display_order: hero.display_order })
        .eq('id', prevHero.id);
        
      if (error1 || error2) throw error1 || error2;
      
      // Update local state
      const updatedHeros = [...heroImages];
      updatedHeros[currentIndex] = { ...hero, display_order: prevHero.display_order };
      updatedHeros[currentIndex - 1] = { ...prevHero, display_order: hero.display_order };
      updatedHeros.sort((a, b) => a.display_order - b.display_order);
      setHeroImages(updatedHeros);
    } catch (err: any) {
      console.error('Error moving hero image:', err);
      alert('Failed to reorder: ' + err.message);
    }
  };
  
  // Move hero image down in order
  const handleMoveDown = async (hero: HeroImage) => {
    const currentIndex = heroImages.findIndex(h => h.id === hero.id);
    if (currentIndex >= heroImages.length - 1) return; // Already at the bottom
    
    const nextHero = heroImages[currentIndex + 1];
    
    try {
      // Swap display orders
      const { error: error1 } = await supabase
        .from('hero_images')
        .update({ display_order: nextHero.display_order })
        .eq('id', hero.id);
        
      const { error: error2 } = await supabase
        .from('hero_images')
        .update({ display_order: hero.display_order })
        .eq('id', nextHero.id);
        
      if (error1 || error2) throw error1 || error2;
      
      // Update local state
      const updatedHeros = [...heroImages];
      updatedHeros[currentIndex] = { ...hero, display_order: nextHero.display_order };
      updatedHeros[currentIndex + 1] = { ...nextHero, display_order: hero.display_order };
      updatedHeros.sort((a, b) => a.display_order - b.display_order);
      setHeroImages(updatedHeros);
    } catch (err: any) {
      console.error('Error moving hero image:', err);
      alert('Failed to reorder: ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hero Images</h1>
          <Button 
            className="bg-brand-saffron hover:bg-brand-brown"
            onClick={handleNewHero}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Hero Image
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-brand-saffron" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        ) : heroImages.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-center text-gray-500 py-8">
              No hero images found. Click "Add Hero Image" to create your first slider image.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heroImages.map((hero) => (
                  <TableRow key={hero.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{hero.display_order}</span>
                        <div className="flex flex-col">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleMoveUp(hero)}
                            disabled={heroImages.indexOf(hero) === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleMoveDown(hero)}
                            disabled={heroImages.indexOf(hero) === heroImages.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {hero.image_url ? (
                        <img 
                          src={hero.image_url} 
                          alt={hero.title} 
                          className="w-24 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-24 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{hero.title}</TableCell>
                    <TableCell>{hero.subtitle}</TableCell>
                    <TableCell>
                      <a 
                        href={hero.link_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {hero.link_url ? hero.link_url.split('/').pop() || 'Link' : ''}
                      </a>
                    </TableCell>
                    <TableCell>
                      {hero.is_active ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditHero(hero)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteHero(hero.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Hero Image Form Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingHero ? 'Edit Hero Image' : 'Add New Hero Image'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="link_url">Link URL</Label>
                    <Input
                      id="link_url"
                      name="link_url"
                      value={formData.link_url}
                      onChange={handleChange}
                      placeholder="/collections/featured"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      name="display_order"
                      type="number"
                      min="1"
                      value={formData.display_order}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox 
                      id="is_active" 
                      checked={formData.is_active}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(checked as boolean)
                      }
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image_url">Hero Image URL *</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://example.com/hero-image.jpg"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  {formData.image_url && (
                    <div className="mt-2 border rounded p-4">
                      <p className="text-sm font-medium mb-2">Image Preview:</p>
                      <img 
                        src={formData.image_url} 
                        alt="Hero image preview" 
                        className="w-full max-h-48 object-cover border rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/1920x600?text=Hero+Image+Not+Found';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                    <p className="font-medium text-yellow-800">Hero Image Tips:</p>
                    <ul className="list-disc pl-5 mt-1 text-yellow-700 space-y-1">
                      <li>Recommended size: 1920x600 pixels</li>
                      <li>Use a direct image URL from any source</li>
                      <li>For testing, try: <button 
                        type="button" 
                        className="text-blue-600 underline"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          image_url: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2'
                        }))}
                      >
                        Use Sample Image
                      </button></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button 
                  type="submit"
                  className="bg-brand-saffron hover:bg-brand-brown"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingHero ? 'Update Hero Image' : 'Create Hero Image'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default HeroImages;
