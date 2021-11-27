import React, { useLayoutEffect } from "react"
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
import { fetchUser } from "../store/singleUser"
import { connect } from "react-redux"
import { useEffect } from "react"

const Home = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  // useEffect(() => {
  //   if (auth.id) {
  //     fetchUser(auth.id)
  //   }
  // }, [])

  return (
    // header start
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={require("../IMG_0194.jpeg")} style={styles.profile} />
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
    </SafeAreaView>
    // header end
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

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
})
