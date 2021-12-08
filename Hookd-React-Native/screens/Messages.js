import React, { useLayoutEffect } from "react"
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import { fetchMessages, sendMessageThunk } from "../store/messages"
import { useNavigation } from "@react-navigation/native"
import Header from "../components.js/Header"
import { getUser } from "../store/singleUser"

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

  React.useEffect(async () => {
    await props.getUser(props.route.params.match.id)
    props.getMessages(props.route.params.match.id)
  }, [])


  return (
    // {props.messages.length} > 2 ? (
    <SafeAreaView style={styles.container}>
      <Header
        title={props.user.user.name}
        image={props.user.user.profilePicture}
        match={props.user.user.id}
        messages={props.messages}
        user={props.auth}
        reviews={props.allUserReviews}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.messages}>
            <FlatList
              data={props.messages}
              renderItem={({ item }) => {
                if (item.userId === props.route.params.match.id) {
                  return (
                    <View style={styles.messageContainer}>
                      <Image
                        style={styles.profilePicture}
                        source={{
                          uri: props.route.params.match.profilePicture,
                        }}
                      />
                      <View style={styles.sender}>
                        <Text style={styles.message}>{item.message}</Text>
                      </View>
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
          </View>
        </TouchableWithoutFeedback>
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
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  message: {
    fontSize: 20,
  },
  inputContainer: {
    color: "white",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
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
    user: state.singleUser,
    allUserReviews: state.reviews.allUserReviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (id) => dispatch(fetchMessages(id)),
    sendMessage: (id, message) => dispatch(sendMessageThunk(id, message)),
    getUser: (userId) => dispatch(getUser(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
