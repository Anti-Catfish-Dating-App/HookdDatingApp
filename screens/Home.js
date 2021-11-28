import React, { useState, useLayoutEffect } from "react"
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons"
import { connect } from "react-redux"
import { useEffect } from "react"
import Swipe from "./Swipe"
import { me } from "../store/auth"

const Home = (props) => {
  const navigation = useNavigation()
  const { user } = props

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    // header start
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            style={styles.profile}
            source={{ uri: `${user.profilePicture}` }}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <TouchableOpacity>
            <Image
              source={require("../hookd-logos.jpeg")}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.title}>Home</Text>
        <Image source="dummyData.baselinePhoto" />
        <Button
        title="Go to Matches"
        onPress={() => navigation.navigate("Matches")}
      /> */}
        <TouchableOpacity>
          <Ionicons
            name="chatbubble-ellipses-sharp"
            size={50}
            style={styles.icon}
            onPress={() => navigation.navigate("Matches")}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity>
        <Ionicons
          name="locate"
          size={100}
          style={styles.swipe}
          onPress={() => navigation.navigate("Swipe")}
        />
      </TouchableOpacity> */}
      <View style={styles.swipeContainer}>
        <View style={styles.swipePic}>
          <View style={styles.swipe}>
            <Swipe />
          </View>
        </View>
      </View>
    </SafeAreaView>
    // header end
  )
}

const mapState = (state) => {
  return {
    user: state.auth,
  }
}

export default connect(mapState)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: "dodgerblue",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
    right: 0,
    color: "#8cdbd3",
  },
  //need to work on styling
  swipeContainer: {
    flex: 1,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    color: "dodgerblue",
  },
  age: {
    fontSize: 15,
    color: "dodgerblue",
  },
})
