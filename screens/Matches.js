import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { connect } from "react-redux"
import { getMatches } from "../store/matches"

const Matches = (props) => {
  const [matches, setMatches] = useState(props.matches);

  return (
    <View style={styles.container}>
      <FlatList
        data={props.matches.matches}
        renderItem={({item}) => <Text style={styles.title}>{item.name}</Text>}
      />
    </View>
  )
}

const mapState = (state) => {
  return {
    matches: state.matches
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMatches: () => dispatch(getMatches())
  }
}

export default connect(mapState, mapDispatch)(Matches)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
})
