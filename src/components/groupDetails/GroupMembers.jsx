// src/components/expense/GroupMembers.js
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

// Gagawa tayo ng local SectionLabel para dito or i-import mo kung global
const SectionLabel = ({ label }) => (
    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 ml-1">
        {label}
    </Text>
);

export default function GroupMembers({ groupData }) {
    // Check para iwas error kung sakaling wala pang laman ang groupData
    if (!groupData || !groupData.friends) return null;

    return (
        <View className="px-6 mb-6">
            <SectionLabel label="Group Members" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {/* 1. "You" Profile */}
                <View className="items-center mr-4">
                    <View className="w-16 h-16 rounded-2xl items-center justify-center border-2 border-white shadow-sm">
                      <Image source={require('../../assets/stickers/sticker6.png')} className="w-14 h-14 rounded-2xl" />
                    </View>
                    <Text className="text-[10px] text-slate-500 mt-1 font-medium text-center">You</Text>
                </View>

                {/* 2. Friends Profiles */}
                {groupData.friends.map((friend) => (
                    <View key={friend.id} className="items-center mr-4">
                        <Image 
                            source={friend.sticker} 
                            className="w-16 h-16 rounded-2xl border-2 border-white shadow-sm" 
                        />
                        <Text className="text-[10px] text-slate-500 mt-1 font-medium text-center" numberOfLines={1}>
                            {friend.name}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}