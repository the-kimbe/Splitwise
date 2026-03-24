import { View, Text, TouchableOpacity} from 'react-native'
import React, {useContext}from 'react'
import Lucide from '@react-native-vector-icons/lucide';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const { user } = useContext(AuthContext);
     const navigation = useNavigation();

    return (
        <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
            {/* 1. Burger Menu (Left Side) */}
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                className="p-2 bg-teal-600 rounded-xl border border-teal-500"
                activeOpacity={0.7}
            >
                <Lucide name="menu" size={20} color="#ffffff" />
            </TouchableOpacity>

            {/* 2. Welcome Back (Center) */}
            <View className="items-center">
                <Text className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Welcome back</Text>
            </View>

            {/* 3. Initial Avatar (Right Side) */}
            <View className="w-10 h-10 bg-teal-50 rounded-full items-center justify-center border border-teal-100">
                <Text className="text-teal-700 font-extrabold text-lg uppercase">
                    {user?.name ? user.name.charAt(0) : 'A'}
                </Text>
            </View>
        </View>

    )
}