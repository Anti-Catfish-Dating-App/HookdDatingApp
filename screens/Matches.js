import React from "react"
import { StyleSheet, Text, View } from "react-native"

const Matches = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Matches</Text>
    </View>
  )
}

export default Matches

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
})
