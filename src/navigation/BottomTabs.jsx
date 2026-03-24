import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/home/Dashboard';
import Lucide from '@react-native-vector-icons/lucide';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#0d9488',
    }}>
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          tabBarIcon: ({ color }) => <Lucide name="home" size={24} color={color} />
        }}
      />
      {/* Pwede ka magdagdag ng "Friends" o "Activity" tab dito */}
    </Tab.Navigator>
  );
}