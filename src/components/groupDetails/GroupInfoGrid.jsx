import React from 'react';
import { View, Text } from 'react-native';
import Lucide from '../Lucide';

const InfoBox = ({ icon, label, value }) => (
    <View className="w-[48%] mb-4">
        <View className="flex-row items-center mb-1">
            <Lucide name={icon} size={12} color="#94a3b8" />
            <Text className="text-slate-400 text-[10px] font-bold uppercase ml-1 tracking-tighter">{label}</Text>
        </View>
        <Text className="text-slate-900 font-bold text-xs" numberOfLines={1}>{value}</Text>
    </View>
);

export default function GroupInfoGrid({ groupData }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <View className="bg-white p-6 mb-4 border-y border-slate-100 flex-row flex-wrap justify-between shadow-sm">
            <InfoBox icon="target" label="Goal" value={groupData?.goal || 'No goal set'} />
            <InfoBox icon="calendar" label="Target Date" value={formatDate(groupData?.targetDate)} />
            <InfoBox icon="map-pin" label="Location" value={groupData?.location || 'Not specified'} />
            <InfoBox icon="clock" label="Created" value={formatDate(groupData?.createdAt)} />
        </View>
    );
}