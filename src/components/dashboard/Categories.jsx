import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Lucide from '../Lucide'

export default function Categories() {
    return (
        <View className="mb-8 mt-4">
            {/* Header Section */}
            <View className="flex-row justify-between items-end mb-5 px-1">
                <View>
                    <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-1">
                        Insights
                    </Text>
                    <Text className="text-xl font-black text-slate-900 tracking-tight">
                        Spending Categories
                    </Text>
                </View>
            </View>

            {/* Vertical Grid - 2 Columns */}
            <View className="flex-row flex-wrap justify-between">

                {/* FOOD CATEGORY */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-orange-50 p-5 rounded-[32px] border border-orange-100/50 w-[48%] mb-4 shadow-sm shadow-orange-900/5 items-center"
                >
                    <View className="bg-white w-12 h-12 rounded-2xl items-center justify-center mb-3 shadow-sm shadow-orange-200">
                        <Lucide name="utensils" size={20} color="#f97316" />
                    </View>
                    <Text className="text-slate-900 font-black text-sm uppercase tracking-tighter">Food</Text>
                </TouchableOpacity>

                {/* TRAVEL CATEGORY */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-blue-50 p-5 rounded-[32px] border border-blue-100/50 w-[48%] mb-4 shadow-sm shadow-blue-900/5 items-center"
                >
                    <View className="bg-white w-12 h-12 rounded-2xl items-center justify-center mb-3 shadow-sm shadow-blue-200">
                        <Lucide name="plane" size={20} color="#3b82f6" />
                    </View>
                    <Text className="text-slate-900 font-black text-sm uppercase tracking-tighter">Travel</Text>
                </TouchableOpacity>

                {/* SHOPPING CATEGORY */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-pink-50 p-5 rounded-[32px] border border-pink-100/50 w-[48%] mb-4 shadow-sm shadow-pink-900/5 items-center"
                >
                    <View className="bg-white w-12 h-12 rounded-2xl items-center justify-center mb-3 shadow-sm shadow-pink-200">
                        <Lucide name="shopping-bag" size={20} color="#ec4899" />
                    </View>
                    <Text className="text-slate-900 font-black text-sm uppercase tracking-tighter">Shopping</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-teal-100  p-5 rounded-[32px] border border-pink-100/50 w-[48%] mb-4 shadow-sm shadow-pink-900/5 items-center"
                >
                    <View className="bg-white w-12 h-12 rounded-2xl items-center justify-center mb-3 shadow-sm shadow-pink-200">
                        <Lucide name="shopping-cart" size={20} color="#ec4899" />
                    </View>
                    <Text className="text-slate-900 font-black text-sm uppercase tracking-tighter">Groceries</Text>
                </TouchableOpacity>




            </View>
        </View>
    )
}