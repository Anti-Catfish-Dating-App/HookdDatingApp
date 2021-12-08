import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Foundation } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const SignUpHeader = ({ title, image, match, messages, user }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {!messages || messages.length < 10 ? (
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBack}
          >
            <Ionicons name="chevron-back-outline" size={34} color="#288cd7" />
          </TouchableOpacity>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>{title}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBack}
          >
            <Ionicons name="chevron-back-outline" size={34} color="#288cd7" />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.goBackText}>{title}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.goBack}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <MaterialIcons
                style={styles.reviewButton}
                name="rate-review"
                size={36}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

export default SignUpHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    alignSelf: "stretch",
  },
  headContainer: {
    flexDirection: "row",
    flexShrink: 1,
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    flexShrink: 1,
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    maxWidth: "80%",
  },
  goBack: {
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  goBackText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#288cd7",
    left: "-20%",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  reviewButton: {
    position: "relative",
    justifyContent: "flex-end",
    fontWeight: "bold",
    color: "#f3bae5",
    marginTop: 10,
  },
})
