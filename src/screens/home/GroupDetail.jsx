import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import Lucide from '../../components/Lucide';
import GroupMembers from '../../components/groupDetails/GroupMembers';
import GroupInfoGrid from '../../components/groupDetails/GroupInfoGrid';
import BalanceAndHistory from '../../components/groupDetails/BalanceAndHistory';

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
        expenses.forEach(expense => {
            if (expense.isPayment) {
                // --- PAYMENT LOGIC ---
                // If I paid the friend OR the friend paid me, reduce the balance to 0
                if (
                    (expense.paidBy === 'You' && expense.title.includes(friend.name)) ||
                    (expense.paidBy === friend.name && expense.title.includes('From'))
                ) {
                    // Subtract the payment amount directly from the running balance
                    balance -= expense.amount;
                }
            } else {
                // --- REGULAR SPLIT LOGIC ---
                const share = expense.amount / totalMembers;
                if (expense.paidBy === 'You') {
                    balance += share; // Others owe me
                } else if (expense.paidBy === friend.name) {
                    balance -= share; // I owe them
                }
            }
        });
        return { ...friend, balance };
    });

    const handleDeleteGroup = async () => {
        Alert.alert("Delete Group", `Delete "${groupData.name}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete", style: "destructive", onPress: async () => {
                    const stored = await AsyncStorage.getItem('userGroups');
                    if (stored) {
                        const updated = JSON.parse(stored).filter(g => g.id !== groupData.id);
                        await AsyncStorage.setItem('userGroups', JSON.stringify(updated));
                        await AsyncStorage.removeItem(`expenses_${groupData.id}`);
                        navigation.goBack();
                    }
                }
            }
        ]);
    };

    if (!groupData?.id) return <View className="flex-1 justify-center items-center"><Text>Loading...</Text></View>;

    return (
        <View className="flex-1 bg-slate-50">
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.navigate('AppDrawer', {
                    screen: 'MainTabs',
                    params: { screen: 'Groups' }
                })} className="p-2 bg-slate-50 rounded-full">
                    <Lucide name="chevron-left" size={24} color="#0f172a" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="text-lg font-bold text-slate-900">{groupData.name}</Text>
                    <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Group Summary</Text>
                </View>
                <TouchableOpacity onPress={handleDeleteGroup} className="p-2"><Lucide name="trash-2" size={20} color="#e11d48" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
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

                <GroupInfoGrid groupData={groupData} />

                <View className="bg-white py-4 mb-4 border-y border-slate-100 shadow-sm">
                    <GroupMembers groupData={groupData} />
                </View>

                <BalanceAndHistory
                    expenses={expenses}
                    memberBalances={memberBalances}
                    totalMembers={totalMembers}
                    groupData={groupData}
                    onRefresh={loadExpenses}
                />
            </ScrollView>

            <TouchableOpacity className="absolute bottom-10 right-6 bg-teal-600 w-16 h-16 rounded-full items-center justify-center shadow-2xl" onPress={() => navigation.navigate('AddExpense', { groupData })}>
                <Lucide name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}