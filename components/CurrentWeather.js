import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment-timezone";
import LottieView from "lottie-react-native";

const CurrentWeather = ({ weatherData }) => {
  // Getting some details from the weatherData
  const date = moment(weatherData.dt * 1000).format("Do MMMM");
  const time = moment(weatherData.dt * 1000).format("h:mm A");
  const sunrise = moment(weatherData.sunrise * 1000).format("h:mm A");
  const sunset = moment(weatherData.sunset * 1000).format("h:mm A");
  const humidity = weatherData.humidity;
  const weather = weatherData.weather[0].main;
  const temp = weatherData.temp;

  let image;

  // Setting the weather Animations
  switch (weather) {
    case "Clear":
      image = require("../assets/currentAnimations/clear.json");
      break;
    case "Clouds":
      image = require("../assets/currentAnimations/clouds.json");
      break;
    case "Rain":
      image = require("../assets/currentAnimations/rain.json");
      break;
    case "Snow":
      image = require("../assets/currentAnimations/snow.json");
      break;
    case "Thunderstorm":
      image = require("../assets/currentAnimations/thunderstorm.json");
      break;
    case "Haze":
      image = require("../assets/currentAnimations/haze.json");
      break;
    default:
      image = require("../assets/currentAnimations/clouds.json");
      break;
  }
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Current Weather
        </Text>
      </View>
      <View style={styles.smallContainer}>
        <Text style={{ fontSize: 20 }}>Date: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> {date}</Text>
      </View>
      <View style={styles.smallContainer}>
        <Text style={{ fontSize: 20 }}>Time: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> {time}</Text>
      </View>
      <View style={styles.smallContainer}>
        <Text style={{ fontSize: 20 }}>Humidity: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> {humidity}%</Text>
      </View>
      <View style={styles.smallContainer}>
        <Text style={{ fontSize: 20 }}>Temperature: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {temp}
          <View style={{ height: 15 }}>
            <Text style={styles.superScriptText}>°C</Text>
          </View>
        </Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <LottieView
          source={image}
          style={styles.animation}
          autoPlay={true}
          loop
          speed={0.75}
        />
        <Text style={styles.currentWeather}>{weather}</Text>
      </View>
      <View style={[styles.smallContainer, { justifyContent: "space-around" }]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20 }}>Sunrise: </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> {sunrise}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20 }}>Sunset: </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> {sunset}</Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
  },
  smallContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  superScriptText: {
    fontSize: 12,
    textAlignVertical: "top",
  },
  animation: {
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  currentWeather: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});
