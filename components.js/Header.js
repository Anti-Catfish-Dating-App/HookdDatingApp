import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Foundation } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const Header = ({ title }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#f3bae5" />
          <Text style={styles.goBackText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignSelf: "stretch",
  },
  goBack: {
    padding: 10,
    flexDirection: "row",
  },
  goBackText: {
    fontSize: 25,
    paddingTop: 3,
    paddingLeft: 5,
    fontWeight: "bold",
    color: "#288cd7",
  },
})
