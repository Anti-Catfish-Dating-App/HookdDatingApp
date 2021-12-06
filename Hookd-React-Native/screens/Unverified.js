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
      <Text>You're unverified.</Text>
      <Text>Please confirm your identity to continue using the app.</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ReverificationForm")
        }}
      >
        <Text> CLICK ME </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
})

const mapUserConsent = (state) => {
  return {
    auth: state.auth,
  }
}

const connectedVerificationForm = connect(mapUserConsent)(Verification)

export default connectedVerificationForm
