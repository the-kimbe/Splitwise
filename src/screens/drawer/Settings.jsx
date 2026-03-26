import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';
import Lucide from '../../components/Lucide';

export default function Settings() {
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Reusable Component para sa bawat Setting Row
  const SettingRow = ({ icon, title, value, type = 'chevron', onPress, color = "#64748b" }) => (
    <TouchableOpacity 
      onPress={onPress}
      disabled={type === 'switch'}
      className="flex-row items-center justify-between py-4 border-b border-slate-50"
    >
      <View className="flex-row items-center">
        <View className="bg-slate-50 p-2 rounded-xl mr-4">
          <Lucide name={icon} size={18} color={color} />
        </View>
        <Text className="text-slate-700 font-bold text-sm">{title}</Text>
      </View>
      
      {type === 'chevron' && <Lucide name="chevron-right" size={16} color="#cbd5e1" />}
      {type === 'switch' && (
        <Switch 
          value={value} 
          onValueChange={onPress}
          trackColor={{ false: "#cbd5e1", true: "#0d9488" }}
          thumbColor="white"
        />
      )}
      {type === 'text' && <Text className="text-slate-400 text-xs font-bold">{value}</Text>}
    </TouchableOpacity>
  );

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Sigurado ka ba? Mabubura lahat ng groups at expenses mo. Hindi ito maibabalik.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete Everything", 
          style: "destructive", 
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert("Success", "Lahat ng data ay nabura na.");
          } 
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Settings" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* --- 1. PROFILE SECTION --- */}
        <View className="p-6 bg-white border-b border-slate-100 mb-6 flex-row items-center shadow-sm">
          <View className="w-16 h-16 bg-teal-600 rounded-3xl items-center justify-center shadow-lg shadow-teal-600/20">
            <Text className="text-white font-black text-2xl">{user?.name?.charAt(0) || 'U'}</Text>
          </View>
          <View className="ml-5 flex-1">
            <Text className="text-slate-900 font-black text-lg leading-6">{user?.name || 'User'}</Text>
            <Text className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{user?.email || 'email@example.com'}</Text>
          </View>
          <TouchableOpacity className="p-2 bg-slate-50 rounded-full border border-slate-100">
            <Lucide name="pencil" size={16} color="#0d9488" />
          </TouchableOpacity>
        </View>

        <View className="px-6">
          
          {/* --- 2. PREFERENCES --- */}
          <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-3 ml-1">App Preferences</Text>
          <View className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm mb-8">
            <SettingRow icon="bell" title="Notifications" type="switch" value={notifications} onPress={() => setNotifications(!notifications)} />
            <SettingRow icon="moon" title="Dark Mode" type="switch" value={darkMode} onPress={() => setDarkMode(!darkMode)} />
            <SettingRow icon="globe" title="Language" type="text" value="English (US)" />
            <SettingRow icon="coins" title="Currency" type="text" value="PHP (₱)" />
          </View>

          {/* --- 3. SECURITY & PRIVACY --- */}
          <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-3 ml-1">Security</Text>
          <View className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm mb-8">
            <SettingRow icon="lock" title="Change Password" />
            <SettingRow icon="shield-check" title="Privacy Policy" />
            <SettingRow icon="help-circle" title="Support Center" />
          </View>

          {/* --- 4. DANGER ZONE --- */}
          <Text className="text-rose-400 text-[10px] font-black uppercase tracking-[2px] mb-3 ml-1">Danger Zone</Text>
          <View className="bg-rose-50 p-4 rounded-[32px] border border-rose-100 shadow-sm mb-10">
            <SettingRow 
              icon="trash-2" 
              title="Clear All App Data" 
              color="#e11d48" 
              onPress={handleClearData} 
            />
          </View>

          <Text className="text-center text-slate-300 text-[9px] font-black uppercase tracking-[2px]">
            Splitwise Mobile • v1.0.1
          </Text>

        </View>
      </ScrollView>
    </View>
  );
}