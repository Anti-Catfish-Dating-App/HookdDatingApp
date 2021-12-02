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
  const { messages } = props

  React.useEffect(() => {
    props.getMessages()
  }, [])

  const handleChange = (text) => {
    setMessage(text)
  }

  console.log("props", props)
  console.log(props.messages)

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.messages}
        renderItem={({ item }) => <Text>{item.message}</Text>}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: () => dispatch(fetchMessages()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
