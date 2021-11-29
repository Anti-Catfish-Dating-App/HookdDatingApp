import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { connect } from "react-redux"
import { View, Text } from "react-native"
import Home from "../screens/Home"
import Matches from "../screens/Matches"
import Signup from "../screens/Signup"
import Login from "../screens/Login"
import UserConsent from "../screens/UserConsent"
import BaselinePhoto from "../screens/BaselinePhoto"
import Swipe from "../screens/Swipe"
import Settings from "../screens/Settings"

const stack = createNativeStackNavigator()

const StackNavigator = (props) => {
  const user = props.isLoggedIn
  return (
    <stack.Navigator>
      {user ? (
        <>
          <stack.Group>
            <stack.Screen name="Home" component={Home} />
            <stack.Screen name="Matches" component={Matches} />
            <stack.Screen name="Swipe" component={Swipe} />
          </stack.Group>
          <stack.Group screenOptions={{ presentation: "modal" }}>
            <stack.Screen name="Settings" component={Settings} />
          </stack.Group>
        </>
      ) : (
        <>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
          <stack.Screen name="UserConsent" component={UserConsent} />
          <stack.Screen name="BaselinePhoto" component={BaselinePhoto} />
        </>
      )}
    </stack.Navigator>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  }
}

export default connect(mapState)(StackNavigator)
