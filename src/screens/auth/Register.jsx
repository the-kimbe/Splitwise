import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useContext } from 'react' // Added useContext
import { AuthContext } from '../../context/AuthContext'; // Import your context
import Lucide from '../../components/Lucide';

export default function Register({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // 1. Create states for the inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Access register function from context
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Kapag tinawag ito, mag-se-setUser ang Context.
    // Dahil sa RootStack logic, automatic na mag-re-render ang app 
    // at itatago ang Register screen para ipakita ang Dashboard.
    await register(name, email, password);

    // HUWAG NA MAG-NAVIGATION.NAVIGATE DITO
    console.log("Success! The app will auto-redirect now.");
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
              {/* Name Input */}
              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Full Name</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="user" size={20} color="#64748b" />
                  <TextInput
                    placeholder="John Doe"
                    value={name}
                    onChangeText={setName} // Update state
                    className="flex-1 p-4 text-black font-medium"
                  />
                </View>
              </View>

              {/* Email Input */}
              <View>
                <Text className="text-slate-800 font-bold mb-2 ml-1">Email Address</Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                  <Lucide name="mail" size={20} color="#64748b" />
                  <TextInput
                    placeholder="johndoe@example.com"
                    value={email}
                    onChangeText={setEmail} // Update state
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 p-4 text-black font-medium"
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
                    value={password}
                    onChangeText={setPassword} // Update state
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
                onPress={handleRegister} // Call registration
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