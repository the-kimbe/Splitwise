import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

import GroupName from '../../components/expense/GroupName';
import AddFriend from '../../components/expense/AddFriend';
import { DetailRow, DetailInput, SectionLabel } from '../../components/expense/SubComponents';

export default function AddExpense({ navigation }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [friends, setFriends] = useState([]);
    const [goal, setGoal] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');



    const handleSave = () => {
        console.log("Saving expense:", { amount, description });
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-white">
            {/* Fixed Header */}
            <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50 bg-white">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <Lucide name="x" size={24} color="#64748b" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-900">Create Group</Text>
                <TouchableOpacity onPress={handleSave} className="p-2">
                    <Text className="text-teal-600 font-bold text-lg">Save</Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Form */}
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 }}
            >
                <GroupName />


                <AddFriend friends={friends} setFriends={setFriends} />

                <View className="mb-8">
                    <SectionLabel label="Group Details & Budget" />

                    {/* Goal Input */}
                    <DetailInput
                        icon="target"
                        placeholder="Group Goal (e.g. Boracay Fund)"
                        value={goal}
                        onChangeText={setGoal}
                    />

                    {/* NEW: Budget Input */}
                    <DetailInput
                        icon="banknote" // Or use "wallet"
                        placeholder="Total Budget Cap (₱ 0.00)"
                        value={budget}
                        onChangeText={setBudget}
                        keyboardType="numeric" // Lalabas ang number pad sa phone
                    />

                    {/* Location Input */}
                    <DetailInput
                        icon="map-pin"
                        placeholder="Location (e.g. Aklan, Philippines)"
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>


            </ScrollView>
        </View>
    );
}