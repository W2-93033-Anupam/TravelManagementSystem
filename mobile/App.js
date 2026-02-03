import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import HomeScreen from './src/screens/HomeScreen';
import PackagesScreen from './src/screens/PackagesScreen';
import PackageDetailsScreen from './src/screens/PackageDetailsScreen';
import HotelsScreen from './src/screens/HotelsScreen';
import HotelDetailsScreen from './src/screens/HotelDetailsScreen';
import DestinationsScreen from './src/screens/DestinationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BookingsScreen from './src/screens/BookingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Packages': iconName = 'briefcase'; break;
            case 'Hotels': iconName = 'bed'; break;
            case 'Destinations': iconName = 'location'; break;
            case 'Profile': iconName = 'person'; break;
            default: iconName = 'home';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Packages" component={PackagesScreen} />
      <Tab.Screen name="Hotels" component={HotelsScreen} />
      <Tab.Screen name="Destinations" component={DestinationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="PackageDetails" 
              component={PackageDetailsScreen} 
              options={{ headerShown: true, title: 'Package Details' }}
            />
            <Stack.Screen 
              name="HotelDetails" 
              component={HotelDetailsScreen} 
              options={{ headerShown: true, title: 'Hotel Details' }}
            />
            <Stack.Screen 
              name="Bookings" 
              component={BookingsScreen} 
              options={{ headerShown: true, title: 'My Bookings' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </PaperProvider>
  );
}