import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import React, { useState } from 'react' // 1. Import useState
import Lucide from '@react-native-vector-icons/lucide';

export default function Register({ navigation }) {
  // 2. Create the state (default is true because password should be hidden at start)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-8 pt-4 pb-12">
            
            <View className="items-center mb-4">
              <Image
                source={require("../../assets/pictures/logopic1.png")}
                className="w-56 h-56"
                resizeMode="contain"
              />
            </View>

            <View className="mb-8">
              <Text className="text-3xl text-center font-extrabold text-teal-600  tracking-tight">
                Create Account
              </Text>
              <Text className="text-slate-500 text-center mt-1 text-lg leading-6 font-medium">
                Start splitting bills with friends.
              </Text>
            </View>

            <View className="space-y-5 gap-2">
              
              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Full Name</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="user" size={20} color="#64748b" />
                  <TextInput 
                    placeholder="John Doe"
                    className="flex-1 p-4 text-black font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                </View>
              </View>

              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Email Address</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="mail" size={20} color="#64748b" />
                  <TextInput 
                    placeholder="johndoe@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 p-4 text-black font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                </View>
              </View>

              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Password</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="lock" size={20} color="#64748b" />
                  <TextInput 
                    placeholder="••••••••"
                    // 3. Use the state here
                    secureTextEntry={isPasswordHidden}
                    className="flex-1 p-4 text-black font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                  {/* 4. Add the toggle logic to the button */}
                  <TouchableOpacity 
                    onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                    activeOpacity={0.7}
                  >
                    {/* 5. Dynamically change the icon based on the state */}
                    <Lucide 
                      name={isPasswordHidden ? "eye-off" : "eye"} 
                      size={20} 
                      color={isPasswordHidden ? "#64748b" : "#0d9488"} // Changes color when active
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mt-10">
              <TouchableOpacity 
                className="bg-teal-600 flex-row items-center justify-center py-4 rounded-2xl shadow-xl shadow-teal-900/20"
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-lg mr-2">
                  Create Account
                </Text>
                <Lucide name="arrow-right" size={20} color="white" />
              </TouchableOpacity>

              <View className="flex-row justify-center mt-8">
                <Text className="text-slate-500 text-base">Already have an account? </Text>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text className="text-teal-600 font-bold text-base">Log In</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}