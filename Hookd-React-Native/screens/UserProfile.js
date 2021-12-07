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
    <ScrollView style={styles.container}>
      <FlatList
          ListHeaderComponent={
            <View style={styles.profilePictureContainer}>
              <Image
          style={styles.profilePicture}
          source={{
            uri: profilePicture,
          }}
        />
        <Text style={styles.name}>
        {name}, {age}
      </Text>
      <Text style={styles.gender}>{gender}</Text>
      <Text style={styles.bio}>{bio}</Text>
      <Divider style={styles.divider} orientation="horizontal" />
      </View>
      }
          data={props.allUserReviews}
          renderItem={({item}) =>
          <View>
            <Text>{item.reviewText} - {item.rating}</Text>
          </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
    </ScrollView>
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
  },
  profilePictureContainer: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  profilePicture: {
    width: 300,
    height: 300,
    borderRadius: 15,
    position: "relative",
    alignItems: "center",
  },
  name: {
    color: "#5E5E5E",
    fontSize: 30,
  },
  age: {
    color: "#5E5E5E",
    fontSize: 20,
  },
  gender: {
    color: "#5E5E5E",
    fontSize: 17,
  },
  bio: {
    color: "#5E5E5E",
    fontSize: 14,
  },
  divider: {
    backgroundColor: "#2f3236",
    margin: 20,
    width: 300,
  },
})
