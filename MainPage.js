import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

const Item = ({ title, navigation }) => (
  <View style={styles.item}>
    <Button
      onPress={() => {
        //   alert(`You tapped ${title}`);
        navigation.navigate("Details", { itemId: title });
      }}
      title={title}
    >
      <Text style={styles.title}>{title}</Text>
    </Button>
    {/* <Button
      onPress={() => {
        //   alert(`You tapped ${title}`);
        Linking.openURL(title);
      }}
      title={title}
    >
      <Text style={styles.title}>{title}</Text>
    </Button> */}
  </View>
);

const MainPage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const DATA = [
    {
      title: "Top Mix",
      data: data,
    },
  ];
  useEffect(() => {
    axios
      .get(`https://mediawiki1.herokuapp.com/api/`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} navigation={navigation} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#00BDFE",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

export default MainPage;
