import React from 'react';
import { View, Text } from 'react-native';

type ProfileHeaderProps = {
  profile: {
    fullName: string;
    role: string;
    assignedPlant: string;
    avatarUrl?: string;
  };
  onAvatarSelected: (imageUri: string, mimeType: string) => void;
  avatarLoading: boolean;
  lowDataMode: boolean;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onAvatarSelected,
  avatarLoading,
  lowDataMode,
}) => (
  <View style={{ padding: 16, backgroundColor: '#16a34a' }}>
    <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
      Inspector: {profile.fullName}
    </Text>
    <Text style={{ color: 'white' }}>{profile.role} - {profile.assignedPlant}</Text>
  </View>
);
