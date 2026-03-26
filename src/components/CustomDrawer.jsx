import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Lucide from '../components/Lucide';
// 1. IMPORT TOAST
import Toast from 'react-native-toast-message';

export default function CustomDrawer(props) {
  const { user, logout } = useContext(AuthContext);

  // 2. CREATE A WRAPPER FOR LOGOUT
  const handleLogout = () => {
    logout(); // Call the original logout logic
    
    // Show Toast
    Toast.show({
      type: 'info',
      text1: 'Signed Out Successfully ',
      text2: 'Ingat! See you again soon, ' + (user?.name || 'friend') + '.',
      position: 'bottom',
      bottomOffset: 40,
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* DRAWER HEADER */}
      <View className="pt-10 pb-8 px-6 bg-teal-600 rounded-br-[45px] shadow-sm">
        <View className="mb-4 justify-center items-center">
          <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center shadow-sm overflow-hidden border border-white/20">
            <Image
              source={require('../assets/pictures/brand.png')}
              className="w-32 h-32" 
              resizeMode="contain"
            />
          </View>
        </View>

        <View className='justify-center items-center'>
          <Text className="text-white font-black text-3xl tracking-tighter">
            Splitwise
          </Text>
        </View>

        <View className="mt-6 pt-6 border-t border-white/10">
          <Text className="text-white font-bold text-lg leading-5" numberOfLines={1}>
            {user?.name || 'User'}
          </Text>
          <Text className="text-teal-100 text-[11px] font-medium mt-1 opacity-80" numberOfLines={1}>
            {user?.email || 'no-email@provided.com'}
          </Text>
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        <View className="px-3">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* LOGOUT BUTTON - UPDATED TO USE handleLogout */}
      <View className="p-6 border-t border-slate-100">
        <TouchableOpacity
          onPress={handleLogout} // PINALITAN DITO
          activeOpacity={0.7}
          className="flex-row items-center bg-rose-50 p-4 rounded-2xl border border-rose-100"
        >
          <View className="bg-rose-500 p-2 rounded-xl shadow-sm">
            <Lucide name="log-out" size={16} color="white" />
          </View>
          <Text className="ml-3 text-rose-600 font-black uppercase text-[10px] tracking-widest">Sign Out</Text>
        </TouchableOpacity>

        <Text className="text-center text-slate-300 text-[8px] font-bold uppercase mt-4 tracking-widest">
          Splitwise v1.0.1
        </Text>
      </View>
    </View>
  );
}