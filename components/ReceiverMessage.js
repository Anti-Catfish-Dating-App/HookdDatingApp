import React from "react"
import { StyleSheet, Text, View } from "react-native"

const ReceiverMessage = ({ message }) => {
  console.log(message)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message.message}</Text>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default ReceiverMessage

const styles = StyleSheet.create({})
