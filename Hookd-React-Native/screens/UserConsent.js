import React, { useEffect, useState, useLayoutEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
} from "react-native"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import Header from "../components.js/Header"

const UserConsent = (props) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Header title="User Consent" />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>User Consent</Text>
          <Text style={styles.paragraph}>
            By agreeing, you consent to have your face data stored to be
            compared with photos in the future. Your baseline photo will not be
            stored in any database, but your facial data will be stored with
            Microsoft Face API.
          </Text>

          {/* <Text style={styles.paragraph}>
          Hookd will not use your information to sell to any third party. You
          may not use use Hookd to technoloy to develop software, design,
          develop, without Hookd's prior consent. You shall not, nor allow any
          other person to copy, reverse engineer, decopmpile, or dissamble this
          software.
        </Text> */}

          <Text style={styles.paragraph2}>
            When you are taking your photo please face forward into the camera
            and make sure you have good lighting for the AI to see your facial
            features.
          </Text>
          <Button
            title="I agree"
            onPress={() => {
              navigation.navigate("BaselinePhoto")
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    alignContent: "center",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 20,
    padding: 10,
  },
  paragraph2: {
    alignContent: "center",
    textAlign: "center",
    color: "red",
    fontSize: 15,
    marginBottom: 20,
    padding: 10,
  },
})

const mapUserConsent = (state) => {
  return {
    auth: state.auth,
  }
}

const connectedConsentForm = connect(mapUserConsent)(UserConsent)

export default connectedConsentForm
