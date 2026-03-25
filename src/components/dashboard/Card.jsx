import React from 'react';
import { View, Text } from 'react-native';
import Lucide from '../Lucide';

export default function Card({ totalBalance = 0, youAreOwed = 0, youOwe = 0 }) {
    return (
        <View className="bg-teal-600 p-6 rounded-[32px] shadow-xl shadow-teal-900/20 mb-6">
            <View className="flex-row justify-between items-start">
                <View>
                    <Text className="text-teal-100 text-xs font-black uppercase tracking-widest">Total Balance</Text>
                    <Text className="text-white text-4xl font-black mt-1">
                        ₱ {totalBalance.toFixed(2)}
                    </Text>
                </View>
                <View className="bg-white/20 p-3 rounded-2xl">
                    <Lucide name="wallet" size={24} color="white" />
                </View>
            </View>

            <View className="flex-row mt-8 border-t border-white/10 pt-5">
                <View className="flex-1">
                    <Text className="text-teal-100 text-[10px] uppercase tracking-widest font-black">You are owed</Text>
                    <Text className="text-white text-lg font-black">
                        ₱ {youAreOwed.toFixed(2)}
                    </Text>
                </View>
                
                <View className="w-[1px] h-10 bg-white/10 mx-4" />
                
                <View className="flex-1">
                    <Text className="text-teal-100 text-[10px] uppercase tracking-widest font-black">You owe</Text>
                    <Text className="text-white text-lg font-black">
                        ₱ {youOwe.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
}