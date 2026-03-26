import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Header from '../../components/Header';
import Lucide from '../../components/Lucide';

export default function About() {
  const version = "1.0.1";
  const developerName = "Khennedy Mamba"; // Branding mo ito!

  // Reusable Component para sa Feature Rows
  const FeatureItem = ({ icon, title, desc }) => (
    <View className="flex-row items-start mb-6">
      <View className="bg-teal-50 p-3 rounded-2xl mr-4">
        <Lucide name={icon} size={20} color="#0d9488" />
      </View>
      <View className="flex-1">
        <Text className="text-slate-900 font-black text-sm uppercase tracking-tight">{title}</Text>
        <Text className="text-slate-500 text-[11px] leading-4 mt-1">{desc}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="About" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* --- 1. APP LOGO & VERSION --- */}
        <View className="items-center py-10 bg-white border-b border-slate-100 shadow-sm">
          <View className="w-28 h-28 bg-white rounded-[35px] items-center justify-center shadow-xl shadow-teal-600/30 overflow-hidden mb-4">
            <Image 
              source={require('../../assets/pictures/brand.png')} 
              className="w-32 h-32"
              resizeMode="contain"
            />
          </View>
          <Text className="text-2xl font-black text-slate-900 tracking-tighter">Splitwise</Text>
          <View className="bg-slate-100 px-3 py-1 rounded-full mt-2">
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Version {version}</Text>
          </View>
        </View>

        <View className="px-6 mt-8">
          
          {/* --- 2. THE MISSION --- */}
          <View className="mb-10">
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-3 ml-1">Our Mission</Text>
            <View className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <Text className="text-slate-600 leading-6 font-medium text-[13px]">
                Splitwise is designed to take the stress out of shared expenses. Whether it's a dinner with friends, house rent, or travel bills, we help you track who owes who and settle debts with just a few taps.
              </Text>
            </View>
          </View>

          {/* --- 3. KEY FEATURES --- */}
          <View className="mb-10">
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-5 ml-1">Key Features</Text>
            <FeatureItem 
              icon="users" 
              title="Group Tracking" 
              desc="Organize expenses by trips, households, or events with ease." 
            />
            <FeatureItem 
              icon="split" 
              title="Smart Splitting" 
              desc="Automatically calculate fair shares for everyone in the group." 
            />
            <FeatureItem 
              icon="shield-check" 
              title="Secure Records" 
              desc="Your data is stored locally and securely for quick access." 
            />
          </View>

          {/* --- 4. DEVELOPER CARD --- */}
          <View className="mb-10">
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-3 ml-1">Meet the Developer</Text>
            <View className="bg-teal-600 p-6 rounded-[32px] flex-row items-center shadow-lg shadow-teal-600/20">
              <View className="w-16 h-16 bg-white/20 rounded-2xl items-center justify-center border border-white/30">
                <Lucide name="code-2" size={28} color="white" />
              </View>
              <View className="ml-5 flex-1">
                <Text className="text-white font-black text-lg leading-6">{developerName}</Text>
                <Text className="text-teal-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Lead Developer & Designer</Text>
              </View>
            </View>
          </View>

          {/* --- 5. SOCIALS / CONTACT --- */}
          <View className="flex-row justify-center space-x-4 mb-10">
            <TouchableOpacity className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Lucide name="circle-fading-plus" size={20} color="#334155" />
            </TouchableOpacity>
            <TouchableOpacity className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Lucide name="mail" size={20} color="#334155" />
            </TouchableOpacity>
            <TouchableOpacity className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Lucide name="globe" size={20} color="#334155" />
            </TouchableOpacity>
          </View>

          {/* --- FOOTER --- */}
          <Text className="text-center text-slate-300 text-[9px] font-bold uppercase tracking-widest">
            © 2026 Splitwise App • 
          </Text>

        </View>
      </ScrollView>
    </View>
  );
}