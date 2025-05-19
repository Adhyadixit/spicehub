
import React from 'react';
import ProfileForm from './ProfileForm';
import type { Profile } from '@/types/supabase';

interface ProfileTabProps {
  profile: Profile | null;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profile }) => {
  return <ProfileForm profile={profile} />;
};

export default ProfileTab;
