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
import { fetchMessages } from "../store/messages"

const Messages = (props) => {
  const [message, setMessage] = React.useState(props.messages)

  React.useEffect(() => {
    props.getMessages(props.route.params.match.id)
  }, [])

  const handleChange = (text) => {
    setMessage(text)
  }

  console.log("props", props)
  console.log(props.messages)
  console.log(props.messages.userId)
  console.log("reciever", props.route.params)
  //if the reciever id is equal to the userId then display the messages on the left side

  return (
    <View style={styles.container}>
      <FlatList
        data={props.messages}
        renderItem={({ item }) => <Text>{item.message}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
