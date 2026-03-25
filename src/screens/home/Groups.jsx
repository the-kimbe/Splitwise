import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lucide from '../../components/Lucide';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Header from '../../components/Header'
import { AuthContext } from '../../context/AuthContext';

export default function Groups() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 
    
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isFocused) {
            loadMyGroups();
        }
    }, [isFocused]);

    const loadMyGroups = async () => {
        try {
            setIsLoading(true);
            const allGroups = await AsyncStorage.getItem('userGroups');
            
            if (allGroups) {
                const parsedGroups = JSON.parse(allGroups);
                const myGroups = parsedGroups.filter(g => g.ownerEmail === user.email);
                myGroups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setGroups(myGroups);
            }
        } catch (error) {
            console.log("Error loading groups:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- SUB-COMPONENT: Group Card ---
    const GroupCard = ({ item }) => {
        const initial = item.name ? item.name.charAt(0).toUpperCase() : '?';
        const memberCount = item.friends ? item.friends.length : 0;

        return (
            <TouchableOpacity 
                className="bg-white p-4 rounded-3xl mb-2 flex-row items-center shadow-lg shadow-slate-900/5 border border-slate-100"
                activeOpacity={0.7}
                // --- NAVIGATION DITO ---
                onPress={() => navigation.navigate('GroupDetail', { groupData: item })}
            >
                {/* 1. Profile Initial */}
                <View className="w-14 h-14 bg-teal-600 rounded-2xl items-center justify-center mr-4">
                    <Text className="text-white text-2xl font-black">
                        {initial}
                    </Text>
                </View>

                {/* 2. Group Info */}
                <View className="flex-1">
                    <Text className="text-lg font-extrabold text-slate-950 tracking-tight" numberOfLines={1}>
                        {item.name}
                    </Text>
                    
                    <View className="flex-row items-center gap-3 mt-1">
                        <View className="flex-row items-center gap-1">
                            <Lucide name="map-pin" size={12} color="#64748b" />
                            <Text className="text-slate-500 text-xs font-medium">
                                {item.location || 'No location'}
                            </Text>
                        </View>
                        
                        <View className="flex-row items-center gap-1">
                            <Lucide name="users" size={12} color="#64748b" />
                            <Text className="text-slate-500 text-xs font-medium">
                                {memberCount + 1} members
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Lucide name="chevron-right" size={18} color="#94a3b8" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-slate-50">
            <Header />
            <View className="flex-1 px-6 pt-6">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-black text-slate-900 tracking-tight">My Groups</Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Add' ) }
                        className="bg-teal-600/10 p-2 rounded-xl"
                    >
                        <Lucide name="plus" size={20} color="#0d9488" />
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <View className="flex-1 justify-center">
                        <ActivityIndicator size="large" color="#0d9488" />
                    </View>
                ) : groups.length > 0 ? (
                    <FlatList
                        data={groups}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <GroupCard item={item} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                ) : (
                    <View className="items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-slate-300">
                        <View className="bg-teal-50 p-6 rounded-full mb-4">
                            <Lucide name="users" size={48} color="#0d9488" />
                        </View>
                        <Text className="text-slate-900 font-bold text-lg">No groups yet</Text>
                        <Text className="text-slate-400 mt-2 text-center px-10 leading-5">
                            Start splitting bills by creating a group with your friends!
                        </Text>
                       
                    </View>
                )}
            </View>
        </View>
    )
}