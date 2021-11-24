import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View, Text } from "react-native"
import Home from "./screens/Home"
import Matches from "./screens/Matches"
import Login from "./screens/Login"
import Swipe from "./screens/Swipe"

const stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Matches" component={Matches} />
      <stack.Screen name="Swipe" component={Swipe} />
    </stack.Navigator>
  )
}

export default StackNavigator
