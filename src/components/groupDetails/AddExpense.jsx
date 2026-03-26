import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lucide from '../../components/Lucide';
import { SectionLabel, DetailInput } from '../../components/expense/SubComponents';
// 1. IMPORT TOAST
import Toast from 'react-native-toast-message';

export default function AddExpense({ route, navigation }) {
    const { groupData } = route.params;

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');

    const [paidBy, setPaidBy] = useState({ name: 'You', id: 'me' });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSaveExpense = async () => {
        // 2. ERROR TOAST PARA SA VALIDATION
        if (!amount || !description) {
            Toast.show({
                type: 'error',
                text1: 'Wait! ',
                text2: 'Please enter the amount and description.',
                position: 'top',
            });
            return;
        }

        try {
            const expenseKey = `expenses_${groupData.id}`;
            const existingExpenses = await AsyncStorage.getItem(expenseKey);
            let expensesArray = existingExpenses ? JSON.parse(existingExpenses) : [];

            const newExpense = {
                id: Date.now().toString(),
                title: description,
                amount: parseFloat(amount),
                paidBy: paidBy.name,
                notes: notes,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                createdAt: new Date().toISOString()
            };

            expensesArray.push(newExpense);
            await AsyncStorage.setItem(expenseKey, JSON.stringify(expensesArray));

            // 3. SUCCESS TOAST
            Toast.show({
                type: 'success',
                text1: 'Success! ',
                text2: `Expense recorded. ${paidBy.name === 'You' ? 'Everyone owes you.' : 'You owe ' + paidBy.name}`,
            });

            // Navigate pabalik
            navigation.navigate('GroupDetail', { groupData });

        } catch (error) {
            console.log("Save Expense Error:", error);
            // 4. ERROR TOAST PARA SA STORAGE FAIL
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to save expense. Please try again.',
            });
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">
            {/* --- HEADER --- */}
            <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <Lucide name="x" size={24} color="#64748b" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-900">Add Expense</Text>
                <TouchableOpacity onPress={handleSaveExpense} className="p-2">
                    <Text className="text-teal-600 font-bold text-lg">Add</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="px-6 pt-8">
                {/* AMOUNT */}
                <View className="items-center mb-10">
                    <Text className="text-slate-400 text-xs font-bold uppercase mb-2">Amount Spent</Text>
                    <View className="flex-row items-center">
                        <Text className="text-4xl font-black text-slate-900 mr-2">₱</Text>
                        <TextInput 
                            placeholder="0.00" 
                            keyboardType="numeric" 
                            value={amount} 
                            onChangeText={setAmount} 
                            className="text-5xl font-black text-slate-900 min-w-[100px]" 
                            autoFocus 
                        />
                    </View>
                </View>

                <SectionLabel label="Description" />
                <DetailInput icon="receipt" placeholder="Description" value={description} onChangeText={setDescription} />

                {/* --- PAYER DROPDOWN --- */}
                <SectionLabel label="Paid By" />
                <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    className="flex-row items-center bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100"
                >
                    <View className="w-8 h-8 bg-teal-600 rounded-full items-center justify-center mr-3">
                        <Text className="text-white font-bold text-xs">{paidBy.name.charAt(0)}</Text>
                    </View>
                    <Text className="flex-1 text-slate-700 font-semibold">{paidBy.name}</Text>
                    <Lucide name="chevron-down" size={20} color="#64748b" />
                </TouchableOpacity>
            </ScrollView>

            {/* --- MODAL FOR DROPDOWN --- */}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-[40px] p-8 pb-12">
                        <View className="flex-row justify-between items-center mb-6">
                            <View>
                                <Text className="text-xl font-black text-slate-900">Who paid?</Text>
                                <Text className="text-slate-400 text-xs">Select the person who covered the bill</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                                className="bg-slate-100 p-2 rounded-full"
                            >
                                <Lucide name="x" size={20} color="#64748b" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} className="max-h-80">
                            <TouchableOpacity
                                onPress={() => {
                                    setPaidBy({ name: 'You', id: 'me' });
                                    setIsModalVisible(false);
                                }}
                                className={`flex-row items-center p-4 rounded-2xl mb-3 border ${paidBy.id === 'me' ? 'bg-teal-50 border-teal-200' : 'bg-slate-50 border-transparent'}`}
                            >
                                <View className="w-12 h-12 rounded-2xl items-center justify-center mr-4">
                                    <Image source={require('../../assets/stickers/sticker6.png')} className="w-10 h-10 rounded-2xl" />
                                </View>
                                <Text className={`flex-1 font-bold text-base ${paidBy.id === 'me' ? 'text-teal-700' : 'text-slate-700'}`}>You</Text>
                                {paidBy.id === 'me' && <Lucide name="check-circle" size={20} color="#0d9488" />}
                            </TouchableOpacity>

                            {groupData.friends.map((friend) => (
                                <TouchableOpacity
                                    key={friend.id}
                                    onPress={() => {
                                        setPaidBy({ name: friend.name, id: friend.id });
                                        setIsModalVisible(false);
                                    }}
                                    className={`flex-row items-center p-4 rounded-2xl mb-3 border ${paidBy.id === friend.id ? 'bg-teal-50 border-teal-200' : 'bg-slate-50 border-transparent'}`}
                                >
                                    <Image
                                        source={friend.sticker}
                                        className="w-12 h-12 rounded-2xl mr-4"
                                    />
                                    <Text className={`flex-1 font-bold text-base ${paidBy.id === friend.id ? 'text-teal-700' : 'text-slate-700'}`}>
                                        {friend.name}
                                    </Text>
                                    {paidBy.id === friend.id && <Lucide name="check-circle" size={20} color="#0d9488" />}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}