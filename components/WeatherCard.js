import { StyleSheet, View, FlatList } from "react-native";
import React from "react";

import FutureTempElement from "./FutureTempElement";

const WeatherCard = ({ weatherData }) => {
  //checking if there is any data in the weatherData
  if (weatherData && weatherData.length > 0) {
    return (
      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.dt}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <FutureTempElement data={item} />;
        }}
      />
    );
  } else {
    return <View></View>;
  }
};

export default WeatherCard;

const styles = StyleSheet.create({});
