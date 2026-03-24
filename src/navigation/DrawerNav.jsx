import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />
        }
            screenOptions={{ headerShown: false, drawerType: 'slide', drawerStyle: { width: '65%' } }}
        >
            <Drawer.Screen name="MainTabs" component={BottomTabs} />
        </Drawer.Navigator>
    )
}