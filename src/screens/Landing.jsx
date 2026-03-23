import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'

export default function Landing({navigation}) {
    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 px-8 justify-between py-12">

                {/* Top Section: Logo & Branding */}
                <View className="items-center ">
                    <View className="p-6 mr-7 rounded-full mb-2">
                        <Image
                            source={require("../assets/pictures/logopic.png")}
                            className="w-96 h-96"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-4xl font-extrabold text-teal-600 tracking-tighter italic">
                        Splitwise
                    </Text>
                    <Text className="text-lg text-slate-500 mt-2 text-center">
                        Less stress when sharing expenses with anyone.
                    </Text>
                </View>

                {/* Middle Section: Value Prop */}
                <View className="space-y-4 ">
                    <View className="flex-row items-center space-x-4">
                        <Text className="text-teal-600 text-xl">✓</Text>
                        <Text className="text-slate-600 text-md">Track shared bills and balances</Text>
                    </View>
                    <View className="flex-row items-center space-x-4">
                        <Text className="text-teal-600 text-xl">✓</Text>
                        <Text className="text-slate-600 text-md">Settle up with friends easily</Text>
                    </View>
                </View>

                {/* Bottom Section: Action Buttons */}
                <View className="w-full space-y-4 gap-2">
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                        className="bg-teal-600 py-4 rounded-2xl shadow-lg shadow-teal-700"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                        className="border-2 border-teal-600 py-4 rounded-2xl"
                        activeOpacity={0.7}
                    >
                        <Text className="text-teal-600 text-center font-bold text-lg">
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}