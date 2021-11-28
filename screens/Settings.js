import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { connect } from "react-redux"

const Settings = (props) => {
  const { user } = props

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.profilePicture}</Text>
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.auth,
  }
}

export default connect(mapState)(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
