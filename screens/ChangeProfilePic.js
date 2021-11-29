import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { _editProfilePic } from "../store/singleUser"

const ChangeProfilePic = (props) => {
  const [profilePicture, setImage] = useState(props.user.profilePicture)

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

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  handleSubmit = () => {
    const form = new FormData()
    form.append("file", {
      name: `${props.user.id}`,
      uri: profilePicture,
      type: "image/jpg",
    })
    props.editProfilePic(form, props.user.id)
    props.navigation.navigate("Home")
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: profilePicture || user.profilePicture,
          }}
        />
        <Text style={styles.changeProfilePicture}>Change Profile Picture</Text>
      </TouchableOpacity>
      <Button title="Submit" onPress={handleSubmit} />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
})
