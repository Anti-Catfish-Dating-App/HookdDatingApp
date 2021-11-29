import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native"
import { connect } from "react-redux"
import { editUser } from "../store/auth"

const Settings = (props) => {
  const [profilePicture, setImage] = useState("")
  const [age, setAge] = useState("")
  const [bio, setBio] = useState("")

  const { user } = props

  const incompleteProfile = () => {
    if (profilePicture === "" || age === "" || bio === "") {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = () => {
    props.editUser({
      id: user.id,
      profilePicture,
      age,
      bio,
    })
    props.navigation.navigate("Home")
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Text style={styles.title}>Hello, {user.name}</Text>

        <Text style={styles.steps}>Step 1: Profile Picture</Text>
        <TextInput
          value={profilePicture}
          onChangeText={(text) => setImage(text)}
          style={styles.input}
          placeholder="Enter your image"
        />

        <Text style={styles.steps}>Step 2: Age</Text>
        <TextInput
          value={age}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          maxLength={2}
        />

        <Text style={styles.steps}>Step 3: Bio</Text>
        <TextInput
          value={bio}
          onChangeText={(text) => setBio(text)}
          style={styles.input}
          placeholder="Tell me a little bit about yourself..."
          multiline={true}
          maxLength={250}
        />

        <TouchableOpacity
          disabled={incompleteProfile()}
          style={incompleteProfile() ? styles.disabled : styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const mapState = (state) => {
  return {
    user: state.auth,
  }
}

const mapDispatch = (dispatch) => {
  return {
    editUser: (user) => dispatch(editUser(user)),
  }
}

export default connect(mapState, mapDispatch)(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
    color: "#8cdbd3",
    padding: 20,
  },
  steps: {
    fontSize: 20,
    color: "#f25da4",
    padding: 10,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#8cdbd3",
    padding: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  disabled: {
    backgroundColor: "grey",
    padding: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
})
