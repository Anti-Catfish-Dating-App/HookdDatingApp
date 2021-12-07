import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Foundation } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const Header = ({ title, image, match, messages, user }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {!messages || messages.length < 10 ? (
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBack}
          >
            <Ionicons name="chevron-back-outline" size={34} color="#f3bae5" />
            <Text style={styles.goBackText}>{title}</Text>
            {/* <Image source={image} style={styles.image} /> */}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBack}
            >
              <Ionicons name="chevron-back-outline" size={34} color="#f3bae5" />
              <Text style={styles.goBackText}>{title}</Text>
              {/* <Image source={image} style={styles.image} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddMatchReview", {
                  match: match.id,
                })
              }}
            >
              <Text
                style={{
                  alignItems: "flex-end",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#f3bae5",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                }}
              >
                Add a review
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
})
