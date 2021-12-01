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

const SignUpInfo = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const [gender, setGender] = useState("")
  const onSubmit = async (data) => {
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
        navigation.navigate("UserConsent")
      }
    } else {
      Alert.alert("Error!")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text>Please enter your information</Text>

      <InputForm name="Age" style={styles.input} control={control} />

      <InputForm name="Bio" style={styles.input2} control={control} />

      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={styles.picker}
        mode={"dropdown"}
        numberOfLines={"1"}
      >
        <Picker.Item label="Man" value="Man" />
        <Picker.Item label="Woman" value="Woman" />
        <Picker.Item label="Other" value="Other" />
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
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
  input2: {
    height: 200,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
  picker: {
    width: 250,
    borderWidth: 2,
    padding: 10,
    margin: 12,
    overflow: "hidden",
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
