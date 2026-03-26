import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lucide from '../Lucide';

export const SectionLabel = ({ label }) => (
    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 ml-1">{label}</Text>
);

export default function BalanceAndHistory({ expenses, memberBalances, totalMembers, groupData, onRefresh }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAmount, setEditAmount] = useState('');

    if (expenses.length === 0) {
        return (
            <View className="items-center justify-center py-24 px-10">
                <Lucide name="receipt-text" size={40} color="#cbd5e1" />
                <Text className="text-slate-400 text-center font-medium mt-4">No expenses recorded yet.</Text>
            </View>
        );
    }

    const openEditModal = (item) => {
        setSelectedExpense(item);
        setEditTitle(item.title);
        setEditAmount(item.amount.toString());
        setIsModalVisible(true);
    };

    const handleUpdateExpense = async () => {
        try {
            const expenseKey = `expenses_${groupData.id}`;
            const updatedExpenses = expenses.map(exp =>
                exp.id === selectedExpense.id ? { ...exp, title: editTitle, amount: parseFloat(editAmount) } : exp
            );
            await AsyncStorage.setItem(expenseKey, JSON.stringify(updatedExpenses));
            setIsModalVisible(false);
            if (onRefresh) onRefresh();
        } catch (error) {
            Alert.alert("Error", "Update failed.");
        }
    };

    return (
        <View>
            {/* --- 1. SETTLEMENT SUMMARY --- */}
            <View className="bg-white p-6 border-y border-slate-100 mb-4 shadow-sm">
                <SectionLabel label="Settlement Summary" />
                {expenses.filter(e => !e.isPayment).map((item) => {
                    const sharePerPerson = item.amount / totalMembers;
                    const isPaidByMe = item.paidBy === 'You';
                    const totalCollectible = item.amount - sharePerPerson;

                    return (
                        <View key={`summary-${item.id}`} className="mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="flex-row items-center flex-1">
                                    <View className={`w-8 h-8 rounded-full items-center justify-center ${isPaidByMe ? 'bg-teal-100' : 'bg-rose-100'}`}>
                                        <Lucide name={isPaidByMe ? "arrow-up-right" : "arrow-down-left"} size={16} color={isPaidByMe ? "#0d9488" : "#e11d48"} />
                                    </View>
                                    <View className="ml-3 flex-1">
                                        <Text className="text-slate-900 font-bold text-sm" numberOfLines={1}>{item.title}</Text>
                                        <Text className="text-slate-400 text-[10px] uppercase font-bold">
                                            {isPaidByMe ? "Everyone owes you" : `You owe ${item.paidBy}`}
                                        </Text>
                                    </View>
                                </View>
                                <Text className={`font-black text-base ${isPaidByMe ? 'text-teal-600' : 'text-rose-600'}`}>
                                    ₱{isPaidByMe ? totalCollectible.toFixed(2) : sharePerPerson.toFixed(2)}
                                </Text>
                            </View>
                            <View className="flex-row justify-between items-center border-t border-slate-200/50 pt-2">
                                <Text className="text-slate-400 text-[10px] font-medium italic">Individual Share</Text>
                                <Text className="text-slate-600 text-[10px] font-black">₱{sharePerPerson.toFixed(2)} / person</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* --- 2. FRIENDS' BALANCES (Button Removed) --- */}
            <View className="px-6 mb-6">
                <SectionLabel label="Group Balances" />
                <View className="bg-white rounded-[32px] p-2 shadow-sm border border-slate-100">
                    {memberBalances.map((member, index) => {
                        const isSettled = Math.abs(member.balance) < 0.1;

                        return (
                            <View key={member.id} className={`flex-row items-center p-4 ${index !== memberBalances.length - 1 ? 'border-b border-slate-50' : ''}`}>
                                <View className="relative">
                                    <Image source={member.sticker} className="w-12 h-12 rounded-2xl" />
                                    {!isSettled && (
                                        <View className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${member.balance >= 0 ? 'bg-teal-500' : 'bg-rose-500'}`} />
                                    )}
                                </View>

                                <View className="ml-4 flex-1">
                                    <Text className="text-slate-900 font-bold text-sm">{member.name}</Text>
                                    <Text className={`text-[10px] font-bold uppercase tracking-tighter ${isSettled ? 'text-slate-400' : (member.balance >= 0 ? 'text-teal-600' : 'text-rose-600')}`}>
                                        {isSettled ? 'All Clear' : (member.balance >= 0 ? 'They pay you' : 'You pay them')}
                                    </Text>
                                </View>

                                <View className="flex-row items-center">
                                    <Text className={`font-black text-base ${isSettled ? 'text-slate-300' : (member.balance >= 0 ? 'text-teal-600' : 'text-rose-600')}`}>
                                        ₱{Math.abs(member.balance).toFixed(2)}
                                    </Text>

                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* --- 3. EXPENSE HISTORY --- */}
            <View className="px-6 mb-4">
                <SectionLabel label="Expense History" />
                {expenses.slice().reverse().map((item) => (
                    <View key={`hist-${item.id}`} className="bg-white p-4 rounded-3xl mb-3 flex-row items-center border border-slate-100 shadow-sm">
                        <View className={`p-3 rounded-2xl mr-4 ${item.isPayment ? 'bg-teal-50' : 'bg-slate-100'}`}>
                            <Lucide name={item.isPayment ? "hand-coins" : "receipt"} size={20} color={item.isPayment ? "#0d9488" : "#64748b"} />
                        </View>
                        <View className="flex-1">
                            <Text className={`font-bold text-sm ${item.isPayment ? 'text-teal-700' : 'text-slate-900'}`}>{item.title}</Text>
                            <Text className="text-slate-400 text-[10px] font-medium">Paid by {item.paidBy} • {item.date}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-slate-900 font-black text-sm mr-2">₱{Math.abs(item.amount).toFixed(2)}</Text>
                            {!item.isPayment && (
                                <TouchableOpacity onPress={() => openEditModal(item)} className="p-2 bg-slate-50 rounded-full">
                                    <Lucide name="pencil" size={14} color="#94a3b8" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
            </View>

            {/* EDIT MODAL */}
            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-black text-slate-900">Edit Expense</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}><Lucide name="x" size={24} color="#64748b" /></TouchableOpacity>
                        </View>
                        <Text className="text-slate-400 text-[10px] font-bold uppercase mb-2 ml-1">Expense Title</Text>
                        <TextInput className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 font-bold" value={editTitle} onChangeText={setEditTitle} />
                        <Text className="text-slate-400 text-[10px] font-bold uppercase mb-2 ml-1">Amount (₱)</Text>
                        <TextInput className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8 font-bold" value={editAmount} onChangeText={setEditAmount} keyboardType="numeric" />
                        <TouchableOpacity onPress={handleUpdateExpense} className="bg-teal-600 p-5 rounded-3xl items-center shadow-lg shadow-teal-600/20">
                            <Text className="text-white font-black text-lg">Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}