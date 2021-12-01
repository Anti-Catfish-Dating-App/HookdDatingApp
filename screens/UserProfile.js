import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"

const UserProfile = (props) => {
  // const [profilePicture, setImage] = useState(props.user.profilePicture)
  // const [age, setAge] = useState(props.user.age)
  // const [bio, setBio] = useState(props.user.bio)
  // const [gender, setGender] = useState(props.user.gender)

  const navigation = useNavigation()
  const { user } = props

  return (
    <View>
      <Text>User Profile Info</Text>
    </View>
  )
}

// const mapState = (state) => {
//   return {
//     user: ,
//   }
// }

export default UserProfile
