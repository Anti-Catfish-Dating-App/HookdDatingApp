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
  const [profilePicture, setImage] = useState(props.user.profilePicture)
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
