import React from "react"
import { NavigationContainer } from "@react-navigation/native"

import Home from "./screens/Home"
import Matches from "./screens/Matches"
import Swipe2 from "./screens/Swipe2"
import StackNavigator from "./StackNavigator"

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}
