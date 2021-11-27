import React, { useEffect, useState } from "react"
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

const UserConsent = (props) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>User Consent</Text>
        <Text style={styles.paragraph}>
          By agreeing, you consent to have your face data stored to be compared
          with photos in the future. Your baseline photo will not be stored in
          any database, but your facial data will be stored with Microsoft Face
          API.
        </Text>

        {/* <Text style={styles.paragraph}>
          Hookd will not use your information to sell to any third party. You
          may not use use Hookd to technoloy to develop software, design,
          develop, without Hookd's prior consent. You shall not, nor allow any
          other person to copy, reverse engineer, decopmpile, or dissamble this
          software.
        </Text> */}

        <Text style={styles.paragraph}>
          When you are taking your photo please face forward into the camera and
          make sure you have good lighting for the AI to see your facial
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    top: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
})

const mapUserConsent = (state) => {
  return {
    auth: state.auth,
  }
}

const connectedConsentForm = connect(mapUserConsent)(UserConsent)

export default connectedConsentForm
