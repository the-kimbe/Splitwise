import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Lucide from '../../components/Lucide'; // Gamitin yung ginawa nating helper

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
            keyboardType={keyboardType}
        />
    </View>
);

export const DateInput = ({ icon, value, onDateChange }) => {
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios'); 
        if (selectedDate) onDateChange(selectedDate);
    };

    const formatDate = (date) => {
        if (!date) return "Select Target Date";
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShow(true)} className="flex-row items-center bg-slate-50 px-4 py-4 rounded-2xl mb-3 border border-slate-100">
                <Lucide name={icon} size={20} color="#64748b" />
                <Text className={`ml-3 flex-1 font-medium ${value ? 'text-slate-700' : 'text-slate-400'}`}>
                    {formatDate(value)}
                </Text>
            </TouchableOpacity>
            {show && <DateTimePicker value={value || new Date()} mode="date" display="default" onChange={onChange} />}
        </View>
    );
};