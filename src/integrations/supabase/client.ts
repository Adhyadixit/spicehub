
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vbfqmrhokeuhyqjujduw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZnFtcmhva2V1aHlxanVqZHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzYwOTMsImV4cCI6MjA2MzI1MjA5M30.C0rNGN0jEm28Cp8-Sn123Kv8XpcWTJF1HhoP_KIt0E8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
