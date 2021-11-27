import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  Image,
} from "react-native"
import { connect } from "react-redux"
import { Camera } from "expo-camera"
import { useNavigation } from "@react-navigation/native"
import { checkForFace } from "../store/singleUser"

const BaselinePhoto = (props) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [currentPhoto, setPhoto] = useState("")
  let camera = Camera

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      await setHasPermission(status === "granted")
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  if (currentPhoto === "") {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(r) => {
            camera = r
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.takePictureButton}
              onPress={async () => {
                const photo = await camera.takePictureAsync()
                setPhoto(photo)
                console.log(currentPhoto)
              }}
            ></TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  }

  if (currentPhoto.uri.length > 0) {
    console.log(currentPhoto)
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: currentPhoto.uri }} />

        <Button
          title="TAKE A NEW PHOTO"
          onPress={() => {
            setPhoto("")
          }}
        />

        <Button
          title="UPLOAD PHOTO"
          onPress={async () => {
            const form = new FormData()
            form.append("Files", {
              name: "BaselinePhoto.jpg",
              uri: currentPhoto.uri,
              type: "image/jpg",
            })

            props.detectFace(form)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    zIndex: 2,
  },
  takePictureButton: {
    width: 75,
    height: 75,
    backgroundColor: "gray",
    borderRadius: 50,
    alignSelf: "flex-end",
    left: "20%",
    zIndex: 2,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  image: {
    width: "100%",
    height: "90%",
    zIndex: 0,
  },
})

const mapBaselinePhoto = (state) => {
  return {
    auth: state.auth,
  }
}

const dispatchBaselinePhoto = (dispatch) => {
  return {
    detectFace: (imageData) => dispatch(checkForFace(imageData)),
  }
}

const connectedBaselinePhoto = connect(
  mapBaselinePhoto,
  dispatchBaselinePhoto
)(BaselinePhoto)

BaselinePhoto.defaultProps = {
  CloudinaryName: process.env.CLOUDNAME,
  CloudinaryKey: process.env.CLOUDKEY,
  CloudinarySecret: process.env.CLOUDSECRET,
}

export default connectedBaselinePhoto
