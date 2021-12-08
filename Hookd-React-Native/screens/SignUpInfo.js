import React, { useEffect, useLayoutEffect, useState } from "react"
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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { InputForm } from "./Input"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { editUser } from "../store/auth"
import { Picker } from "@react-native-picker/picker"
import Header from "../components.js/Header"
import DismissKeyboard from "../helperFunctions.js/DismissKeyboard"

const SignUpInfo = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const [gender, setGender] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const onSubmit = async (data) => {
    if (gender === "Other") {
      setGender(null)
    }

    const resStatus = await props.editUser({
      id: props.auth.id,
      age: data.Age,
      gender: gender,
      genderCategory: gender,
      bio: data.Bio,
    })

    if (resStatus === 200) {
      if (gender === "Other") {
        navigation.navigate("OtherGender")
      } else {
        navigation.navigate("SexualOrientationForm")
      }
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <DismissKeyboard style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <Header title={"Back"} />

        <KeyboardAvoidingView
          style={styles.KeyboardAvoidingView}
          behavior="padding"
          enabled
          keyboardVerticalOffset={-300}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>About Me</Text>
            <View style={styles.inputContainer}>
              <InputForm name="Age" style={styles.input} control={control} />

              <InputForm name="Bio" style={styles.input2} control={control} />
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                style={styles.picker}
                mode={"dropdown"}
              >
                <Picker.Item label="What is your gender?" />
                <Picker.Item label="Man" value="Man" />
                <Picker.Item label="Woman" value="Woman" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f3bae5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f3bae5",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "45%",
  },
  input2: {
    width: "45%",
  },
  pickerContainer: {
    width: "80%",
    marginBottom: 200,
  },
  picker: {
    width: "100%",
  },
  KeyboardAvoidingView: {
    flex: 1,
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

const connectedSignUpInfo = connect(mapSignup, mapDispatch)(SignUpInfo)
export default connectedSignUpInfo
