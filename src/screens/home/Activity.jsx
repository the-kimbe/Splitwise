import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'

export default function Activity() {
  return (
    <View className="flex-1 bg-slate-50">
      <Header />
      <Text>Activity</Text>
    </View>
  )
}