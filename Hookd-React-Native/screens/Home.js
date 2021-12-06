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
import { getMatches } from "../store/matches"

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
              style={styles.profile}
              source={{ uri: `${user.profilePicture}` }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Image
            source={require("../hookd-logos_transparent.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={async () => {
              await props.getMatches()
              navigation.navigate("Matches")
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={48}
              color="#288cd7"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* header end */}
      {/* body start */}
      <View style={styles.body}>
        <View style={styles.bodyRight}>
          <Swipe />
        </View>
      </View>
      {/* body end */}
    </SafeAreaView>
  )
}

const mapState = (state) => {
  return {
    user: state.auth,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMatches: () => dispatch(getMatches()),
  }
}

export default connect(mapState, mapDispatch)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 100,
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    color: "#288cd7",
  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#288cd7",
  },
  body: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    paddingBottom: 180,
  },
  bodyRight: {
    flex: 1,
    width: "50%",
    height: "100%",
  },
})
