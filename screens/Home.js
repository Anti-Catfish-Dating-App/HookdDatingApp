import React, { useState, useLayoutEffect } from "react"
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons"
import { connect } from "react-redux"
import { useEffect } from "react"
import Swipe from "./Swipe"
import { me } from "../store/auth"

const Home = (props) => {
  const navigation = useNavigation()
  const { user } = props

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    // header start
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
              style={styles.profile}
              source={{ uri: `${user.profilePicture}` }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>Home</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Matches")
            }}
          >
            <Ionicons name="ios-heart" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* header end */}
      {/* body start */}
      <View style={styles.body}>
        <View style={styles.bodyRight}>
          <Swipe />
        </View>
      </View>
      {/* body end */}
    </SafeAreaView>
  )
}

const mapState = (state) => {
  return {
    user: state.auth,
  }
}

export default connect(mapState)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#8cdbd3",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  body: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  bodyRight: {
    flex: 1,
    width: "50%",
    height: "100%",
    backgroundColor: "#8cdbd3",
  },
})

//       <SafeAreaView>
//         <View style={styles.container}>
// <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
//   <Image
//     style={styles.profile}
//     source={{ uri: `${user.profilePicture}` }}
//   />
// </TouchableOpacity>
//           <View style={styles.logoContainer}>
//             <TouchableOpacity>
//               <Image
//                 source={require("../hookd-logos.jpeg")}
//                 style={styles.logo}
//               />
//             </TouchableOpacity>
//           </View>
//           {/* <Text style={styles.title}>Home</Text>
//         <Image source="dummyData.baselinePhoto" />
//         <Button
//         title="Go to Matches"
//         onPress={() => navigation.navigate("Matches")}
//       /> */}
//           <TouchableOpacity>
//             <Ionicons
//               name="chatbubble-ellipses-sharp"
//               size={50}
//               style={styles.icon}
//               onPress={() => navigation.navigate("Matches")}
//             />
//           </TouchableOpacity>
//         </View>
//         {/* <TouchableOpacity>
//         <Ionicons
//           name="locate"
//           size={100}
//           style={styles.swipe}
//           onPress={() => navigation.navigate("Swipe")}
//         />
//       </TouchableOpacity> */}
//       </SafeAreaView>
//       <View style={styles.swipeContainer}>
//         <View style={styles.swipePic}>
//           <View style={styles.swipe}>
//             <Swipe />
//           </View>
//         </View>
//       </View>
//     </View>
//     // header end
//   )
// }

// const mapState = (state) => {
//   return {
//     user: state.auth,
//   }
// }

// export default connect(mapState)(Home)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "stretch",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 30,
//     color: "dodgerblue",
//   },
// profile: {
//   width: 50,
//   height: 50,
//   borderRadius: 50,
// },
//   logoContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 75,
//     height: 75,
//     borderRadius: 50,
//   },
//   icon: {
//     position: "absolute",
//     right: 0,
//     color: "#8cdbd3",
//   },
//   //need to work on styling
//   swipeContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   swipePic: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   swipe: {
//     width: 300,
//     height: 300,
//     borderRadius: 150,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   info: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   name: {
//     fontSize: 20,
//     color: "dodgerblue",
//   },
//   age: {
//     fontSize: 15,
//     color: "dodgerblue",
//   },
// })
