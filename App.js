import React from "react"
import { StyleSheet, Text, View } from "react-native"
import StackNavigator from './navigation/StackNavigator'
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from 'react-redux';
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  )
}
