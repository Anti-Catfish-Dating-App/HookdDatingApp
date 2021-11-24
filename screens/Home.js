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

const Home = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={require("../hookd-logos.jpeg")} style={styles.logo} />
        </TouchableOpacity>
        {/* <Text style={styles.title}>Home</Text>
        <Image source="dummyData.baselinePhoto" />
        <Button
          title="Go to Matches"
          onPress={() => navigation.navigate("Matches")}
        /> */}
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "dodgerblue",
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
})
