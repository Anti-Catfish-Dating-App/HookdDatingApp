import React, { useLayoutEffect } from "react"
import { useController, useForm } from "react-hook-form"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { InputForm } from "./Input"
import { connect } from "react-redux"
import { authenticate } from "../store"
import { useNavigation } from "@react-navigation/native"

const Login = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const onSubmit = (data) =>
    props.submitForm(data.Email, data.Password, data.Name === "null")

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../hookd-logos_transparent.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <InputForm
            control={control}
            name="Email"
            placeholder="Email"
            type="email-address"
          />
          <InputForm
            control={control}
            name="Password"
            placeholder="Password"
            type="password"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#288cd7",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 0.6,
    width: "100%",
    height: "100%",
    backgroundColor: "#288cd7",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#288cd7",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
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
