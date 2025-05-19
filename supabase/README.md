# Supabase Database Setup

## Migration Steps

1. Create a new Supabase project
2. Open the SQL Editor
3. Run the migrations in order:
   - `001_create_initial_tables.sql`

4. Seed the database:
   - Run `seed.sql` to add initial data

## Database Tables

- `categories`: Store product categories
- `products`: Store product details
- `reviews`: Customer product reviews
- `addresses`: User shipping/billing addresses
- `orders`: Customer order tracking
- `order_items`: Individual items in an order
- `hero_images`: Homepage banner images

## Important Notes

- Ensure RLS (Row Level Security) is configured appropriately
- Set up authentication and permissions
- Regularly backup your database

## Recommended Next Steps

1. Configure Row Level Security
2. Set up authentication policies
3. Create database functions for complex queries
