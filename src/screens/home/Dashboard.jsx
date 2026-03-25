import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import Lucide from '../../components/Lucide';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            <Header />

            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
            >
                {/* Summary Card */}
                <View className="bg-teal-600 p-6 rounded-3xl shadow-xl shadow-teal-900/20 mb-6">
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
                    <Text className="text-slate-900 font-bold text-lg">No Activity yet</Text>

                </View>


            </ScrollView>


        </View>
    )
}