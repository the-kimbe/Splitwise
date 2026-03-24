import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import Lucide from '@react-native-vector-icons/lucide';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />
            
            {/* --- TOP FIXED HEADER --- */}
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
                <View className="flex-row items-center gap-4">
                    {/* Burger Menu */}
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        className="p-2 bg-slate-50 rounded-xl border border-slate-100"
                        activeOpacity={0.7}
                    >
                        <Lucide name="menu" size={24} color="#0f172a" />
                    </TouchableOpacity>

                    <View>
                        <Text className="text-slate-500 text-xs font-medium uppercase tracking-wider">Welcome back,</Text>
                        <Text className="text-slate-900 text-lg font-bold">{user?.name || 'User'}</Text>
                    </View>
                </View>

                {/* Notification / Profile Button */}
                <TouchableOpacity className="p-2 bg-slate-50 rounded-full border border-slate-100">
                    <Lucide name="bell" size={20} color="#64748b" />
                </TouchableOpacity>
            </View>

            {/* --- SCROLLABLE CONTENT --- */}
            <ScrollView 
                className="flex-1 px-6" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
            >
                {/* Summary Card */}
                <View className="bg-teal-600 p-6 rounded-3xl shadow-xl shadow-teal-900/20 mb-8">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-teal-100 text-sm font-medium">Total Balance</Text>
                            <Text className="text-white text-4xl font-extrabold mt-1">₱ 0.00</Text>
                        </View>
                        <Lucide name="wallet" size={28} color="rgba(255,255,255,0.5)" />
                    </View>

                    <View className="flex-row mt-8 border-t border-teal-500/50 pt-5">
                        <View className="flex-1">
                            <Text className="text-teal-100 text-[10px] uppercase tracking-widest font-bold">You are owed</Text>
                            <Text className="text-white text-lg font-bold">₱ 0.00</Text>
                        </View>
                        <View className="w-[1px] h-10 bg-teal-500/50 mx-2" />
                        <View className="flex-1 pl-2">
                            <Text className="text-teal-100 text-[10px] uppercase tracking-widest font-bold">You owe</Text>
                            <Text className="text-white text-lg font-bold">₱ 0.00</Text>
                        </View>
                    </View>
                    
                </View>

                {/* Recent Activity Header */}
                <View className="flex-row justify-between items-center mb-5">
                    <Text className="text-xl font-bold text-slate-800">Recent Activity</Text>
                    <TouchableOpacity>
                        <Text className="text-teal-600 font-semibold text-sm">View all</Text>
                    </TouchableOpacity>
                </View>

                {/* Empty State Card */}
                <View className="items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                    <View className="bg-slate-50 p-6 rounded-full mb-4">
                        <Lucide name="receipt" size={40} color="#cbd5e1" />
                    </View>
                    <Text className="text-slate-900 font-bold text-lg">No expenses yet</Text>
                    <Text className="text-slate-400 mt-1 text-center px-12 leading-5">
                        Tap the button below to start splitting bills with your friends.
                    </Text>
                </View>


            </ScrollView>

            {/* --- FLOATING ACTION BUTTON --- */}
            <TouchableOpacity
                className="absolute bottom-8 right-6 bg-teal-600 w-16 h-16 rounded-2xl items-center justify-center shadow-2xl shadow-teal-900"
                activeOpacity={0.8}
            >
                <Lucide name="plus" size={32} color="white" />
            </TouchableOpacity>
        </View>
    )
}