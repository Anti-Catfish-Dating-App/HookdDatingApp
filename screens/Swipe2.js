import React, { Component } from "react"
import { View, Text } from "react-native"

const Lovers = [
  { id: "1", uri: require("../assets/dope.jpeg") },
  { id: "2", uri: require("../assets/heart.jpeg") },
  { id: "3", uri: require("../assets/manmail.jpeg") },
]

class Swipe2 extends React.Component {
  render() {
    return (
      <View>
        <Text>Hey, there !</Text>
      </View>
    )
  }
}

export default Swipe2
