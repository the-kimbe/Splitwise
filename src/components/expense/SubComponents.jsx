import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export const SectionLabel = ({ label }) => (
    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3 ml-1">
        {label}
    </Text>
);

export const DetailInput = ({ icon, placeholder, value, onChangeText, keyboardType = 'default' }) => (
    <View className="flex-row items-center bg-slate-50 px-4 py-1 rounded-2xl mb-3 border border-slate-100">
        <Lucide name={icon} size={20} color="#64748b" />
        <TextInput
            className="ml-3 flex-1 text-slate-700 font-medium py-3"
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType} // Dito papasok ang 'numeric'
        />
    </View>
);