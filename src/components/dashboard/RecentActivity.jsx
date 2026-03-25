import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Lucide from '../Lucide'
import { useNavigation } from '@react-navigation/native'

export default function RecentActivity({ recentGroups = [], isLoading = false }) {
    const navigation = useNavigation();

    // 1. LOADING STATE
    if (isLoading) {
        return (
            <View className="py-10 items-center">
                <Text className="text-slate-400 font-bold animate-pulse">Updating timeline...</Text>
            </View>
        );
    }

    // 2. EMPTY STATE (Kapag wala pang groups)
    if (recentGroups.length === 0) {
        return (
            <View className="items-center justify-center py-12 bg-white rounded-[40px] border border-dashed border-slate-200">
                <View className="bg-slate-50 p-6 rounded-full mb-4">
                    <Lucide name="receipt" size={32} color="#cbd5e1" />
                </View>
                <Text className="text-slate-900 font-black text-lg">No activity yet</Text>
                <Text className="text-slate-400 text-center px-10 text-[11px] mt-1 font-medium leading-4">
                    Ready to split bills? Start your first group and manage expenses together!
                </Text>
            </View>
        );
    }

    return (
        <View className='bg-white p-4 py-4 gap-3 rounded-[30px] border border-dashed border-slate-400'>
            {recentGroups.map((group) => (
                <TouchableOpacity 
                    key={group.id}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('GroupDetail', { groupData: group })}
                    className="bg-white p-4 rounded-[28px] mb-3 flex-row items-center border border-slate-100 shadow-sm shadow-slate-900/5"
                >
                    {/* Icon Box */}
                    <View className="w-12 h-12 bg-teal-50 rounded-2xl items-center justify-center mr-4 border border-teal-100/30">
                        <Lucide name="users" size={20} color="#0d9488" />
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                        <View className="flex-row items-center">
                            <Text className="text-slate-900 font-black text-sm" numberOfLines={1}>
                                {group.name}
                            </Text>
                            <View className="ml-2 bg-teal-100 px-2 py-0.5 rounded-full">
                                <Text className="text-[8px] text-teal-700 font-black uppercase">New</Text>
                            </View>
                        </View>
                        <Text className="text-slate-400 text-[10px] font-bold mt-0.5 uppercase tracking-tighter">
                            New group created • {new Date(group.createdAt).toLocaleDateString()}
                        </Text>
                    </View>

                    {/* Arrow */}
                    <View className="bg-slate-50 p-2 rounded-full">
                        <Lucide name="chevron-right" size={14} color="#cbd5e1" />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}