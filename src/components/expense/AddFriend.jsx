import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { SectionLabel } from './SubComponents';

// 1. I-import ang iyong mga Sticker Images
// Palitan mo ito depende sa totoong filenames at path ng images mo
import Sticker1 from '../../assets/stickers/sticker1.png';
import Sticker2 from '../../assets/stickers/sticker2.png';
import Sticker3 from '../../assets/stickers/sticker3.png';
import Sticker4 from '../../assets/stickers/sticker4.png';
import Sticker6 from '../../assets/stickers/sticker6.png';


export default function AddFriend({ friends, setFriends }) {
    const [friendName, setFriendName] = useState('');

    // Default selected sticker ay yung una
    const [selectedSticker, setSelectedSticker] = useState(Sticker1);

    // Listahan ng mga stickers na pwedeng pagpilian
    const stickerOptions = [
        { id: 's1', image: Sticker1 },
        { id: 's2', image: Sticker2 },
        { id: 's3', image: Sticker3 },
        { id: 's4', image: Sticker4 },
    ];

    const addNewFriend = () => {
        if (!friendName.trim()) {
            Alert.alert("Wait!", "Please enter your friend's name first.");
            return;
        }

        const newFriend = {
            id: Date.now(), // Unique ID
            name: friendName,
            sticker: selectedSticker, // I-save ang napiling image source
        };

        setFriends([...friends, newFriend]);
        setFriendName(''); // Clear input after adding
        setSelectedSticker(Sticker1); // Reset to default sticker
    };

    return (
        <View className="mb-8">
            <SectionLabel label="Add People" />

            {/* Input and Add Button */}
            <View className="flex-row items-center gap-3 mb-5">
                <View className="flex-1 flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-1">
                    <Lucide name="user-plus" size={18} color="#94a3b8" />
                    <TextInput
                        placeholder="Friend's Name"
                        value={friendName}
                        onChangeText={setFriendName}
                        className="flex-1 p-3 text-slate-900 font-medium"
                        placeholderTextColor="#cbd5e1"
                    />
                </View>
                <TouchableOpacity
                    onPress={addNewFriend}
                    className="bg-teal-600 p-4 rounded-2xl shadow-sm"
                >
                    <Lucide name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- Sticker Picker UI (Inayos ang laki ng Image) --- */}
            <View className="mb-8 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 ml-1">
                    Pick a Sticker profile
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {stickerOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => setSelectedSticker(option.image)}
                            className={`mr-4 p-1 rounded-full border-2 ${selectedSticker === option.image ? 'border-teal-600 bg-white' : 'border-transparent'}`}
                            activeOpacity={0.8}
                        >
                            {/* INAYOS NA LAKI: Mula h-4 w-4, ginawang h-14 w-14 */}
                            <Image
                                source={option.image}
                                className="w-14 h-14 rounded-full"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View className="flex-row justify-between items-end mb-2">
                <SectionLabel label="With you and:" />

                {/* Count Badge */}
                {friends.length > 0 && (
                    <View className="bg-teal-50 px-3 py-1 rounded-full border border-teal-100 mb-3">
                        <Text className="text-teal-600 text-[10px] font-extrabold uppercase">
                            {friends.length} {friends.length === 1 ? 'Friend' : 'Friends'} Added
                        </Text>
                    </View>
                )}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 15 }} className="flex-row py-2">

                <View className="items-center mr-6">
                    <View className="bg-slate-100 w-16 h-16 rounded-3xl items-center justify-center border-2 border-white shadow-lg shadow-slate-900/10 overflow-hidden">
                        <Image
                            source={Sticker6}
                            className="w-14 h-14 rounded-3xl"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-slate-900 text-[10px] mt-2.5 font-bold px-3 py-1 uppercase">
                        you
                    </Text>
                </View>

                {/* Added Friends with their Stickers */}
                {friends.map((friend) => (
                    <View key={friend.id} className="items-center mr-6">
                        <TouchableOpacity
                            onPress={() => {
                                // Option to remove friend
                                Alert.alert(
                                    "Remove Friend",
                                    `Are you sure you want to remove ${friend.name}?`,
                                    [
                                        { text: "Cancel", style: "cancel" },
                                        {
                                            text: "Remove", style: "destructive", onPress: () => {
                                                setFriends(friends.filter(f => f.id !== friend.id));
                                            }
                                        }
                                    ]
                                );
                            }}
                            className="bg-white w-16 h-16 rounded-3xl items-center justify-center border-2 border-white shadow-lg shadow-slate-900/10"
                            activeOpacity={0.8}
                        >
                            {/* GUMAGANA NA LAKI: w-full h-full ng w-16 h-16 box */}
                            <Image
                                source={friend.sticker} // tinanggal ang fallback UserPlaceholder para malinis
                                className="w-full h-full rounded-3xl"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text className="text-slate-600 text-[10px] mt-2.5 font-medium">{friend.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}