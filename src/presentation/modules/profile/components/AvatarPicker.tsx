import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  avatarUrl?: string;
  onPick: (file: { uri: string; mimeType: 'image/jpeg' | 'image/png' }) => void;
};

export const AvatarPicker: React.FC<Props> = ({ avatarUrl, onPick }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      onPick({
        uri: asset.uri,
        mimeType: 'image/jpeg', // Expo devuelve siempre jpeg por defecto
      });
    }
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 16 }}>
      <Image
        source={{ uri: avatarUrl || 'https://via.placeholder.com/150' }}
        style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: '#16a34a' }}
      />
      <TouchableOpacity onPress={pickImage} style={{ marginTop: 8 }}>
        <Text style={{ color: '#16a34a', fontWeight: '600' }}>Cambiar Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};
