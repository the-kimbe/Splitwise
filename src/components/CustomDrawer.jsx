import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Lucide from '../components/Lucide';

export default function CustomDrawer(props) {
  const { user, logout } = useContext(AuthContext);

  // Reusable component para sa extra menu items
  const SecondaryMenu = ({ icon, title, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-4 py-3 mb-1 rounded-xl active:bg-slate-50"
    >
      <Lucide name={icon} size={18} color="#64748b" />
      <Text className="ml-5 text-slate-500 font-bold uppercase text-[11px] tracking-tight">
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* DRAWER HEADER - LOGO & USER INFO */}
      <View className="pt-10 pb-8 px-6 bg-teal-600 rounded-br-[45px] shadow-sm">
        <View className="mb-4 justify-center items-center">
          <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center shadow-sm overflow-hidden border border-white/20">
            <Image
              source={require('../assets/pictures/brand.png')}
              className="w-20 h-20" // Adjusted size para hindi sumabog sa box
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

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        {/* MAIN SCREENS (Dashboard, Groups, etc.) */}
        <View className="px-3">
          <DrawerItemList
            {...props}
            activeTintColor="#0d9488"
            inactiveTintColor="#64748b"
            labelStyle={{
              fontWeight: '900',
              textTransform: 'uppercase',
              fontSize: 11,
              marginLeft: -5
            }}
          />

        </View>
      </DrawerContentScrollView>

      {/* LOGOUT BUTTON - FOOTER */}
      <View className="p-6 border-t border-slate-100">
        <TouchableOpacity
          onPress={logout}
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