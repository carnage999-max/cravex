import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Image, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Context
import { PreferencesProvider, usePreferences } from './src/context/PreferencesContext';
import { COLORS } from './src/constants';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import DevicePairingScreen from './src/screens/DevicePairingScreen';
import MonitoringScreen from './src/screens/MonitoringScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import EducationScreen from './src/screens/EducationScreen';
import SupportScreen from './src/screens/SupportScreen';
import EventLogScreen from './src/screens/EventLogScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AnimatedSplashScreen from './src/components/AnimatedSplashScreen';

import { RootStackParamList, TabParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<any>();
const Tab = createBottomTabNavigator<any>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean, color: string, size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'MonitoringTab') iconName = focused ? 'pulse' : 'pulse-outline';
          else if (route.name === 'EducationTab') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'SettingsTab') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        headerStyle: { backgroundColor: '#000000' },
        headerTintColor: '#ffffff',
        headerTitle: () => (
          <Image
            source={require('./assets/cravex-logo.png')}
            style={{ width: 100, height: 30 }}
            resizeMode="contain"
          />
        ),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="MonitoringTab" component={MonitoringScreen} options={{ title: 'Monitor' }} />
      <Tab.Screen name="EducationTab" component={EducationScreen} options={{ title: 'Learn' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = React.useState(true);
  const { isAuthenticated, reduceMotion } = usePreferences();

  if (showSplash) {
    return <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="DevicePairing" component={DevicePairingScreen} options={{ title: 'Pair Device' }} />
            <Stack.Screen name="EventLog" component={EventLogScreen} options={{ title: 'Event Log' }} />
            <Stack.Screen name="Support" component={SupportScreen} options={{ title: 'Support' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
}
