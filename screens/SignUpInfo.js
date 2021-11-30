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
import { useNavigation } from "@react-navigation/native"
import { editUser } from "../store/auth"

const SignUpInfo = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const resStatus = await props.editUser({
      id: props.auth.id,
      age: data.Age,
      gender: data.Gender,
      bio: data.Bio,
    })

    if (resStatus === 200) {
      navigation.navigate("UserConsent")
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text>Please enter your information</Text>

      <InputForm name="Age" style={styles.input} control={control} />

      <InputForm name="Gender" style={styles.input} control={control} />

      <InputForm name="Bio" style={styles.input2} control={control} />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
  input2: {
    height: 200,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
})

const mapSignup = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatch = (dispatch) => {
  return {
    editUser: (user) => dispatch(editUser(user)),
  }
}

const connectedSignUpInfo = connect(mapSignup, mapDispatch)(SignUpInfo)
export default connectedSignUpInfo
