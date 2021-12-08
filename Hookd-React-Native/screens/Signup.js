import React, { useEffect, useLayoutEffect, useState } from "react"
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
import DismissKeyboard from "../helperFunctions.js/DismissKeyboard"
import { KeyboardAvoidingView } from "react-native"

const Signup = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const onSubmit = async (data) => {
    const resStatus = await props.submitForm(
      data.Email,
      data.Password,
      data.Name
    )

    console.log(resStatus)

    if (resStatus === 200) {
      navigation.navigate("SignUpInfo")
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <Text>Please enter your email and password</Text>
          <InputForm name="Name" style={styles.input} control={control} />

          <InputForm name="Email" style={styles.input} control={control} />

          <InputForm
            name="Password"
            secureTextEntry={true}
            style={styles.input}
            control={control}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3bae5",
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
  button: {
    backgroundColor: "#288cd7",
    padding: 10,
    marginTop: 20,
    width: "30%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
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
    submitForm: (userEmail, password, name, method = "signup") =>
      dispatch(authenticate(userEmail, password, name, method, history)),
  }
}

const connectedSignup = connect(mapSignup, mapDispatch)(Signup)
export default connectedSignup
