import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawer from '../components/CustomDrawer';
import Settings from '../screens/drawer/Settings';
import About from '../screens/drawer/About';
import Lucide from '../components/Lucide'; // Import Lucide para sa icons

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ 
                headerShown: false, 
                drawerType: 'slide', 
                drawerStyle: { width: '75%' },
                // --- DITO ANG FIX PARA SA KULAY ---
                drawerActiveBackgroundColor: '#0d9488', // Teal-600
                drawerActiveTintColor: '#ffffff',       // White text/icon kapag active
                drawerInactiveTintColor: '#64748b',     // Gray text/icon kapag inactive
                drawerLabelStyle: {
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    fontSize: 11,
                    marginLeft: -10, // Para lumapit sa icon
                },
                drawerItemStyle: {
                    borderRadius: 12,
                    marginVertical: 4,
                    paddingHorizontal: 10,
                }
            }}
        >
            <Drawer.Screen 
                name="Main" 
                component={BottomTabs} 
                options={{ 
                    title: 'Dashboard',
                    drawerIcon: ({color}) => <Lucide name="layout-dashboard" size={18} color={color} />
                }} 
            />
            <Drawer.Screen 
                name="Settings" 
                component={Settings} 
                options={{ 
                    drawerIcon: ({color}) => <Lucide name="settings" size={18} color={color} />
                }}
            />
            <Drawer.Screen 
                name="About" 
                component={About} 
                options={{ 
                    drawerIcon: ({color}) => <Lucide name="info" size={18} color={color} />
                }}
            />   
        </Drawer.Navigator>
    )
}