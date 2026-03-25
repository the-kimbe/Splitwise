import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const SectionLabel = ({ label }) => (
    <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-3 ml-1">
        {label}
    </Text>
);

export default function GroupMembers({ groupData }) {
    if (!groupData || !groupData.friends) return null;

    // Soft background colors for the avatars (similar to your image)
    const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100', 'bg-pink-100'];

    return (
        <View className="px-6 mb-4">
            <SectionLabel label="Group Members" />
            
            <View className="flex-row items-center">
                {/* STACKED AVATAR CONTAINER */}
                <View className="flex-row items-center">
                    
                    {/* 1. "YOU" AVATAR */}
                    <View 
                        className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center border-2 border-white shadow-sm z-[10]"
                    >
                        <Image 
                            source={require('../../assets/stickers/sticker6.png')} 
                            className="w-10 h-10 rounded-full" 
                        />
                    </View>

                    {/* 2. FRIENDS AVATARS (OVERLAPPING) */}
                    {groupData.friends.map((friend, index) => (
                        <View 
                            key={friend.id} 
                            style={{ marginLeft: -12, zIndex: 9 - index }} // Negative margin creates the overlap
                            className={`w-12 h-12 rounded-full ${bgColors[(index + 1) % bgColors.length]} items-center justify-center border-2 border-white shadow-sm`}
                        >
                            <Image 
                                source={friend.sticker} 
                                className="w-10 h-10 rounded-full" 
                                resizeMode="contain"
                            />
                        </View>
                    ))}

                    {/* MEMBER COUNT LABEL */}
                    <View className="ml-4 bg-slate-100 px-3 py-1 rounded-full">
                        <Text className="text-[10px] text-slate-500 font-black">
                            {groupData.friends.length + 1} MEMBERS
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}