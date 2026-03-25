import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
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

    const GroupCard = ({ item }) => {
        const initial = item.name ? item.name.charAt(0).toUpperCase() : '?';
        const memberCount = item.friends ? item.friends.length : 0;

        return (
            <TouchableOpacity
                className="bg-white p-5 rounded-[32px] mb-4 flex-row items-center shadow-sm border border-slate-100"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('GroupDetail', { groupData: item })}
            >
                <View className="w-16 h-16 bg-teal-50 rounded-2xl items-center justify-center mr-4 border border-teal-100/50">
                    <Text className="text-teal-700 text-2xl font-black">{initial}</Text>
                </View>

                <View className="flex-1">
                    <Text className="text-lg font-black text-slate-900 tracking-tight mb-1" numberOfLines={1}>
                        {item.name}
                    </Text>
                    <View className="flex-row items-center flex-wrap">
                        <View className="flex-row items-center bg-slate-50 px-2 py-1 rounded-lg mr-2 mb-1">
                            <Lucide name="users" size={12} color="#64748b" />
                            <Text className="text-slate-500 text-[10px] font-bold ml-1 uppercase tracking-tighter">
                                {memberCount + 1} members
                            </Text>
                        </View>
                        {item.location && (
                            <View className="flex-row items-center bg-slate-50 px-2 py-1 rounded-lg mb-1">
                                <Lucide name="map-pin" size={12} color="#64748b" />
                                <Text className="text-slate-500 text-[10px] font-bold ml-1 uppercase tracking-tighter" numberOfLines={1}>
                                    {item.location}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View className="ml-2 bg-slate-50 p-2 rounded-full">
                    <Lucide name="chevron-right" size={18} color="#cbd5e1" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-slate-50">
            <Header />

            <View className="flex-1 px-6 pt-4">
                <View className="flex-row justify-between items-end mb-4">
                    <View>
                        <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-1">Overview</Text>
                        <Text className="text-3xl font-black text-slate-900 tracking-tight">My Groups</Text>
                    </View>
                </View>

                {isLoading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#0d9488" />
                        <Text className="text-slate-400 font-bold mt-4">Fetching your groups...</Text>
                    </View>
                ) : groups.length > 0 ? (
                    <FlatList
                        data={groups}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <GroupCard item={item} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120, paddingTop: 4 }}
                    />
                ) : (
                    /* DITO NATIN INAYOS YUNG LOKASYON NG CARD */
                    <View className="mt-10 items-center">
                        <View className="bg-white p-10 rounded-[50px] items-center border border-slate-100 shadow-sm w-full">
                            <View className="bg-teal-50 p-6 rounded-full mb-6 border border-teal-100/50">
                                <Lucide name="users" size={48} color="#0d9488" />
                            </View>
                            <Text className="text-slate-900 font-black text-xl text-center">Your circle is empty</Text>
                            <Text className="text-slate-400 mt-2 text-center leading-5 font-medium px-4">
                                Ready to split bills? Create your group to get started!
                            </Text>


                        </View>
                    </View>
                )}
            </View>


        </View>
    )
}