import React from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native"

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../hookd-logos_transparent.png")}
          style={styles.logo}
        />
        <Text style={styles.loadingText}> Loading .... </Text>
        <ActivityIndicator size="large" color="#f3bae5" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#288cd7",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: "-10%",
  },
  logo: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 30,
    color: "#f3bae5",
    marginBottom: 50,
  },
})

export default Loading
