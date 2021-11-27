import React, { useEffect, useState } from "react"
import { useController, useForm } from "react-hook-form"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native"
import { InputForm } from "./Input"
import { connect } from "react-redux"
import { authenticate } from "../store"
import { useNavigation } from "@react-navigation/native"

const Lovers = [
  { id: "1", uri: require("../assets/dope.jpeg") },
  { id: "2", uri: require("../assets/heart.jpeg") },
  { id: "3", uri: require("../assets/manmail.jpeg") },
]

export default function Swipe(props) {
  const navigation = useNavigation()

  return (
    <View>
      <Text>Swiper</Text>
    </View>
  )
}
