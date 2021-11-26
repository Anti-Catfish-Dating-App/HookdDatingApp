import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View, Text } from "react-native"
import Home from "../screens/Home"
import Matches from "../screens/Matches"
import Signup from "../screens/Signup"
import Login from "../screens/Login"

const stack = createNativeStackNavigator()

const StackNavigator = () => {
  const user = false
  return (
    <stack.Navigator>
      {user ? (
        <>
          <stack.Screen name="Home" component={Home} />
          <stack.Screen name="Matches" component={Matches} />
        </>
      ) : (
        <>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </stack.Navigator>
  )
}

export default StackNavigator
