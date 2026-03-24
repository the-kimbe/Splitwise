import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { SectionLabel } from './SubComponents';

export default function GroupName({ groupName, setGroupName }) {
    return (
        <View className="mb-8">
            <SectionLabel label="Group Name" />
            
            <View className="flex-row items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                {/* Icon Section */}
                <View className=" p-2 rounded-xl ml-1">
                    <Lucide name="users" size={18} color="bg-slate-600" />
                </View>

                {/* TextInput Section */}
                <TextInput
                    className="flex-1 px-4 py-3 text-slate-900 font-semibold text-base"
                    placeholder="Enter group name (e.g. Boracay Trip)"
                    placeholderTextColor="#94a3b8"
                    value={groupName}
                    onChangeText={setGroupName}
                />
                <Text></Text>
            </View>
        </View>
    );
}