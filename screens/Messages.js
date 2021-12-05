import React, { useLayoutEffect } from "react"
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { connect } from "react-redux"
import { fetchMessages, sendMessageThunk } from "../store/messages"
import { useNavigation } from "@react-navigation/native"
import Header from "../components.js/Header"

const Messages = (props) => {
  const [input, setInput] = React.useState("")
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const sendMessage = () => {
    props.sendMessage(props.route.params.match.id, input)
    setInput("")
  }

  React.useEffect(() => {
    props.getMessages(props.route.params.match.id)
  }, [])

  // console.log("props", props)
  // console.log(props.messages)
  // console.log(props.messages.userId)
  // console.log("reciever", props.route.params)
  //if the reciever id is equal to the userId then display the messages on the left side

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={props.route.params.match.name}
        image={props.route.params.match.profilePicture}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
        keyboardVerticalOffset={10}
      >
        <FlatList
          style={styles.messages}
          data={props.messages}
          renderItem={({ item }) => {
            if (item.userId === props.route.params.match.id) {
              return (
                <View style={styles.sender}>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
              )
            } else {
              return (
                <View style={styles.receiver}>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
              )
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setInput}
            value={input}
            placeholder="Type a message"
            onSubmitEditing={() => {
              sendMessage()
            }}
          />
          <Button
            title="Send"
            color="#288cd7"
            onPress={() => {
              sendMessage()
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  messages: {
    width: "100%",
    height: "100%",
  },
  sender: {
    backgroundColor: "#f3bae5",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignSelf: "flex-start",
  },
  receiver: {
    backgroundColor: "#288cd7",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignSelf: "flex-end",
  },
  message: {
    fontSize: 20,
  },
  inputContainer: {
    color: "white",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    height: 60,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
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
