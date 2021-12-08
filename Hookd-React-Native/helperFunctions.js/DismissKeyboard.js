import React from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { View, Text } from "react-native"

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default DismissKeyboard
