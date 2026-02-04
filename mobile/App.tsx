import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Image, View, ActivityIndicator, Platform, Text, TouchableOpacity } from 'react-native';
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

function TabNavigator({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean, color: string, size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Monitoring') iconName = focused ? 'pulse' : 'pulse-outline';
          else if (route.name === 'Education') iconName = focused ? 'library' : 'library-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#f1f5f9',
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        headerStyle: { backgroundColor: '#ffffff', height: 110 },
        headerShadowVisible: false,
        headerTintColor: COLORS.text,
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <Image
              source={require('./assets/cravex-logo.png')}
              style={{ width: 44, height: 44, borderRadius: 12 }}
              resizeMode="contain"
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: '#0f172a', letterSpacing: -1, textTransform: 'uppercase' }}>
                CRAVEX<Text style={{ fontSize: 10, fontWeight: 'bold', opacity: 0.4 }}>®</Text>
              </Text>
              <Text style={{ fontSize: 7, fontWeight: '900', color: COLORS.primary, letterSpacing: 2, textTransform: 'uppercase', marginTop: 1 }}>
                Control the Craving
              </Text>
            </View>
          </View>
        ),
        headerTitle: () => null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{ marginRight: 20, padding: 8 }}
          >
            <Ionicons name="person-circle-outline" size={28} color={COLORS.text} />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Monitoring" component={MonitoringScreen} options={{ title: 'Live Stream' }} />
      <Tab.Screen name="Education" component={EducationScreen} options={{ title: 'Education' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = React.useState(true);
  const { isAuthenticated } = usePreferences();

  if (showSplash) {
    return <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerShadowVisible: false,
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: '800' },
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
            <Stack.Screen name="DevicePairing" component={DevicePairingScreen} options={{ title: 'Pairing' }} />
            <Stack.Screen name="EventLog" component={EventLogScreen} options={{ title: 'Activity Log' }} />
            <Stack.Screen name="Support" component={SupportScreen} options={{ title: 'Support Center' }} />
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
