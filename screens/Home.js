import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Home = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>This is where you swipe through users and see their profiles</Text>
      <Button
        title="Go to Matches"
        onPress={() => navigation.navigate("Matches")}
      />
    </View>
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
})
