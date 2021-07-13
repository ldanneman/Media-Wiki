import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./MainPage";
import axios from "axios";
import { WebView } from "react-native-webview";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Go to MainPage"
        onPress={() => navigation.navigate("MainPage")}
      />
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const { itemId } = route.params;
  const x = { item: itemId };
  const [iframe, setIframe] = useState("");
  console.log(itemId);
  useEffect(() => {
    axios
      .post(`https://mediawiki1.herokuapp.com/api/iframe`, x)
      .then(function (response) {
        if (!response.data == "null") {
          setIframe(response.data);
        } else {
          console.log("null");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <WebView
        originWhitelist={["*"]}
        source={{
          html: `${itemId}`,
        }}
      />
      <Text>{itemId}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
