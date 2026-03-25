import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lucide from '../../components/Lucide';
import { AuthContext } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import GroupName from '../../components/expense/GroupName';
import AddFriend from '../../components/expense/AddFriend';
import {
    DetailInput,
    SectionLabel,
    DateInput }
 from '../../components/expense/SubComponents';

export default function CreateGroup({ navigation }) {
    const { user } = useContext(AuthContext);
    const isFocused = useIsFocused();

    const [name, setName] = useState('');
    const [friends, setFriends] = useState([]);
    const [goal, setGoal] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');
    const [targetDate, setTargetDate] = useState(null); 

    // Reset form tuwing papasok sa screen
    useEffect(() => {
        if (isFocused) {
            setName('');
            setFriends([]);
            setGoal('');
            setLocation('');
            setBudget('');
            setTargetDate(null);
        }
    }, [isFocused]);

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert("Wait!", "Please enter a group name.");
            return;
        }

        try {
            const existingGroups = await AsyncStorage.getItem('userGroups');
            let groupsArray = existingGroups ? JSON.parse(existingGroups) : [];

            const newGroup = {
                id: Date.now().toString(),
                ownerEmail: user.email,
                name: name,
                friends: friends,
                goal: goal,
                location: location,
                budget: budget,
                targetDate: targetDate ? targetDate.toISOString() : null, // Save date as ISO string
                createdAt: new Date().toISOString()
            };

            groupsArray.push(newGroup);
            await AsyncStorage.setItem('userGroups', JSON.stringify(groupsArray));

            Alert.alert("Success! 🎉", `Group "${name}" has been created.`, [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
            
        } catch (error) {
            console.log("Error saving group:", error);
            Alert.alert("Error", "Failed to save group.");
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50 bg-white">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <Lucide name="x" size={24} color="#64748b" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-900">Create Group</Text>
                <TouchableOpacity onPress={handleSave} className="p-2">
                    <Text className="text-teal-600 font-bold text-lg">Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                className="flex-1" 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 }}
            >
                <GroupName groupName={name} setGroupName={setName} />
                <AddFriend friends={friends} setFriends={setFriends} />

                <View className="mb-8">
                    <SectionLabel label="Group Details & Budget" />
                    
                    {/* Calendar Input */}
                    <DateInput 
                        icon="calendar" 
                        value={targetDate} 
                        onDateChange={setTargetDate} 
                    />

                    <DetailInput icon="target" placeholder="Group Goal" value={goal} onChangeText={setGoal} />
                    <DetailInput icon="banknote" placeholder="Budget Cap" value={budget} onChangeText={setBudget} keyboardType="numeric" />
                    <DetailInput icon="map-pin" placeholder="Location" value={location} onChangeText={setLocation} />
                </View>
            </ScrollView>
        </View>
    );
}