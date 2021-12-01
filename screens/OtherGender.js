import React, { useEffect, useState } from "react"
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
import { AutoFocus } from "expo-camera/build/Camera.types"

const OtherGender = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const [gender, setGender] = useState("")
  const onSubmit = async (data) => {
    const resStatus = await props.editUser({
      id: props.auth.id,
      gender: data.Gender,
      genderCategory: gender,
    })

    if (resStatus === 200) {
      navigation.navigate("UserConsent")
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        numberOfLines={"1"}
      >
        <Picker.Item label="Man" value="Man" />
        <Picker.Item label="Woman" value="Woman" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  innerText: {
    width: 250,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    marginBottom: 200,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
  pickerContainer: {
    width: 400,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: 250,
    borderWidth: 2,
    position: "relative",
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
