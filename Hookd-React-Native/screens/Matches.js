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
import { Ionicons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"

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

  const displayStarRating = (avgRating) => {
    if (avgRating > 0) {
      return (
        <StarRatingBar
          score={avgRating}
          dontShowScore={false}
          allowsHalfStars={true}
          accurateHalfStars={true}
        />
      )
    }
  }

  if (props.matches.matches.length >= 1) {
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
                  {displayStarRating(item.avgRating)}
                </View>
                <View style={styles.separator} />
              </ScrollView>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={"Keep Fishing"} />
        <Text style={styles.noMatches}>No Matches!</Text>
        <Entypo
          style={styles.noMatchesIcon}
          name="emoji-sad"
          size={100}
          color="#288cd7"
        />
      </SafeAreaView>
    )
  }
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
  noMatches: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "50%",
  },
  noMatchesIcon: {
    marginTop: "10%",
    alignContent: "center",
    alignSelf: "center",
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
