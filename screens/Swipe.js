import React, { useEffect, useState } from "react"

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import Swiper from "react-native-deck-swiper"
import { Transitioning, Transition } from "react-native-reanimated"
import UserProfile from "./UserProfile"

import { getUsers } from "../store/users"
import { getUser } from "../store/singleUser"

//animations
const ANIMATION_DURATION = 200
const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
)

const swiperRef = React.createRef()
const transitionRef = React.createRef()

const Swipe = (props) => {
  const navigation = useNavigation()
  //set initial index
  const [index, setIndex] = React.useState(0)
  //Swiper gives this method.
  const onSwiped = () => {
    //carddetails pop in animatedly
    transitionRef.current.animateNextTransition()
    //infinitely go through stack
    setIndex((index + 1) % pond.length)
  }

  useEffect(async () => {
    await props.getUsersToSwipe()
  }, [])

  const pond = props.users.users

  if (!pond.length) {
    return <Text>...Loading</Text>
  }

  const Card = ({ card }) => {
    return (
      <View style={styles.currentCard}>
        <Image source={{ uri: card.profilePicture }} style={styles.cardImage} />
      </View>
    )
  }

  const CardDetails = ({ index }) => (
    <View key={pond[index].id} style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        {pond[index].name}
      </Text>
      <Text style={[styles.text, styles.age]}>{pond[index].age}</Text>
      <Text style={[styles.text, styles.gender]}>{pond[index].gender}</Text>
      <Text style={[styles.text, styles.bio]}>{pond[index].bio}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={pond}
          cardIndex={index}
          renderCard={(fish) => <Card card={fish} />}
          onTapCard={async () => {
            await props.getUser(pond[index].id)
            navigation.navigate("UserProfile", {
              id: pond[index].id,
              name: pond[index].name,
            })
          }}
          onSwiped={onSwiped}
          //if we want stacking effect but this is giving me issues
          showSecondCard
          //can't make more than 1 for some reason, issue with JSON??
          stackSize={1}
          stackScale={10}
          stackSeperation={10}
          disableTopSwipe
          disableBottomSwipe
          animateOverlayLabelsOpacity
          animateCardOpacity
          infinite
          backgroundColor={"transparent"}
          overlayLabels={{
            left: {
              title: "RELEASE",
              style: {
                label: {
                  backgroundColor: "red",
                  color: "white",
                  fontSize: 12,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "CATCH",
              style: {
                label: {
                  backgroundColor: "green",
                  color: "white",
                  fontSize: 12,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>

      <View style={styles.bottomContainer}>
        {/* swipe right and swip left buttons */}
        <View style={styles.bottomContainerButtons}>
          <Button
            title="<"
            color={"red"}
            onPress={() => swiperRef.current.swipeLeft()}
          />
          <Button
            title=">"
            color={"green"}
            onPress={() => swiperRef.current.swipeRight()}
          />
        </View>
        <Transitioning.View ref={transitionRef} transition={transition}>
          <CardDetails index={index} />
        </Transitioning.View>
      </View>
    </View>
  )
}

const mapState = (state) => {
  return { users: state.users }
}

const mapDispatch = (dispatch) => {
  return {
    getUsersToSwipe: () => dispatch(getUsers()),
    getUser: (userId) => dispatch(getUser(userId)),
  }
}

export default connect(mapState, mapDispatch)(Swipe)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  swiperContainer: {
    flex: 0.55,
  },
  bottomContainer: {
    flex: 0.45,
    justifyContent: "space-evenly",
  },
  bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: "contain",
  },
  currentCard: {
    flex: 0.7,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 50,
    backgroundColor: "transparent",
    fontFamily: "Helvetica",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },

  heading: {
    fontSize: 32,
    marginBottom: 10,
    color: "#288cd7",
    textAlign: "left",
    fontWeight: "600",
  },
  age: { color: "black", fontSize: 24, fontWeight: "500", textAlign: "left" },
  bio: { color: "black", fontSize: 20, fontWeight: "200" },
  gender: { color: "black", fontSize: 14, fontWeight: "200" },
})
