import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawer from '../components/CustomDrawer';
import Settings from '../screens/drawer/Settings';
import About from '../screens/drawer/About';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ 
                headerShown: false, 
                drawerType: 'slide', 
                drawerStyle: { width: '75%' } 
            }}
        >
            <Drawer.Screen name="Main" component={BottomTabs} options={{ title: 'Dashboard' }} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="About" component={About} />   
        </Drawer.Navigator>
    )
}