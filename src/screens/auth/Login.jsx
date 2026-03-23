import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Lucide from '@react-native-vector-icons/lucide';

export default function Login({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-8 pt-10 pb-12">
            
            {/* Logo Section */}
            <View className="items-center mb-6">
              <Image
                source={require("../../assets/pictures/logopic1.png")}
                className="w-56 h-56"
                resizeMode="contain"
              />
            </View>

            {/* Header Section */}
            <View className="mb-10">
              <Text className="text-3xl text-center font-extrabold text-teal-600 tracking-tight">
                Welcome Back
              </Text>
              <Text className="text-slate-500 text-center mt-1 text-lg leading-6 font-medium">
                Sign in to continue splitting bills.
              </Text>
            </View>

            {/* Form Fields */}
            <View className="space-y-5 gap-4">
              
              {/* Email Input */}
              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Email Address</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 focus:border-teal-500">
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

              {/* Password Input */}
              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Password</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="lock" size={20} color="#64748b" />
                  <TextInput 
                    placeholder="••••••••"
                    secureTextEntry={isPasswordHidden}
                    className="flex-1 p-4 text-black font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                  <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                    <Lucide 
                      name={isPasswordHidden ? "eye-off" : "eye"} 
                      size={20} 
                      color={isPasswordHidden ? "#64748b" : "#0d9488"} 
                    />
                  </TouchableOpacity>
                </View>
                
                {/* Forgot Password Link */}
                <TouchableOpacity className="mt-3 items-end">
                  <Text className="text-teal-600 font-semibold">Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <View className="mt-10">
              <TouchableOpacity 
                className="bg-teal-600 flex-row items-center justify-center py-4 rounded-2xl shadow-xl shadow-teal-900/20"
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-lg mr-2">
                  Log In
                </Text>
                <Lucide name="log-in" size={20} color="white" />
              </TouchableOpacity>

              {/* Divider for Social Login (Optional) */}
              <View className="flex-row items-center my-8">
                <View className="flex-1 h-[1px] bg-slate-200" />
                <Text className="mx-4 text-slate-400">or join with</Text>
                <View className="flex-1 h-[1px] bg-slate-200" />
              </View>

              {/* Register Link */}
              <View className="flex-row justify-center">
                <Text className="text-slate-500 text-base">New to Splitwise? </Text>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text className="text-teal-600 font-bold text-base">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}