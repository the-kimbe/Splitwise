import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';
import Lucide from '../../components/Lucide';

export default function Activity() {
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [activities, setActivities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // --- UPDATED TOP TABS (Settlements Removed) ---
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Expenses', 'Groups'];

  const getExactDate = (item, fallbackDateString) => {
    const idAsNumber = Number(item.id);
    if (!isNaN(idAsNumber) && idAsNumber > 1000000000000) return new Date(idAsNumber);
    if (item.createdAt) return new Date(item.createdAt);
    const d = new Date(fallbackDateString);
    if (!isNaN(d.getTime())) return d;
    return new Date();
  };

  const loadAllActivities = async () => {
    try {
      setRefreshing(true);
      const allGroupsStr = await AsyncStorage.getItem('userGroups');
      if (!allGroupsStr) {
        setActivities([]);
        return;
      }

      const allGroups = JSON.parse(allGroupsStr);
      const myGroups = allGroups.filter(g => g.ownerEmail === user.email);
      let timeline = [];

      for (const group of myGroups) {
        // GROUP CREATED
        timeline.push({
          activityId: `group-${group.id}`,
          type: 'GROUP_CREATED',
          title: `You created "${group.name}"`,
          subtitle: `Initial Budget: ₱${group.budget || '0'}`,
          date: getExactDate(group, null),
          icon: 'plus-circle',
          color: 'bg-teal-500',
        });

        // EXPENSES & PAYMENTS
        const expenseKey = `expenses_${group.id}`;
        const storedExpenses = await AsyncStorage.getItem(expenseKey);
        if (storedExpenses) {
          const expenses = JSON.parse(storedExpenses);
          expenses.forEach(exp => {
            timeline.push({
              activityId: `exp-${exp.id}`,
              type: exp.isPayment ? 'PAYMENT' : 'EXPENSE',
              title: exp.isPayment ? `${exp.paidBy} sent a payment` : `${exp.paidBy} added "${exp.title}"`,
              subtitle: `In ${group.name} • ₱${Math.abs(exp.amount).toFixed(2)}`,
              date: getExactDate(exp, exp.date),
              icon: exp.isPayment ? 'banknote' : 'receipt',
              color: exp.isPayment ? 'bg-orange-500' : 'bg-blue-500',
            });
          });
        }
      }

      timeline.sort((a, b) => b.date.getTime() - a.date.getTime());
      setActivities(timeline);
    } catch (error) {
      console.log("Activity Load Error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) loadAllActivities();
  }, [isFocused]);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const formatDate = (date) => date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  // --- UPDATED FILTERING LOGIC ---
  const filteredActivities = activities.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Expenses' && item.type === 'EXPENSE') return true;
    if (activeTab === 'Groups' && item.type === 'GROUP_CREATED') return true;
    return false;
  });

  return (
    <View className="flex-1 bg-slate-50">
      <Header title="Recent Activity" />

      {/* --- TOP TABS UI --- */}
      <View className="bg-white px-10 pb-4 py-2 shadow-sm z-10 ">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-6 py-2 mt-3 mb-3 mr-2 rounded-full border ${isActive ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-200'}`}
              >
                <Text className={`font-bold text-[11px] uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* --- ACTIVITY LIST --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadAllActivities} tintColor="#0d9488" />}
      >
        {filteredActivities.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Lucide name="history" size={60} color="#cbd5e1" />
            <Text className="text-slate-400 font-bold mt-4 italic">No {activeTab.toLowerCase()} found</Text>
          </View>
        ) : (
          filteredActivities.map((item, index) => (
            <View key={item.activityId} className="flex-row mb-6">
              <View className="items-center mr-4">
                <View className={`p-2 rounded-full ${item.color} z-10 shadow-sm`}>
                  <Lucide name={item.icon} size={16} color="white" />
                </View>
                {index !== filteredActivities.length - 1 && (
                  <View className="w-[2px] flex-1 bg-slate-200 mt-2" />
                )}
              </View>

              <View className="flex-1 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="flex-1 text-slate-900 font-black text-[13px] pr-2">
                    {item.title}
                  </Text>
                  <Text className="text-slate-400 text-[9px] font-bold uppercase">
                    {formatTime(item.date)}
                  </Text>
                </View>

                <Text className="text-slate-500 text-[11px] font-medium mb-3">
                  {item.subtitle}
                </Text>

                <View className="flex-row items-center bg-slate-50 self-start px-2 py-1 rounded-lg">
                  <Lucide name="calendar" size={10} color="#94a3b8" />
                  <Text className="text-slate-400 text-[9px] font-bold ml-1 uppercase">
                    {formatDate(item.date)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}