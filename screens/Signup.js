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
import { InputForm } from "./Input"

const SignUp = () => {
  const { control, handleSubmit } = useForm()
  const onSubmit = (data) => Alert.alert(JSON.stringify(data))

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

export default SignUp

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
