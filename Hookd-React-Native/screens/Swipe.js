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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Swiper from "react-native-deck-swiper"
import { Transitioning, Transition } from "react-native-reanimated"
import UserProfile from "./UserProfile"
import Toast from "react-native-root-toast"

import users, { getPond } from "../store/users"
import { addSwipe } from "../store/matches"
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
    setIndex(index + 1)
  }

  const userHasSwiped = async (direction, id) => {
    const status = await props.addSwipe(direction, id)
    if (status === 222) {
      let toast = Toast.show("YOU HAVE A NEW MATCH!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "pink",
        delay: 0,
        opacity: 1,
      })
      setTimeout(function () {
        Toast.hide(toast)
      }, 1750)
    }
  }

  useEffect(async () => {
    await props.getUsersToSwipe(props.user.id)
  }, [])

  const pond = props.users.users

  const Card = ({ card }) => {
    if (!pond || pond.length === 0 || !card || !card.profilePicture) {
      return <View />
    }

    return (
      <View style={styles.currentCard}>
        <Image source={{ uri: card.profilePicture }} style={styles.cardImage} />
        <View style={styles.text}>
          <Text style={styles.heading} numberOfLines={2}>
            {card.name}
          </Text>
          <Text style={styles.age}>{card.age} - {card.gender}</Text>
          <Text style={styles.bio}>{card.bio}</Text>
        </View>
      </View>
    )
  }

  const CardDetails = ({ index }) => {
    if (!pond[index] || !pond || !pond[index].id || pond.length === 0) {
      return <View />
    }
    return (
      <View key={pond[index].id} style={{ alignItems: "center" }}>

      </View>
    )
  }

  const endOfFeedCard = () => {
    return (
        <View style={styles.endOfFeedCard}>
          <Text style={styles.endOfFeedText} numberOfLines={4}>
            There are no more people to match with at the moment, sorry!
          </Text>
          <Entypo name="emoji-sad" size={75} color="#288cd7" style={{alignSelf: "center"}} />

      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!pond || pond.length === 0 ? (
        endOfFeedCard()
      ) : !pond[index] ? (
        endOfFeedCard()
      ) : (
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
            //Right swipe:
            onSwipedRight={() => userHasSwiped("right", pond[index].id)}
            //Left swipe:
            onSwipedLeft={() => userHasSwiped("left", pond[index].id)}
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
      )}

      {!pond || pond.length === 0 || !pond[index] ? (
        <View />
      ) : (
        <View style={styles.bottomContainer}>
          {/* swipe right and swip left buttons */}
          <View style={styles.bottomContainerButtons}>
            <TouchableOpacity
            onPress={() => swiperRef.current.swipeLeft()}>
            <MaterialCommunityIcons name="fish-off" size={55} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => swiperRef.current.swipeRight()}>
            <MaterialCommunityIcons name="fish" size={55} color="green" />
            </TouchableOpacity>
          </View>
          <Transitioning.View ref={transitionRef} transition={transition}>
          </Transitioning.View>
        </View>
      )}
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.auth,
    users: state.users,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsersToSwipe: (userId) => dispatch(getPond(userId)),
    addSwipe: (direction, id) => dispatch(addSwipe(direction, id)),
    getUser: (userId) => dispatch(getUser(userId)),
  }
}

export default connect(mapState, mapDispatch)(Swipe)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  bottomContainer: {
    justifyContent: "space-evenly",
  },
  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  currentCard: {
    position: "relative",
    top: -20,
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
    position: "absolute",
    bottom: 10,
    padding: 8,
    fontSize: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    opacity: 0.7,
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
  age: { color: "black", fontSize: 20, fontWeight: "500", textAlign: "left" },
  bio: { color: "black", fontSize: 16, fontWeight: "400" },
  loading: {
    color: "#5389ed",
    fontSize: 50,
    fontWeight: "500",
    alignContent: "center",
  },
  noMatches: {
    color: "#5389ed",
    fontSize: 50,
    fontWeight: "500",
    textAlign: "center",
  },
  endOfFeedCard: {
    position: "relative",
    top: 75,
    height: 350,
    fontSize: 50,
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: 'white',
    opacity: 0.7,
    fontFamily: "Helvetica",
    margin: 15
  },
  endOfFeedText: {
    fontSize: 32,
    color: "#288cd7",
    textAlign: "center",
    fontWeight: "600",
    margin: 20,
    marginTop: 50
  }
})
