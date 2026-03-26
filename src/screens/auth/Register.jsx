import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Lucide from '../../components/Lucide';
import Toast from 'react-native-toast-message';

export default function Register({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Ops! Kulang pa.',
        text2: 'Please fill in all fields to continue.',
        position: 'top',
      });
      return;
    }

    try {
      await register(name, email, password);
      
      Toast.show({
        type: 'success',
        text1: 'Welcome to Splitwise! ',
        text2: `Hello, ${name}! Your account is ready.`,
      });

      console.log("Success! The app will auto-redirect now.");
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Something went wrong. Try again later.',
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-8 pt-4 pb-12">

            <View className="items-center mb-4">
              <Image source={require("../../assets/pictures/logopic1.png")} className="w-56 h-56" resizeMode="contain" />
            </View>

            <View className="mb-8">
              <Text className="text-3xl text-center font-extrabold text-teal-600 tracking-tight">Create Account</Text>
              <Text className="text-slate-500 text-center mt-1 text-lg leading-6 font-medium">Start splitting bills with friends.</Text>
            </View>

            <View className="space-y-5 gap-2">
              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Full Name</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="user" size={20} color="#64748b" />
                  <TextInput
                    placeholder="John Doe"
                    value={name}
                    onChangeText={setName}
                    className="flex-1 p-4 text-black font-medium"
                  />
                </View>
              </View>

              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Email Address</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="mail" size={20} color="#64748b" />
                  <TextInput
                    placeholder="johndoe@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 p-4 text-black font-medium"
                  />
                </View>
              </View>

              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Password</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="lock" size={20} color="#64748b" />
                  <TextInput
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={isPasswordHidden}
                    className="flex-1 p-4 text-black font-medium"
                  />
                  <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                    <Lucide name={isPasswordHidden ? "eye-off" : "eye"} size={20} color={isPasswordHidden ? "#64748b" : "#0d9488"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mt-10">
              <TouchableOpacity
                onPress={handleRegister}
                className="bg-teal-600 flex-row items-center justify-center py-4 rounded-2xl shadow-xl shadow-teal-900/20"
              >
                <Text className="text-white font-bold text-lg mr-2">Create Account</Text>
                <Lucide name="arrow-right" size={20} color="white" />
              </TouchableOpacity>

              <View className="flex-row justify-center mt-8">
                <Text className="text-slate-500 text-base">Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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