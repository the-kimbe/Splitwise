import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'

export default function History() {
  return (
    <View className="flex-1 bg-slate-50">
      <Header />
      <Text>History</Text>
    </View>
  )
}