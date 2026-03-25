import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Lucide from '../Lucide';

export const SectionLabel = ({ label }) => (
    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 ml-1">{label}</Text>
);

export default function BalanceAndHistory({ expenses, memberBalances, totalMembers }) {
    if (expenses.length === 0) {
        return (
            <View className="items-center justify-center py-24 px-10">
                <Lucide name="receipt-text" size={40} color="#cbd5e1" />
                <Text className="text-slate-400 text-center font-medium mt-4">No expenses recorded yet.</Text>
            </View>
        );
    }

    return (
        <View>
            {/* --- SETTLEMENT SUMMARY --- */}
            <View className="bg-white p-6 border-y border-slate-100 mb-4 shadow-sm">
                <SectionLabel label="Settlement Summary" />
                {expenses.map((item) => {
                    const sharePerPerson = item.amount / totalMembers;
                    const isPaidByMe = item.paidBy === 'You';
                    return (
                        <View key={`debt-${item.id}`} className="flex-row items-center mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <View className={`w-10 h-10 rounded-full items-center justify-center ${isPaidByMe ? 'bg-teal-100' : 'bg-rose-100'}`}>
                                <Lucide name={isPaidByMe ? "arrow-up-right" : "arrow-down-left"} size={20} color={isPaidByMe ? "#0d9488" : "#e11d48"} />
                            </View>
                            <View className="ml-4 flex-1">
                                <Text className="text-slate-900 font-bold text-sm">{isPaidByMe ? `Everyone owes you` : `You owe ${item.paidBy}`}</Text>
                                <Text className="text-slate-400 text-[10px]">Share: ₱{sharePerPerson.toFixed(2)}</Text>
                            </View>
                            <Text className={`font-black text-base ${isPaidByMe ? 'text-teal-600' : 'text-rose-600'}`}>
                                ₱{isPaidByMe ? (item.amount - sharePerPerson).toFixed(2) : sharePerPerson.toFixed(2)}
                            </Text>
                        </View>
                    );
                })}
            </View>

            {/* --- INDIVIDUAL BALANCES --- */}
            <View className="px-6 mb-6">
                <SectionLabel label="Friends' Balances" />
                <View className="bg-white rounded-[32px] p-2 shadow-sm border border-slate-100">
                    {memberBalances.map((member, index) => (
                        <View key={member.id} className={`flex-row items-center p-4 ${index !== memberBalances.length - 1 ? 'border-b border-slate-50' : ''}`}>
                            <View className="relative">
                                <Image source={member.sticker} className="w-12 h-12 rounded-2xl" />
                                <View className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${member.balance >= 0 ? 'bg-teal-500' : 'bg-rose-500'}`} />
                            </View>
                            <View className="ml-4 flex-1">
                                <Text className="text-slate-900 font-bold text-sm">{member.name}</Text>
                                <Text className="text-slate-400 text-[10px]">{member.balance >= 0 ? 'owes you' : 'you owe them'}</Text>
                            </View>
                            <View className="items-end">
                                <Text className={`font-black text-base ${member.balance >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
                                    {member.balance >= 0 ? '+' : '-'}₱{Math.abs(member.balance).toFixed(2)}
                                </Text>
                                <TouchableOpacity onPress={() => Alert.alert("Settle Up", `Mark ${member.name} as paid?`)}>
                                    <Text className="text-[10px] font-bold text-slate-400 underline mt-1 uppercase">Settle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* --- EXPENSE HISTORY --- */}
            <View className="px-6 mb-4">
                <SectionLabel label="Expense History" />
                {expenses.slice().reverse().map((item) => (
                    <View key={`hist-${item.id}`} className="bg-white p-4 rounded-3xl mb-3 flex-row items-center border border-slate-100 shadow-sm">
                        <View className="bg-slate-100 p-3 rounded-2xl mr-4">
                            <Lucide name="receipt" size={20} color="#64748b" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-900 font-bold text-sm">{item.title}</Text>
                            <Text className="text-slate-400 text-[10px]">Paid by {item.paidBy} • {item.date}</Text>
                        </View>
                        <Text className="text-slate-900 font-black text-sm">₱{item.amount.toFixed(2)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}