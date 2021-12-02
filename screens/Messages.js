import React from "react"
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { connect } from "react-redux"
import { fetchMessages, sendMessageThunk } from "../store/messages"

const Messages = (props) => {
  const [message, setMessage] = React.useState(props.messages)

  React.useEffect(() => {
    props.getMessages(props.route.params.match.id)
  }, [])

  const handleChange = (text) => {
    setMessage(text)
  }

  // console.log("props", props)
  // console.log(props.messages)
  // console.log(props.messages.userId)
  // console.log("reciever", props.route.params)
  //if the reciever id is equal to the userId then display the messages on the left side

  return (
    <View style={styles.container}>
      <FlatList
        data={props.messages}
        renderItem={({ item }) => <Text>{item.message}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={props.message}
          placeholder="Type a message"
        />
        <Button
          title="Send"
          onPress={() => {
            props.sendMessage(props.route.params.match.id, message)
            setMessage("")
          }}
        />
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
  input: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    paddingBottom: 40,
    justifyContent: "center",
  },
})

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (id) => dispatch(fetchMessages(id)),
    sendMessage: (id, message) => dispatch(sendMessageThunk(id, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
