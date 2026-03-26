import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import Lucide from '../../components/Lucide';
import GroupMembers from '../../components/groupDetails/GroupMembers';
import GroupInfoGrid from '../../components/groupDetails/GroupInfoGrid';
import BalanceAndHistory from '../../components/groupDetails/BalanceAndHistory';
import Toast from 'react-native-toast-message';

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

    const handleSettleToast = (amount, name) => {
        Toast.show({
            type: 'success',
            text1: 'Payment Recorded!',
            text2: `₱${amount} has been settled by ${name}. Balance updated!`,
            position: 'bottom',
            bottomOffset: 100,
        });
        loadExpenses();
    };

    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

    const allParticipants = [
        { id: 'me', name: 'You', sticker: require('../../assets/stickers/sticker6.png') },
        ...(groupData?.friends || [])
    ];

    const memberBalances = allParticipants.map(member => {
        let balance = 0;
        expenses.forEach(expense => {
            const share = expense.amount / totalMembers;
            if (expense.isPayment) {
                if (expense.paidBy === member.name) balance += expense.amount;
                if (expense.title.includes(member.name)) balance -= expense.amount;
            } else {
                if (expense.paidBy === member.name || (member.name === 'You' && expense.paidBy === 'You')) {
                    balance += (expense.amount - share);
                } else {
                    balance -= share;
                }
            }
        });
        return { ...member, balance };
    });

    const handleDeleteGroup = async () => {
        Alert.alert(
            "Delete Group",
            `Are you sure you want to delete "${groupData.name}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const stored = await AsyncStorage.getItem('userGroups');
                            if (stored) {
                                const updated = JSON.parse(stored).filter(g => g.id !== groupData.id);
                                await AsyncStorage.setItem('userGroups', JSON.stringify(updated));
                                await AsyncStorage.removeItem(`expenses_${groupData.id}`);

                                Toast.show({
                                    type: 'success',
                                    text1: 'Group Deleted ',
                                    text2: `Successfully removed "${groupData.name}".`,
                                });

                                navigation.navigate('AppDrawer', {
                                    screen: 'Main',
                                    params: { screen: 'Groups' }
                                });
                            }
                        } catch (error) {
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Failed to delete group.',
                            });
                        }
                    }
                }
            ]
        );
    };

    if (!groupData?.id) return <View className="flex-1 justify-center items-center"><Text>Loading...</Text></View>;

    return (
        <View className="flex-1 bg-slate-50">
            {/* HEADER */}
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.navigate('AppDrawer', {
                    screen: 'Main',
                    params: { screen: 'Groups' }
                })} className="p-2 bg-slate-50 rounded-full">
                    <Lucide name="chevron-left" size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900">{groupData.name}</Text>
                <TouchableOpacity onPress={handleDeleteGroup} className="p-2">
                    <Lucide name="trash-2" size={20} color="#e11d48" />
                </TouchableOpacity>
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
                    onSettle={handleSettleToast}
                />
            </ScrollView>

            <TouchableOpacity
                className="absolute bottom-10 right-6 bg-teal-600 w-16 h-16 rounded-full items-center justify-center shadow-2xl"
                onPress={() => navigation.navigate('AddExpense', { groupData })}
            >
                <Lucide name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}