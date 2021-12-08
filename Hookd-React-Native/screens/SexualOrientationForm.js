import React, { useEffect, useState, useLayoutEffect } from "react"
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
import { Picker } from "@react-native-picker/picker"
import Header from "../components.js/Header"

const SexualOrientationForm = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const [orientation, setOrientation] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const onSubmit = async () => {
    const resStatus = await props.editUser({
      id: props.auth.id,
      sexualOrientation: orientation,
    })

    if (resStatus === 200) {
      navigation.navigate("UserConsent")
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Sexual Orientation" />
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={orientation}
            onValueChange={(itemValue, itemIndex) => setOrientation(itemValue)}
            style={styles.picker}
            mode={"dropdown"}
          >
            <Picker.Item label="What is your sexual orientation?" />
            <Picker.Item label="Straight" value="Straight" />
            <Picker.Item label="Gay" value="Gay" />
            <Picker.Item label="Bisexual" value="Bisexual" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f3bae5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
  },
  picker: {
    width: "100%",
  },
  button: {
    backgroundColor: "#288cd7",
    padding: 10,
    marginTop: 20,
    width: "30%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
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

const connectedSignUpInfo = connect(
  mapSignup,
  mapDispatch
)(SexualOrientationForm)
export default connectedSignUpInfo
