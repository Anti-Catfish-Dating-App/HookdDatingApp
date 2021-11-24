import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./screens/Home"
import Matches from "./screens/Matches"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Screen name="Home" component={Home} options={{ title: "Hookd" }} />
      <Stack.Screen name="Matches" component={Matches} />
    </NavigationContainer>
  )
}
