import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Switch, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Lucide from '../../components/Lucide';
import Header from '../../components/Header';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);
  const isFocused = useIsFocused();

  // ISANG STATE PARA SA LAHAT NG COMPUTATION
  const [stats, setStats] = useState({
    groups: 0,
    balance: 0,
    debt: 0
  });

  // MAIN FUNCTION PARA SA LAHAT NG STATS
  const loadProfileStats = async () => {
    try {
      const allGroupsStr = await AsyncStorage.getItem('userGroups');
      if (!allGroupsStr) return;

      const allGroups = JSON.parse(allGroupsStr);
      const myGroups = allGroups.filter(g => g.ownerEmail === user.email);

      let grandOwed = 0;
      let grandOwe = 0;

      for (const group of myGroups) {
        const expenseKey = `expenses_${group.id}`;
        const storedExpenses = await AsyncStorage.getItem(expenseKey);

        if (storedExpenses) {
          const expenses = JSON.parse(storedExpenses);
          const totalMembers = (group.friends?.length || 0) + 1;

          expenses.forEach(expense => {
            // ETO DAPAT ANG EKSAKTONG LOGIC NA NASA DASHBOARD MO:
            if (expense.isPayment) {
              if (expense.paidBy === 'You') {
                grandOwe -= Math.abs(expense.amount / totalMembers);
              } else {
                grandOwed -= Math.abs(expense.amount / totalMembers);
              }
            } else {
              const share = expense.amount / totalMembers;
              if (expense.paidBy === 'You') {
                grandOwed += (expense.amount - share);
              } else {
                grandOwe += share;
              }
            }
          });
        }
      }

      setStats({
        groups: myGroups.length,
        balance: grandOwed - grandOwe, // totalBalance sa Dashboard
        debt: grandOwe                // youOwe sa Dashboard
      });

    } catch (error) {
      console.log("Error loading profile stats:", error);
    }
  };
  // RE-FETCH DATA TUWING SISILIP SA PROFILE
  useEffect(() => {
    if (isFocused) {
      loadProfileStats();
    }
  }, [isFocused]);

  // MENU OPTION COMPONENT
  const MenuOption = ({ icon, title, subtitle, color, onPress, isLast = false, hasSwitch = false }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center p-4 ${!isLast ? 'border-b border-slate-50' : ''}`}
    >
      <View className={`p-3 rounded-2xl mr-4 ${color}`}>
        <Lucide name={icon} size={20} color="white" />
      </View>
      <View className="flex-1">
        <Text className="text-slate-900 font-bold text-sm">{title}</Text>
        {subtitle && <Text className="text-slate-400 text-[10px] font-medium uppercase tracking-tighter">{subtitle}</Text>}
      </View>
      {hasSwitch ? (
        <Switch
          trackColor={{ false: "#cbd5e1", true: "#0d9488" }}
          thumbColor="white"
          value={true}
        />
      ) : (
        <Lucide name="chevron-right" size={16} color="#cbd5e1" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <Header title="My Profile" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 1. USER PROFILE CARD */}
        <View className="items-center py-6">
          <View className="w-32 h-32 rounded-[40px] items-center justify-center border-4 border-white shadow-sm overflow-hidden bg-white">
            <Image
              source={require('../../assets/stickers/sticker6.png')}
              className="w-24 h-24 rounded-full"
            />
          </View>
          <Text className="text-2xl font-black text-slate-900 mt-4 tracking-tight">
            {user?.name || 'User'}
          </Text>
          <Text className="text-slate-400 font-bold text-xs tracking-widest">
            {user?.email || 'No email provided'}
          </Text>
        </View>

     

        {/* 3. SETTINGS GROUPS */}
        <View className="px-6 mt-5">
          <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">Account Settings</Text>
          <View className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-8">
            <MenuOption
              icon="user-cog"
              title="Edit Profile"
              subtitle="Change name & display photo"
              color="bg-teal-500"
            />
            <MenuOption
              icon="bell"
              title="Notifications"
              subtitle="Bill reminders & group alerts"
              color="bg-orange-500"
              hasSwitch={true}
            />
            <MenuOption
              icon="shield-check"
              title="Privacy & Security"
              subtitle="App lock & data storage"
              color="bg-blue-500"
              isLast={true}
            />
          </View>

          <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">Support & More</Text>
          <View className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-8">
            <MenuOption
              icon="help-circle"
              title="Help Center"
              color="bg-slate-400"
            />
            <MenuOption
              icon="star"
              title="Rate the App"
              color="bg-yellow-500"
            />

          </View>
        </View>

        {/* VERSION TAG */}
        <View className="items-center mt-4">
          <Text className="text-slate-300 text-[10px] font-black uppercase tracking-widest">
            Splitwise Version 0.0.1
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}