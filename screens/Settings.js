import React, { useState, useEffect } from "react"
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
} from "react-native"
import { connect } from "react-redux"
import { editUser } from "../store/auth"
import * as ImagePicker from "expo-image-picker"

const Settings = (props) => {
  const [profilePicture, setImage] = useState(props.user.profilePicture)
  const [age, setAge] = useState(props.user.age)
  const [bio, setBio] = useState(props.user.bio)

  const { user } = props

  const incompleteProfile = () => {
    if (profilePicture === "" || age === "" || bio === "") {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: profilePicture || user.profilePicture,
            }}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changeProfilePicture}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder={user.age}
            onChangeText={(text) => setAge(text)}
            value={age}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            style={styles.input}
            placeholder={user.bio}
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
        </View>
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
  profilePictureContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changeProfilePicture: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    width: 200,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

//       <KeyboardAvoidingView style={styles.container} behavior="padding">
//         <View style={styles.container}>
//           <Text style={styles.title}>Hello, {user.name}</Text>

//           <Text style={styles.steps}>Step 1: Profile Picture</Text>
//           <View
//             style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Button
//               title="Pick an image from camera roll"
//               onPress={pickImage}
//             />
//             {profilePicture && (
//               <Image
//                 source={{ uri: profilePicture }}
//                 style={{ width: 200, height: 200 }}
//               />
//             )}
//           </View>

//           <Text style={styles.steps}>Step 2: Age</Text>
//           <TextInput
//             value={age}
//             onChangeText={(text) => setAge(text)}
//             style={styles.input}
//             placeholder="Enter your age"
//             keyboardType="numeric"
//             maxLength={2}
//           />

//           <Text style={styles.steps}>Step 3: Bio</Text>
//           <TextInput
//             value={bio}
//             onChangeText={(text) => setBio(text)}
//             style={styles.input}
//             placeholder="Tell me a little bit about yourself..."
//             multiline={true}
//             maxLength={250}
//           />

//           <TouchableOpacity
//             disabled={incompleteProfile()}
//             style={incompleteProfile() ? styles.disabled : styles.button}
//             onPress={handleSubmit}
//           >
//             <Text style={styles.buttonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </HideKeyboard>
//   )
// }

// const mapState = (state) => {
//   return {
//     user: state.auth,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     editUser: (user) => dispatch(editUser(user)),
//   }
// }

// export default connect(mapState, mapDispatch)(Settings)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   title: {
//     fontSize: 30,
//     color: "#8cdbd3",
//     padding: 20,
//   },
//   steps: {
//     fontSize: 20,
//     color: "#f25da4",
//     padding: 10,
//   },
//   input: {
//     width: 300,
//     height: 50,
//     borderColor: "gray",
//     borderWidth: 1,
//     margin: 10,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: "#8cdbd3",
//     padding: 10,
//     margin: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     fontSize: 20,
//     color: "#fff",
//   },
//   disabled: {
//     backgroundColor: "grey",
//     padding: 10,
//     margin: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// })
