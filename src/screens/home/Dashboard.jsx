import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';
import Card from '../../components/dashboard/Card';
import RecentActivity from '../../components/dashboard/RecentActivity';
import Categories from '../../components/dashboard/Categories';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    // --- ITO YUNG MGA NAWAWALA NA STATES ---
    const [recentGroups, setRecentGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totals, setTotals] = useState({ balance: 0, owed: 0, owe: 0 });

    useEffect(() => {
        if (isFocused) {
            loadDashboardData();
        }
    }, [isFocused]);

    const loadDashboardData = async () => {
        try {
            setIsLoading(true);
            const allGroupsStr = await AsyncStorage.getItem('userGroups');
            if (!allGroupsStr) {
                setIsLoading(false);
                return;
            }

            const allGroups = JSON.parse(allGroupsStr);
            const myGroups = allGroups
                .filter(g => g.ownerEmail === user.email)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // 1. I-set ang top 3 groups para sa Recent Activity
            setRecentGroups(myGroups.slice(0, 3));

            // 2. I-compute ang Grand Totals para sa Card
            let grandOwed = 0;
            let grandOwe = 0;

            for (const group of myGroups) {
                const expenseKey = `expenses_${group.id}`;
                const storedExpenses = await AsyncStorage.getItem(expenseKey);
                if (storedExpenses) {
                    const expenses = JSON.parse(storedExpenses);
                    const totalMembers = (group.friends?.length || 0) + 1;

                    expenses.forEach(expense => {
                        if (expense.isPayment) {
                            if (expense.paidBy === 'You') grandOwe -= Math.abs(expense.amount / totalMembers);
                            else grandOwed -= Math.abs(expense.amount / totalMembers);
                        } else {
                            const share = expense.amount / totalMembers;
                            if (expense.paidBy === 'You') grandOwed += (expense.amount - share);
                            else grandOwe += share;
                        }
                    });
                }
            }

            setTotals({
                owed: grandOwed,
                owe: grandOwe,
                balance: grandOwed - grandOwe
            });

        } catch (error) {
            console.log("Dashboard Load Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />
            <Header />

            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
            >
                {/* 1. Summary Card */}
                <Card
                    totalBalance={totals.balance}
                    youAreOwed={totals.owed}
                    youOwe={totals.owe}
                />

                <Categories />

                {/* 2. Recent Activity Header */}
                <View className="flex-row justify-between items-end mb-5 mt-4 px-1">
                    <View>
                        <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-1">Timeline</Text>
                        <Text className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Groups' })}>
                        <Text className="text-teal-600 font-black text-xs uppercase pb-1">See All</Text>
                    </TouchableOpacity>
                </View>

                <RecentActivity
                    recentGroups={recentGroups}
                    isLoading={isLoading}
                    onGroupPress={(group) => {
                        // Dito natin gagamitin ang navigation ng Dashboard
                        navigation.navigate('GroupDetail', { groupData: group });
                    }}
                />

            </ScrollView>
        </View>
    );
}