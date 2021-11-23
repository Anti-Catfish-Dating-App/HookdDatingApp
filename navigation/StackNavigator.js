import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View, Text } from "react-native"
import Home from "./screens/Home"
import Matches from "./screens/Matches"

const stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Matches" component={Matches} />
    </stack.Navigator>
  )
}

export default StackNavigator
