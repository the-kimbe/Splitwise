import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useContext } from 'react' // Dagdag useContext
import Lucide from '@react-native-vector-icons/lucide';
import { AuthContext } from '../../context/AuthContext'; // Siguraduhin ang path

export default function Login({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  
  // 1. Local states para sa input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Gamitin ang login mula sa context
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      // Automatic na lilipat sa Dashboard dahil sa RootStack logic mo
      console.log("Welcome back!");
    } else {
      Alert.alert("Login Failed", result.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-8 pt-10 pb-12">
            
            <View className="items-center mb-6">
              <Image source={require("../../assets/pictures/logopic1.png")} className="w-56 h-56" resizeMode="contain" />
            </View>

            <View className="mb-10">
              <Text className="text-3xl text-center font-extrabold text-teal-600 tracking-tight">Welcome Back</Text>
              <Text className="text-slate-500 text-center mt-1 text-lg leading-6 font-medium">Sign in to continue splitting bills.</Text>
            </View>

            <View className="space-y-5 gap-4">
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
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={isPasswordHidden}
                    className="flex-1 p-4 text-black font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                  <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                    <Lucide name={isPasswordHidden ? "eye-off" : "eye"} size={20} color={isPasswordHidden ? "#64748b" : "#0d9488"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mt-10">
              <TouchableOpacity 
                onPress={handleLogin} // Eto yung trigger
                className="bg-teal-600 flex-row items-center justify-center py-4 rounded-2xl shadow-xl shadow-teal-900/20"
              >
                <Text className="text-white font-bold text-lg mr-2">Log In</Text>
                <Lucide name="log-in" size={20} color="white" />
              </TouchableOpacity>

              {/* ... Register link footer */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}