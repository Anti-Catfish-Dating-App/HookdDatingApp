import React from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { connect } from "react-redux"
import {
  addMessage,
  addMessageThunk,
  getMessages,
  getMessagesThunk,
} from "../store/messages"

const Messages = (props) => {
  const [message, setMessage] = React.useState(props.messages)
  const { messages } = props

  React.useEffect(() => {
    props.getMessages()
  }, [])

  const handleChange = (text) => {
    setMessage(text)
  }

  const handleSubmit = () => {
    props.addMessage(message)
    setMessage("")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.messages}</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={handleChange}
      ></TextInput>
      <Button title="Submit" onPress={handleSubmit} />
      <View style={styles.messages}>
        {messages.map((message) => (
          <Text key={message.id}>{message.text}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  messages: {
    fontSize: 20,
    marginBottom: 20,
  },
})

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => dispatch(addMessageThunk(message)),
    getMessages: () => dispatch(getMessagesThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
