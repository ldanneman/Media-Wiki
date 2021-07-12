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
  </View>
);

const MainPage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const DATA = [
    {
      title: "Main dishes",
      data: data,
    },
  ];
  useEffect(() => {
    axios
      .get(`localhost:5000/api/`)
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
    backgroundColor: "#f9c2ff",
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
