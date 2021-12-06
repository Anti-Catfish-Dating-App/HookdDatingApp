import React, { useEffect, useState, useLayoutEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import { getMatches } from "../store/matches"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components.js/Header"

const Matches = (props) => {
  const navigation = useNavigation()

  const [matches, setMatches] = useState(props.matches)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  console.log(props)

  // useEffect(() => {
  //   setMatches(props.getMatches())
  // }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Chat"} />
      <View style={styles.container}>
        <FlatList
          data={props.matches.matches}
          renderItem={({ item }) => (
            <ScrollView>
              <View style={styles.item}>
                <TouchableOpacity
                  style={styles.itemBox}
                  onPress={() =>
                    props.navigation.navigate("Messages", { match: item })
                  }
                >
                  <Image
                    style={styles.tinyImage}
                    source={{ uri: item.profilePicture }}
                  />
                  <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
            </ScrollView>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const mapState = (state) => {
  return {
    matches: state.matches,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMatches: () => dispatch(getMatches()),
  }
}

export default connect(mapState, mapDispatch)(Matches)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "Avenir",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tinyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})
