import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lucide from '../components/Lucide';
import Dashboard from '../screens/home/Dashboard';
import Groups from '../screens/home/Groups';
import History from '../screens/home/History';
import Profile from '../screens/home/Profile';
import CreateGroup from '../screens/home/CreateGroup';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            top: -25,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            ...Platform.select({
                ios: { shadowColor: '#0d9488', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10 },
                android: { elevation: 10 }
            })
        }}
        activeOpacity={0.9}
    >
        <View className="w-16 h-16 bg-teal-600 rounded-3xl items-center justify-center border-4 border-slate-50">
            <Lucide name="plus" size={32} color="white" />
        </View>
    </TouchableOpacity>
);

export default function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#0d9488',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarShowLabel: true,
            tabBarStyle: {
                position: 'absolute',
                height: 70,
                paddingBottom: 10,
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                elevation: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 10
            },
        }}>
            <Tab.Screen
                name="Home"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color }) => <Lucide name="home" size={22} color={color} />
                }}
            />

            <Tab.Screen
                name="Groups"
                component={Groups}
                options={{
                    tabBarIcon: ({ color }) => <Lucide name="users" size={22} color={color} />
                }}
            />

            <Tab.Screen
                name="Group"
                component={CreateGroup} 
                options={{
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props}  />
                    )
                }}
            />

            <Tab.Screen
                name="Activity"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => <Lucide name="history" size={22} color={color} />
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <Lucide name="user" size={22} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}