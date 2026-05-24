/**
 * GLOBAL TYPES FOR NATIVEWIND
 * 
 * Este archivo extiende los tipos de React Native para que
 * TypeScript reconozca la propiedad 'className' en todos los
 * componentes de React Native como View, Text, ScrollView, etc.
 */

import type { ComponentProps } from 'react';
import type {
  View as RNView,
  Text as RNText,
  ScrollView as RNScrollView,
  TextInput as RNTextInput,
  TouchableOpacity as RNTouchableOpacity,
  FlatList as RNFlatList,
  SectionList as RNSectionList,
  Image as RNImage,
  SafeAreaView as RNSafeAreaView,
  Switch as RNSwitch,
  Modal as RNModal,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';

/**
 * Extiende los tipos de los componentes React Native
 * para incluir la propiedad 'className' de NativeWind
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      View: ComponentProps<typeof RNView> & { className?: string };
      Text: ComponentProps<typeof RNText> & { className?: string };
      ScrollView: ComponentProps<typeof RNScrollView> & { className?: string };
      TextInput: ComponentProps<typeof RNTextInput> & { className?: string };
      TouchableOpacity: ComponentProps<typeof RNTouchableOpacity> & { className?: string };
      FlatList: ComponentProps<typeof RNFlatList> & { className?: string };
      SectionList: ComponentProps<typeof RNSectionList> & { className?: string };
      Image: ComponentProps<typeof RNImage> & { className?: string };
      SafeAreaView: ComponentProps<typeof RNSafeAreaView> & { className?: string };
      Switch: ComponentProps<typeof RNSwitch> & { className?: string };
      Modal: ComponentProps<typeof RNModal> & { className?: string };
      ActivityIndicator: ComponentProps<typeof RNActivityIndicator> & { className?: string };
    }
  }
}

export {};
