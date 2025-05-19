
import { Database } from '../integrations/supabase/types';

// Re-export types from the generated types file
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserRole = Database['public']['Tables']['user_roles']['Row'];
export type UserRoleEnum = Database['public']['Enums']['user_role'];

// Custom type for auth user with profile
export interface UserWithProfile {
  id: string;
  email: string;
  role: UserRoleEnum;
  profile?: Profile;
}
