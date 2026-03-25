import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext'; // Import mo ito
import { View, ActivityIndicator } from 'react-native';
import Landing from '../screens/Landing';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import DrawerNav from './DrawerNav'; // Import mo yung Drawer
import GroupDetail from '../screens/home/GroupDetail'; // Import mo yung GroupDetail screen

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { user, isLoading } = useContext(AuthContext);


  // Habang chine-check pa kung naka-login, pakita muna ang loading spinner
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0d9488" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          {/* Main App Structure */}
          <Stack.Screen name="AppDrawer" component={DrawerNav} />

          {/* Group Detail: Dito siya para "full screen" at walang tab bar sa ilalim */}
          <Stack.Screen
            name="GroupDetail"
            component={GroupDetail}
            options={{
              animation: 'slide_from_right' // Magandang transition para sa details
            }}
          />
        </>
      ) : (
        // Auth Routes: Kung hindi pa logged in
        <>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}