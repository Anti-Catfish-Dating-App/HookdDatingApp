import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  ScrollView,
  FlatList
} from "react-native"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { getUser } from "../store/singleUser"
import { getReviews } from "../store/reviews"
import { Divider } from "react-native-elements"

const UserProfile = (props) => {
  const { id } = props.route.params
  const navigation = useNavigation()

  const [profilePicture, setImage] = useState(props.user.user.profilePicture)
  const [age, setAge] = useState(props.user.user.age)
  const [bio, setBio] = useState(props.user.user.bio)
  const [gender, setGender] = useState(props.user.user.gender)
  const [name, setName] = useState(props.user.user.name)

  const [user, setUser] = useState(props.user)
  const [avgRating, setAvgRating] = useState(props.avgRating)
  const [allUserReviews, setAllUserReviews] = useState(props.allUserReviews)



  useEffect(async () => {
    const newUser = props.user.user
    setUser(newUser)
    setAllUserReviews(await props.getReviews(newUser.id));
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
      <FlatList
          data={props.allUserReviews}
          renderItem={({item}) =>
          <View>
            <Text>{item.reviewText} - {item.rating}</Text>
          </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      <Text style={styles.name}>
        {name}, {age}
      </Text>
      {/* <Text style={styles.age}>{age}</Text> */}
      <Text style={styles.gender}>{gender}</Text>
      <Divider style={styles.divider} orientation="horizontal" />
      <Text style={styles.bio}>{bio}</Text>
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.singleUser,
    avgRating: state.reviews.avgRating,
    allUserReviews: state.reviews.allUserReviews
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUser: (userId) => dispatch(getUser(userId)),
    getReviews: (userId) => dispatch(getReviews(userId))
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
    margin: 50,
  },
  profilePicture: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  name: {
    color: "#5E5E5E",
    alignSelf: "flex-start",
    fontSize: 30,
    marginLeft: 60,
  },
  age: {
    color: "#5E5E5E",
    alignSelf: "flex-start",
    fontSize: 20,
    marginLeft: 60,
  },
  gender: {
    color: "#5E5E5E",
    alignSelf: "flex-start",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 60,
  },
  bio: {
    color: "#5E5E5E",
    alignSelf: "flex-start",
    marginTop: 5,
    marginLeft: 60,
    fontSize: 14,
  },
  divider: {
    backgroundColor: "#2f3236",
    margin: 20,
    width: 300,
  },
})
