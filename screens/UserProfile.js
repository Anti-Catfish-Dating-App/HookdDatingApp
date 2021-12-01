import React, { useState, useEffect } from "react"
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
import { getUser } from "../store/singleUser"

const UserProfile = (props) => {
  const { id } = props.route.params

  const [profilePicture, setImage] = useState(props.user.user.profilePicture)
  const [age, setAge] = useState(props.user.user.age)
  const [bio, setBio] = useState(props.user.user.bio)
  const [gender, setGender] = useState(props.user.user.gender)
  const [name, setName] = useState(props.user.user.name)
  const navigation = useNavigation()
  const [user, setUser] = useState(props.user)

  // const fetchUser = async (id) => {
  //   await props.getUser(id)
  //   setUser(id)
  // }

  // useEffect(() => {
  //   //try to cleanup useEffect fn to avoid memory leaks
  //   let isSubscribed = true
  //   fetchUser(id)
  //   return () => (isSubscribed = false)
  // }, [user.id])

  useEffect(async () => {
    const newUser = props.user.user
    setUser(newUser)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: profilePicture,
          }}
        />
        <Text>{name}</Text>
      </View>
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.singleUser,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUser: (userId) => dispatch(getUser(userId)),
  }
}

export default connect(mapState, mapDispatch)(UserProfile)

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
    width: 200,
    height: 200,
    borderRadius: 15,
  },
})
