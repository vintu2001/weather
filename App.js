import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";

import * as Location from "expo-location";
import LottieView from "lottie-react-native";

import WeatherCard from "./components/WeatherCard";
import CurrentWeather from "./components/CurrentWeather";

// const API_KEY = "You Can insert API KEY here";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("Noida");

  // fetching wether data
  const fetchWeather = async (latitude, longitude) => {
    const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&exclude=minutely,hourly&units=metric`;
    if (latitude && longitude) {
      //Getting City Name Here
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        setCity(item.city);
      }
      // Connecting with API
      fetch(API)
        .then((res) => res.json())
        .then((data2) => {
          // console.log(data);
          setData(data2);
          setIsLoading(false);
        });
    }
  };

  // First asking user for Location Access Permission to fetch current weather details
  useEffect(() => {
    (async () => {
      Location.requestForegroundPermissionsAsync()
        .then((status) => {
          if (status.status === "granted") {
            Location.getCurrentPositionAsync({}).then((location) => {
              // console.log(location.coords.latitude, location.coords.longitude);
              fetchWeather(location.coords.latitude, location.coords.longitude);
              // fetchWeather(20.59, 78.96);
            });
            return;
          }
        })
        .catch((err) => {
          fetchWeather(28.56, 77.38); //default location noida
          return;
        });
      // return;
    })();
  }, []);
  if (!isLoading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.currentData}>
          <CurrentWeather weatherData={data.current} />
        </View>
        <View style={styles.container}>
          <View>
            <View style={styles.cityContainer}>
              <Text style={styles.text}>Weather Forecast</Text>
              <View style={styles.locationContainer}>
                <Image
                  source={require("./assets/location.png")}
                  style={styles.locationIcon}
                />
                {/* {console.log(city)} */}
                <Text style={styles.cityName}>{city}</Text>
              </View>
            </View>

            <WeatherCard weatherData={data.daily} />
          </View>
        </View>
      </View>
    );
  } else {
    //displaying loading screen while fetching data
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <LottieView
          source={require("./assets/loader.json")}
          style={{ height: 150, width: 150, alignSelf: "center" }}
          autoPlay
          loop
        />
        <Text style={styles.loading}>Loading Your Location</Text>
      </View>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#ededed",

    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    marginTop: 35,
    borderWidth: 1,
    borderTopColor: "black",
  },
  cityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  locationContainer: {
    flexDirection: "row",
  },
  locationIcon: {
    height: 25,
    width: 20,
    alignSelf: "center",
  },
  loading: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  cityName: {
    fontSize: 25,
    fontWeight: "700",
    textAlignVertical: "center",
    color: "grey",
    paddingLeft: 5,
  },
  currentData: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
