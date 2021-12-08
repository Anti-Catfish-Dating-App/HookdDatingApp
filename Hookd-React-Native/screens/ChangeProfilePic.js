import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Platform,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { _editProfilePic } from "../store/singleUser"
import { useNavigation } from "@react-navigation/native"
import Loading from "./Loadings"

const ChangeProfilePic = (props) => {
  const navigation = useNavigation()
  const [profilePicture, setImage] = useState(null)
  const [loadingStatus, setLoading] = useState(false)
  const { user } = props

  useEffect(() => {
    setImage(props.user.profilePicture)
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const handleSubmit = async () => {
    const form = new FormData()
    form.append("file", {
      name: `${props.user.id}`,
      uri: profilePicture,
      type: "image/jpg",
    })
    setLoading(true)
    const res = await props.editProfilePic(form, props.user.id)
    setLoading(false)
    if (res === 200) {
      navigation.navigate("Settings")
      Alert.alert("Photo Similarity Accepted")
    }
    if (res === 444) {
      Alert.alert("Face not found")
    }
    if (res === undefined) {
      Alert.alert("No similarity found")
    }
  }

  if (loadingStatus === true) {
    return <Loading />
  }

  const uploadPic = require("../upload.png")

  return (
    <View style={styles.mainContainer}>
      {!props.user.profilePicture ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            Please upload a photo of yourself to get started!
          </Text>
          <TouchableOpacity onPress={pickImage}>
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={{ width: 300, height: 300 }}
              />
            ) : (
              <Image source={uploadPic} style={{ width: 200, height: 200 }} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: profilePicture || user.profilePicture,
              }}
            />
            <Text style={styles.changeProfilePicture}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProfilePic: (imageForm, id) => dispatch(_editProfilePic(imageForm, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfilePic)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 400,
    height: 400,
    borderWidth: 1,
    borderColor: "black",
  },
  uploadPhotoText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
    padding: 140,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  button: {
    marginTop: 20,
  },
  profilePicture: {
    width: 400,
    height: 400,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
  changeProfilePicture: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
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
