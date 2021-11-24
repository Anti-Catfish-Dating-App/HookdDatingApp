import React from "react"
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

const Home = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>Get hookd</Text>
      <TouchableOpacity>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDlIyL-V3IAgkKH2jzb1WOXXWEpORMdJ96w&usqp=CAU",
          }}
          style={{ width: 200, height: 200 }}
        />
      </TouchableOpacity>
      <Button
        title="Go to Matches"
        onPress={() => navigation.navigate("Matches")}
      />
      <Button title="Swipe" onPress={() => navigation.navigate("Swipe")} />
      <Button title="Swipe2" onPress={() => navigation.navigate("Swipe2")} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "dodgerblue",
  },
})
