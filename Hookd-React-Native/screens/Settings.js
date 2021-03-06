import React, { useState, useEffect, useLayoutEffect } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Button,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import { connect } from "react-redux"
import { editUser } from "../store/auth"
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from "@react-navigation/native"
import { logout } from "../store"

const Settings = (props) => {
  const [age, setAge] = useState(props.user.age)
  const [bio, setBio] = useState(props.user.bio)

  const navigation = useNavigation()
  const { user } = props

  const handleSubmit = () => {
    props.editUser({
      id: user.id,
      age,
      bio,
    })
    navigation.popToTop()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.profilePictureContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangeProfilePic")}
            >
              <Image
                style={styles.profilePicture}
                source={{
                  uri: props.user.profilePicture,
                }}
              />
              <Text style={styles.changeProfilePicture}>
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputBioLabel}>Bio</Text>
            <TextInput
              style={styles.inputBio}
              // placeholder={user.bio}
              onChangeText={(text) => setBio(text)}
              value={bio}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              // disabled={incompleteProfile()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={() => props.logout()}
              // disabled={incompleteProfile()}
            >
              <Text style={styles.buttonTextLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    logout: () => dispatch(logout()),
  }
}

export default connect(mapState, mapDispatch)(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profilePictureContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  changeProfilePicture: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#288cd7",
    textAlign: "center",
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputAgeLabel: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#288cd7",
    textAlign: "center",
  },
  inputBioLabel: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#288cd7",
    textAlign: "center",
    marginTop: 20,
  },
  inputAge: {
    textAlign: "center",
    padding: 5,
    margin: 5,
    width: 200,
    color: "#f25da4",
    fontSize: 20,
  },
  inputBio: {
    textAlign: "center",
    padding: 5,
    margin: 5,
    width: 200,
    color: "#f25da4",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#288cd7",
    padding: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  buttonLogout: {
    backgroundColor: "#f45ca5",
    padding: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonTextLogout: {
    fontSize: 20,
    color: "white",
  },
})
