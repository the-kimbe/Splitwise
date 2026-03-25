import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import Lucide from '../../components/Lucide';
import GroupMembers from '../../components/groupDetails/GroupMembers';

export default function GroupDetail({ route, navigation }) {
    const { groupData } = route.params;
    const totalMembers = groupData.friends.length + 1;

    const [expenses, setExpenses] = useState([
        { id: '1', title: 'Dinner at Mang Inasal', amount: 1200, paidBy: 'You', date: 'Mar 24', status: 'Pending' },
        { id: '2', title: 'Taxi Fare', amount: 300, paidBy: 'Jasfer', date: 'Mar 23', status: 'Pending' },
    ]);

    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

    return (
        <View className="flex-1 bg-slate-50">
            {/* --- HEADER --- */}
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-slate-50 rounded-full">
                    <Lucide name="chevron-left" size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-900">Group Summary</Text>
                <View className="w-10" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="bg-white p-6 border-b border-slate-100 mb-4">

                    <GroupMembers groupData={groupData} />
                    <Text className="text-slate-400 text-[10px] font-bold uppercase mb-4">Debt Status</Text>

                    {expenses.map((item) => {
                        const sharePerPerson = item.amount / totalMembers;
                        const isPaidByMe = item.paidBy === 'You';

                        return (
                            <View key={item.id} className="flex-row items-center mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <View className={`w-10 h-10 rounded-full items-center justify-center ${isPaidByMe ? 'bg-teal-100' : 'bg-rose-100'}`}>
                                    <Lucide name={isPaidByMe ? "arrow-up-right" : "arrow-down-left"} size={20} color={isPaidByMe ? "#0d9488" : "#e11d48"} />
                                </View>

                                <View className="ml-4 flex-1">
                                    <Text className="text-slate-900 font-bold text-sm">
                                        {isPaidByMe ? `Everyone owes you` : `You owe ${item.paidBy}`}
                                    </Text>
                                    <Text className="text-slate-500 text-[10px]">
                                        For {item.title} (₱{sharePerPerson.toFixed(2)} each)
                                    </Text>
                                </View>

                                <Text className={`font-black text-base ${isPaidByMe ? 'text-teal-600' : 'text-rose-600'}`}>
                                    ₱{isPaidByMe ? (item.amount - sharePerPerson).toFixed(2) : sharePerPerson.toFixed(2)}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* <View className="px-6">
                    <SectionLabel label="History" />
                    {expenses.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => Alert.alert("Edit Amount", "Coming soon: Logic to change ₱" + item.amount)}
                            className="bg-white p-4 rounded-3xl mb-3 flex-row items-center border border-slate-100 shadow-sm"
                        >
                            <View className="bg-teal-50 p-3 rounded-2xl mr-4">
                                <Lucide name="receipt" size={20} color="#0d9488" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-slate-900 font-bold text-sm">{item.title}</Text>
                                <Text className="text-slate-400 text-[10px]">Paid by {item.paidBy} • {item.date}</Text>
                            </View>
                            <View>
                                <Text className="text-slate-900 font-black text-sm">₱{item.amount}</Text>
                                <Lucide name="edit-3" size={12} color="#cbd5e1" className="self-end mt-1" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View> */}

            </ScrollView>

            {/* --- ADD EXPENSE BUTTON --- */}
            <TouchableOpacity
                className="absolute bottom-10 right-6 bg-teal-600 w-16 h-16 rounded-full items-center justify-center shadow-xl shadow-teal-600/40"
                onPress={() => navigation.navigate('AddExpenseForm', { groupData })}
            >
                <Lucide name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}

// Helper for labels
const SectionLabel = ({ label }) => (
    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 ml-1">
        {label}
    </Text>
);