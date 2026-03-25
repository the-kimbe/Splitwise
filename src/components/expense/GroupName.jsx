import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Lucide from '../Lucide';
import { SectionLabel } from './SubComponents';

export default function GroupName({ groupName, setGroupName }) {
    return (
        <View className="mb-8">
            <SectionLabel label="Group Name" />
            
            <View className="flex-row items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                {/* Icon Section */}
                <View className=" p-2 rounded-xl ml-1">
                    <Lucide name="users" size={18} color="#64748b" />
                </View>

                {/* TextInput Section */}
                <TextInput
                    className="flex-1 px-2 py-3 text-slate-900 font-semibold text-base"
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