import React, { useLayoutEffect } from "react"
import {
  Button,
  FlatList,
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
  const [message, setMessage] = React.useState("")
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

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
    <SafeAreaView style={styles.container}>
      <Header title="Messages" />
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
          onChangeText={handleChange}
          value={props.message}
          placeholder="Type a message"
          onSubmitEditing={() => {
            props.sendMessage(props.route.params.match.id, message)
            setMessage("")
          }}
        />
        <Button
          title="Send"
          onPress={() => {
            props.sendMessage(props.route.params.match.id, message)
            setMessage("")
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  messages: {
    flex: 1,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
  },
  input: {
    width: "80%",
    height: "100%",
    borderRadius: 10,
    padding: 10,
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
