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
import SignUpHeader from "../components.js/SignUpHeader"

const OtherGender = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const [gender, setGender] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const onSubmit = async (data) => {
    const resStatus = await props.editUser({
      id: props.auth.id,
      gender: data.Gender,
      genderCategory: gender,
    })

    if (resStatus === 200) {
      navigation.navigate("SexualOrientationForm")
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SignUpHeader title="Sign up Info" />

      <View style={styles.container}>
        <Text>Please enter your gender identity</Text>

        <InputForm name="Gender" style={styles.input} control={control} />

        <Text style={styles.innerText}>
          Which gender category would you prefer to be catergorized in?
        </Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          style={styles.picker}
          mode={"dropdown"}
        >
          <Picker.Item label="What is your catergory preference?" />
          <Picker.Item label="Man" value="Man" />
          <Picker.Item label="Woman" value="Woman" />
        </Picker>

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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

const connectedSignUpInfo = connect(mapSignup, mapDispatch)(OtherGender)
export default connectedSignUpInfo
