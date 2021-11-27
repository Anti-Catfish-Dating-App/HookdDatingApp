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

const Signup = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const resStatus = await props.submitForm(data.Email, data.Password)

    if (resStatus === 200) {
      navigation.navigate("UserConsent")
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text>Please enter your email and password</Text>
      <InputForm name="Email" style={styles.input} control={control} />

      <InputForm name="Password" style={styles.input} control={control} />

      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
})

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
    auth: state.auth,
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    submitForm: (userEmail, password, method = "signup") =>
      dispatch(authenticate(userEmail, password, method, history)),
  }
}

const connectedSignup = connect(mapSignup, mapDispatch)(Signup)
export default connectedSignup
