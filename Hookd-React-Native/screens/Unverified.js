import React, { useEffect, useState } from "react"
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
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"

const Verification = (props) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.unverified}>
        <Text style={styles.title}>You're unverified.</Text>
        <Text style={styles.subTitle}>
          Please confirm your identity to continue using the app.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ReverificationForm")
        }}
      >
        <Text style={styles.buttonText}> CLICK ME </Text>
      </TouchableOpacity>
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
  unverified: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  button: {
    backgroundColor: "#288cd7",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
})

const mapUserConsent = (state) => {
  return {
    auth: state.auth,
  }
}

const connectedVerificationForm = connect(mapUserConsent)(Verification)

export default connectedVerificationForm
