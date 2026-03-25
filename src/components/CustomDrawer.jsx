import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Lucide from '../components/Lucide';

export default function CustomDrawer(props) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="p-5 border-b border-slate-100 mb-4">
          <Text className="text-teal-600 font-bold text-xl">Splitwise</Text>
          <Text className="text-slate-500">{user?.email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
      {/* Logout button at the bottom */}
      <TouchableOpacity 
        onPress={logout}
        className="flex-row items-center p-5 border-t border-slate-100"
      >
        <Lucide name="log-out" size={20} color="#ef4444" />
        <Text className="ml-3 text-red-500 font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}