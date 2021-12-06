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
import StarRatingBar from "react-native-star-view"
import Header from "../components.js/Header"

const Matches = (props) => {
  const navigation = useNavigation()

  const [matches, setMatches] = useState(props.matches)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    setMatches(props.getMatches())
  }, [])


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
                  onPress={() =>
                    navigation.navigate("AddMatchReview", { matchId: item.id })
                  }
                >
                  <Image
                    style={styles.tinyImage}
                    source={{ uri: item.profilePicture }}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <Button
                title="Chat"
                onPress={() =>
                  props.navigation.navigate("Messages", { match: item })
                }
              />
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
    justifyContent: "space-between",
  },
  item: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#808080",
  },
  title: {
    fontSize: 20,
    color: "#288cd7",
    fontWeight: "600",
  },
  tinyImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 75,
    overflow: "hidden",
  },
})
