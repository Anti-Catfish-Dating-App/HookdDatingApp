import React, { useState, useLayoutEffect } from "react"
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import { addReview } from "../store/reviews";


const AddMatchReview = ({route}) => {
  //User to reviewid
  console.log(route.params.matchId);
  return (
    <View>
      <Text>Add a review!</Text>
    </View>
  )
}

const mapDispatch = (dispatch) => {
  return {
    addReview: (reviewInfo) => dispatch(addReview(reviewInfo))
  }

}

export default connect(null, mapDispatch)(AddMatchReview);
