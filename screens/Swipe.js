import React from "react"
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const Lovers = [
  { id: "1", uri: require("../assets/dope.jpeg") },
  { id: "2", uri: require("../assets/heart.jpeg") },
  { id: "3", uri: require("../assets/manmail.jpeg") },
]

class Swipe extends React.Component {
  constructor() {
    super()

    this.state = {
      currentIndex: 0,
    }
    this.position = new Animated.ValueXY()
    this.rotate = this.position.x.interpolate({
      //length of the area that the animation can reach
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    })
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    }
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {},
    })
  }

  render() {
    {
      return Lovers.map((lover, index) => {
        if (index < this.state.currentIndex) {
          return null
        } else if (index == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={index}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute",
                },
              ]}
            >
              <Animated.View
                style={{
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000,
                }}
              >
                <Text
                  style={{
                    borderWidth: 5,
                    borderColor: "green",
                    borderRadius: 10,
                    color: "green",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 5,
                  }}
                >
                  CATCH
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000,
                }}
              >
                <Text
                  style={{
                    borderWidth: 5,
                    borderColor: "red",
                    borderRadius: 10,
                    color: "red",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 5,
                  }}
                >
                  RELEASE
                </Text>
              </Animated.View>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={lover.uri}
              />
            </Animated.View>
          )
        } else {
          return (
            <Animated.View
              key={index}
              style={{
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute",
              }}
            >
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={lover.uri}
              />
            </Animated.View>
          )
        }
      }).reverse()
    }
  }
}

export default Swipe
