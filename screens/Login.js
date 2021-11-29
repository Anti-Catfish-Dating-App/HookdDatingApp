import React from "react"
import { useController, useForm } from "react-hook-form"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { InputForm } from "./Input"
import { connect } from "react-redux"
import { authenticate } from "../store"
import { useNavigation } from "@react-navigation/native"

const Login = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const onSubmit = (data) =>
    props.submitForm(data.Email, data.Password, data.Name === "null")

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Login</Text>
      <InputForm name="Email" style={styles.input} control={control} />
      <InputForm name="Password" style={styles.input} control={control} />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
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
    fontWeight: "600",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
})

const mapState = (state) => {
  return {
    name: "login",
    displayName: "Login",
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitForm: (email, password, name, method = "login") =>
      dispatch(authenticate(email, password, name, method)),
  }
}

export default connect(mapState, mapDispatch)(Login)
