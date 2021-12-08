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
import DismissKeyboard from "../helperFunctions.js/DismissKeyboard"

const Login = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const onSubmit = async (data) => {
    console.log(data)
    const res = await props.submitForm(
      data.Email,
      data.Password,
      data.Name === "null"
    )

    if (res.auth.error) {
      Alert.alert("Wrong password or email")
    }
    console.log("res", res)
  }

  return (
    <DismissKeyboard>
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
              name="Password"
              placeholder="Password"
              type="password"
              control={control}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSignUp}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.buttonTextSignUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DismissKeyboard>
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
  buttonSignUp: {
    backgroundColor: "#f3bae5",
    padding: 10,
    marginTop: 20,
    width: "30%",
  },
  buttonTextSignUp: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
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
