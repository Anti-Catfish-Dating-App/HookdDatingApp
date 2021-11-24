import React from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import { StatusBar } from "expo-status-bar"


const Login = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Login</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})


export default Login
