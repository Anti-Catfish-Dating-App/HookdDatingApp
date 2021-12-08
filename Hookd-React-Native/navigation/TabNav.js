import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "react-native-elements"
import { Ionicons } from "@expo/vector-icons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { connect } from "react-redux"
import { getMatches } from "../store/matches"
import Home from "../screens/Home"
import Matches from "../screens/Matches"

const TabIcon = (props) => (
  <Ionicons
    name={"md-home"}
    size={30}
    color={props.focused ? "grey" : "darkgrey"}
  />
)

const Tab = createBottomTabNavigator()

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline"
          } else if (route.name === "Matches") {
            props.getMatches();
            iconName = focused ? "ios-heart-sharp" : "ios-heart-outline"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={"black"} />
        },
        tabBarActiveTintColor: "#58ceb2",
        tabBarInactiveTintColor: "gray",
        //Tab bar styles can be added here
        tabBarStyle: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: "white",
          position: "absolute",
          height: 70,
        },
        tabBarLabelStyle: { paddingBottom: 6 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Matches" component={Matches} />
    </Tab.Navigator>
  )
}

const mapDispatch = (dispatch) => {
  return {
    getMatches: () => dispatch(getMatches()),
  }
}

export default connect(null, mapDispatch)(TabNavigator)
