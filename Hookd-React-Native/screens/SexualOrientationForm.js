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

const SexualOrientationForm = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const [orientation, setOrientation] = useState("")
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
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text>What is your sexual orientation?</Text>

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

const connectedSignUpInfo = connect(
  mapSignup,
  mapDispatch
)(SexualOrientationForm)
export default connectedSignUpInfo
