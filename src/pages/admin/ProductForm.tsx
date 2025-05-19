import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Loader2, ArrowLeft } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import MultiImageUploader from '@/components/admin/MultiImageUploader';

interface Category {
  id: string;
  name: string;
}

interface ProductFormData {
  name: string;
  price: string;
  original_price: string;
  description: string;
  short_description: string;
  image: string;
  category: string;
  stock: string;
  sku: string;
  is_new: boolean;
  is_sale: boolean;
  weight: string;
  tags: string;
}

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    original_price: '',
    description: '',
    short_description: '',
    image: '',
    category: '',
    stock: '',
    sku: '',
    is_new: false,
    is_sale: false,
    weight: '',
    tags: ''
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch categories and product data if in edit mode
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
        
        // If edit mode, fetch product data
        if (isEditMode) {
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
            
          if (productError) throw productError;
          
          if (productData) {
            setFormData({
              name: productData.name || '',
              price: productData.price?.toString() || '',
              original_price: productData.original_price?.toString() || '',
              description: productData.description || '',
              short_description: productData.short_description || '',
              image: productData.image || '',
              category: productData.category || '',
              stock: productData.stock?.toString() || '',
              sku: productData.sku || '',
              is_new: productData.is_new || false,
              is_sale: productData.is_sale || false,
              weight: productData.weight || '',
              tags: productData.tags ? productData.tags.join(', ') : ''
            });
          }
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.image) {
        setError('Name, price, and image are required fields');
        setSaving(false);
        return;
      }

      console.log('Form data before submission:', formData);
      console.log('Image URL:', formData.image);
      
      // Format data for submission
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        description: formData.description,
        short_description: formData.short_description,
        image: formData.image, // This should be the URL from Supabase Storage
        category: formData.category,
        stock: parseInt(formData.stock),
        sku: formData.sku,
        is_new: formData.is_new,
        is_sale: formData.is_sale,
        weight: formData.weight,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      console.log('Product data to be saved:', productData);
      
      let result;
      
      if (isEditMode) {
        // Update existing product
        console.log('Updating product with ID:', id);
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);
      } else {
        // Create new product with a generated ID
        const newId = `p${Date.now().toString().slice(-6)}`;
        console.log('Creating new product with ID:', newId);
        result = await supabase
          .from('products')
          .insert([{ id: newId, ...productData }]);
      }
      
      if (result.error) {
        console.error('Supabase error:', result.error);
        throw result.error;
      }
      
      console.log('Product saved successfully:', result);
      
      // Show success message
      alert('Product saved successfully!');
      
      // Redirect back to products list
      navigate('/admin/products');
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err.message || 'Failed to save product');
      alert(`Error saving product: ${err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-brand-saffron" />
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/products')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="original_price">Original Price (for discounts)</Label>
                <Input
                  id="original_price"
                  name="original_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.original_price}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 100g"
                />
              </div>
            </div>
            
            {/* Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Details</h2>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="short_description">Short Description</Label>
                <Input
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Main Product Image URL *</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                    required
                  />
                </div>
                
                {formData.image && (
                  <div className="mt-2 border rounded p-4">
                    <p className="text-sm font-medium mb-2">Image Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Product preview" 
                      className="w-full max-h-48 object-contain border rounded"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
                
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                  <p className="font-medium text-yellow-800">Image Upload Tips:</p>
                  <ul className="list-disc pl-5 mt-1 text-yellow-700 space-y-1">
                    <li>Use a direct image URL from any source (Unsplash, Imgur, etc.)</li>
                    <li>Make sure the URL ends with an image extension (.jpg, .png, etc.)</li>
                    <li>For testing, try: <button 
                      type="button" 
                      className="text-blue-600 underline"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        image: 'https://images.unsplash.com/photo-1600607686527-6e67f1a19d37'
                      }))}
                    >
                      Use Sample Image
                    </button></li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g. Organic, Premium, No Onion"
                />
              </div>
              
              <div className="flex space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_new" 
                    checked={formData.is_new}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('is_new', checked as boolean)
                    }
                  />
                  <Label htmlFor="is_new">Mark as New</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_sale" 
                    checked={formData.is_sale}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('is_sale', checked as boolean)
                    }
                  />
                  <Label htmlFor="is_sale">On Sale</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
              className="mr-4"
            >
              Cancel
            </Button>
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
                isEditMode ? 'Update Product' : 'Create Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
