-- Insert categories
INSERT INTO categories (id, name, slug, description, image, featured) VALUES
('masalas', 'Masala Blends', 'masalas', 'Traditional spice mixes for authentic Indian cooking', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9', true),
('daily-use', 'Daily Use Spices', 'daily-use', 'Essential spices for everyday cooking', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04', true),
('premium', 'Premium Spices', 'premium', 'Rare and exotic spices for special occasions', 'https://images.unsplash.com/photo-1500673922987-e212871fec22', true),
('ayurvedic', 'Ayurvedic Blends', 'ayurvedic', 'Traditional healing spices for health and wellness', 'https://images.unsplash.com/photo-1501854140801-50d01698950b', true);

-- Insert hero images
INSERT INTO hero_images (id, title, subtitle, image_url, link_url, is_active, display_order) VALUES
('hero1', 'Authentic Spice Blends', 'Discover Traditional Flavors', 'https://images.unsplash.com/photo-1621955511447-1c9d2678271a', '/products', true, 1),
('hero2', 'Premium Spice Collection', 'Elevate Your Cooking', 'https://images.unsplash.com/photo-1509440159596-0249088772ff', '/collections/premium', true, 2);

-- Insert sample products
INSERT INTO products (
    id, name, price, original_price, description, short_description, 
    image, category, tags, is_new, is_sale, stock, sku, 
    benefits, ingredients
) VALUES
('p1', 'Garam Masala', 29.99, 34.99, 
 'A classic Indian spice blend that adds warmth and depth to your dishes. Perfect for curries, stews, and grilled meats.', 
 'Traditional Indian spice blend', 
 'https://images.unsplash.com/photo-1625938393927-f0fd9c3d3f38', 
 'masalas', 
 ARRAY['Premium', 'Best Seller'], 
 true, false, 100, 'GM001', 
 ARRAY['Improves digestion', 'Boosts metabolism'], 
 ARRAY['Coriander', 'Cumin', 'Cardamom', 'Black Pepper', 'Cinnamon']),

('p2', 'Turmeric Powder', 19.99, 24.99, 
 'Pure, organic turmeric powder known for its anti-inflammatory properties and vibrant color.', 
 'Pure organic turmeric', 
 'https://images.unsplash.com/photo-1625765224972-4ea57e1b7efc', 
 'daily-use', 
 ARRAY['Healthy', 'Organic'], 
 true, true, 200, 'TP001', 
 ARRAY['Anti-inflammatory', 'Boosts immunity'], 
 ARRAY['100% Pure Turmeric']);

-- Note: You would typically add more products here
