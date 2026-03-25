import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import Lucide from '../../components/Lucide';
import GroupMembers from '../../components/groupDetails/GroupMembers';
import GroupInfoGrid from '../../components/groupDetails/GroupInfoGrid'; // DAGDAG ITO
import BalanceAndHistory from '../../components/groupDetails/BalanceAndHistory'; // DAGDAG ITO

export default function GroupDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const { groupData } = route.params || {};

    const [expenses, setExpenses] = useState([]);
    const totalMembers = (groupData?.friends?.length || 0) + 1;

    const loadExpenses = async () => {
        if (!groupData?.id) return;
        try {
            const expenseKey = `expenses_${groupData.id}`;
            const storedExpenses = await AsyncStorage.getItem(expenseKey);
            if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
        } catch (error) { console.log("Error:", error); }
    };

    useEffect(() => { if (isFocused) loadExpenses(); }, [isFocused]);

    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

    const memberBalances = (groupData?.friends || []).map(friend => {
        let balance = 0;
        expenses.forEach(exp => {
            const share = exp.amount / totalMembers;
            if (exp.paidBy === 'You') balance += share;
            else if (exp.paidBy === friend.name) balance -= share;
        });
        return { ...friend, balance };
    });

    const handleDeleteGroup = async () => {
        Alert.alert("Delete Group", `Delete "${groupData.name}"?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: async () => {
                const stored = await AsyncStorage.getItem('userGroups');
                if (stored) {
                    const updated = JSON.parse(stored).filter(g => g.id !== groupData.id);
                    await AsyncStorage.setItem('userGroups', JSON.stringify(updated));
                    await AsyncStorage.removeItem(`expenses_${groupData.id}`);
                    navigation.goBack();
                }
            }}
        ]);
    };

    if (!groupData?.id) return <View className="flex-1 justify-center items-center"><Text>Loading...</Text></View>;

    return (
        <View className="flex-1 bg-slate-50">
            {/* --- HEADER --- */}
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-slate-50 rounded-full">
                    <Lucide name="chevron-left" size={24} color="#0f172a" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="text-lg font-bold text-slate-900">{groupData.name}</Text>
                    <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Group Summary</Text>
                </View>
                <TouchableOpacity onPress={handleDeleteGroup} className="p-2"><Lucide name="trash-2" size={20} color="#e11d48" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* BUDGET CARD */}
                <View className="bg-white p-6 border-b border-slate-100 mb-4 flex-row justify-between items-center shadow-sm">
                    <View>
                        <Text className="text-slate-400 text-[10px] font-bold uppercase">Budget Cap</Text>
                        <Text className="text-2xl font-black text-slate-900">₱{groupData.budget || '0'}</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-slate-400 text-[10px] font-bold uppercase">Total Spent</Text>
                        <Text className={`text-xl font-bold ${totalSpent > groupData.budget ? 'text-rose-500' : 'text-teal-600'}`}>₱{totalSpent.toFixed(2)}</Text>
                    </View>
                </View>

                {/* --- 1. INFO GRID --- */}
                <GroupInfoGrid groupData={groupData} />

                {/* --- 2. MEMBERS --- */}
                <View className="bg-white py-4 mb-4 border-y border-slate-100 shadow-sm">
                    <GroupMembers groupData={groupData} />
                </View>

                {/* --- 3. BALANCES & HISTORY --- */}
                <BalanceAndHistory 
                    expenses={expenses} 
                    memberBalances={memberBalances} 
                    totalMembers={totalMembers} 
                />
            </ScrollView>

            <TouchableOpacity className="absolute bottom-10 right-6 bg-teal-600 w-16 h-16 rounded-full items-center justify-center shadow-2xl" onPress={() => navigation.navigate('AddExpense', { groupData })}>
                <Lucide name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}