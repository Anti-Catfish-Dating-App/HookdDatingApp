import React, { Component, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  Dimensions,
} from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"

const lovers = [
  {
    id: "1",
    name: "Ula",
    age: 27,
    likes: ["Snow", "Glowsticks"],
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrsUhiLdicsZWOYc4WMt-zRdmHArOn6IC5aw&usqp=CAU",
  },
  {
    id: "2",
    name: "A-Dog",
    age: 22,
    likes: ["Parties", "Bananas"],
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYghpfZc9Ulf-zM7PSY2do3vVm9XGi3Bbjqg&usqp=CAU",
  },
  {
    id: "3",
    name: "Jalopy",
    age: 35,
    likes: ["Wine", "More wine"],
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbb4yf45LWtxa71Ghrbt4cKvYbCCS8RVtnw&usqp=CAU",
  },
]

let index = 0

function Swipe2() {
  const [lover, setLover] = useState(lovers[0])
  const [nextLover, setNextLover] = useState(lovers[1])
  const translateX = new Animated.Value(0)
  const translateY = new Animated.Value(0)
  const y = new Animated.Value(0)
  const windowHeight = Dimensions.get("window").height
  const TopOrBottom = y.interpolate({
    inputRange: [0, windowHeight / 2 - 1, windowHeight / 2],
    outputRange: [1, 1, -1],
    extrapolate: "clamp",
  })
  const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
    inputRange: [-500, 500],
    outputRange: [`-30deg`, `30deg`],
    extrapolate: "clamp",
  })

  const handlePan = Animated.event(
    [
      {
        nativeEvent: { translationX: translateX, translationY: translateY, y },
      },
    ],
    { useNativeDriver: true }
  )

  //new lover shows up
  const handlePanStateChange = ({ nativeEvent }) => {
    const { state, translationX } = nativeEvent
    if (state === 5) {
      //When the user takes their finger off the screen
      if (translationX > 185 || translationX < -185) {
        setLover(nextLover)
        setNextLover(lovers[++index % 3])
      } else reset.start()
    }
  }
  //if not swiped completely current lover jumps back into position
  const reset = Animated.parallel([
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={{ uri: nextLover.pic }}
            style={{ height: "80%", width: "100%" }}
          ></Image>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", opacity: 100 }}>
              {nextLover.name}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "700", opacity: 100 }}>
              Age: {nextLover.age}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "700", opacity: 100 }}>
              Likes: {nextLover.likes.join(", ")}
            </Text>
          </View>
        </View>
        <PanGestureHandler
          onGestureEvent={handlePan}
          onHandlerStateChange={handlePanStateChange}
        >
          <Animated.View
            style={
              ([styles.card],
              { transform: [{ translateX }, { translateY }, { rotate }] })
            }
          >
            <Image
              source={{ uri: lover.pic }}
              style={{ height: "80%", width: "100%" }}
            ></Image>
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700", opacity: 100 }}>
                {lover.name}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "700", opacity: 100 }}>
                Age: {lover.age}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "700", opacity: 100 }}>
                Likes: {lover.likes.join(", ")}
              </Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "lightblue",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    position: "absolute",
    borderWidth: 1.5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Swipe2
