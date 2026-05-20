import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
