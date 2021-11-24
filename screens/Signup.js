import React from "react"
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native"

const SignUp = () => {
  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text>Please enter your email and password</Text>
      <SafeAreaView style={styles.safe}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Enter your Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Enter your password"
        />
      </SafeAreaView>
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
