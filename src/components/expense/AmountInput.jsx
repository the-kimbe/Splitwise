import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function AmountInput({ amount, setAmount, description, setDescription }) {
    return (
        <View className="items-center mb-10">
            <View className="flex-row items-center mb-2">
                <Text className="text-4xl font-bold text-teal-600 mr-2">₱</Text>
                <TextInput
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    className="text-5xl font-extrabold text-slate-900"
                    placeholderTextColor="#cbd5e1"
                />
            </View>
            <TextInput
                placeholder="What was this for?"
                value={description}
                onChangeText={setDescription}
                className="text-lg text-slate-500 font-medium text-center w-full"
                placeholderTextColor="#94a3b8"
            />
        </View>
    );
}