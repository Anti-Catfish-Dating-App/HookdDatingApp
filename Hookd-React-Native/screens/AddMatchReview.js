import React, { useState, useLayoutEffect } from "react"
import { useController, useForm } from "react-hook-form"
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import { InputForm } from "./Input"
import { addReview, getReviews } from "../store/reviews";
import { useNavigation } from "@react-navigation/native"


const AddMatchReview = (props) => {
  const { control, handleSubmit } = useForm()
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    const resStatus = await props.addReview({
      reviewedUser: props.route.params.match,
      rating: data.Rating,
      review: data.Review
    })

    if(resStatus === 200){
      navigation.navigate("Matches");
    } else {
      Alert.alert("Error!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>Add a review!</Text>
      <InputForm name="Rating" style={styles.input} control={control} />
      <InputForm name="Review" style={styles.input} control={control} />
      <Button title="Submit Review" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const mapDispatch = (dispatch) => {
  return {
    addReview: (reviewInfo) => dispatch(addReview(reviewInfo)),
    getReviews: (userId) => dispatch(getReviews(userId))
  }

}

export default connect(null, mapDispatch)(AddMatchReview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
})
