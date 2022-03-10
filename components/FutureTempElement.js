import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";

import moment from "moment-timezone";

const FutureTempElement = ({ data }) => {
  //defining variables to use in rendering items
  if (data && data.weather) {
    let img = {
      uri:
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png",
    };
    const speed = data.wind_speed;
    const minTemp = data.temp.min;
    const maxTemp = data.temp.max;
    const sky = data.weather[0].main;
    const pop = data.pop;
    const date = moment(data.dt * 1000).format("Do MMMM");
    const icon = data.weather[0].main;

    //setting the weather icons
    switch (icon) {
      case "Clear":
        img = require("../assets/sky/clear.png");
        break;
      case "Clouds":
        img = require("../assets/sky/clouds.png");
        break;
      case "Rain":
        img = require("../assets/sky/rain.png");
        break;
      case "Snow":
        img = require("../assets/sky/snow.png");
        break;
      case "Thunderstorm":
        img = require("../assets/sky/thunderstorm.png");
        break;
      default:
        img = require("../assets/sky/clear.png");
        break;
    }

    //finding the wind Location
    let deg = data.wind_deg;
    if (deg >= 0 && deg < 90) {
      deg = "North-East";
    } else {
      if (deg >= 90 && deg < 180) {
        deg = "South-East";
      } else {
        if (deg >= 180 && deg < 270) {
          deg = "South-West";
        } else {
          if (deg >= 270 && deg < 360) {
            deg = "North-West";
          }
        }
      }
    }

    //returning the item
    return (
      <View style={styles.container}>
        {/* view for the 1st row of the card */}

        <View style={styles.tempRow}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.temp}>{maxTemp}</Text>
            <View style={{ height: 25 }}>
              <Text style={styles.superScriptText}>°C</Text>
            </View>
            <Text> Max</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Min </Text>
            <Text style={styles.temp}>{minTemp}</Text>
            <View style={{ height: 25 }}>
              <Text style={styles.superScriptText}>°C</Text>
            </View>
          </View>
        </View>
        {/* view for the middle row of the card */}
        <View style={styles.middle}>
          <Image style={styles.weatherIcon} source={img} />
          <View style={styles.date}>
            <Text style={styles.sky}>{sky}</Text>
            <Text>{date}</Text>
          </View>
        </View>

        {/* view for the last row of the card */}
        <View style={styles.wind}>
          <View style={{ alignItems: "flex-start", paddingBottom: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                resizeMode="contain"
                style={{ height: 18, width: 18 }}
                source={require("../assets/wind.png")}
              />
              <Text> {speed} km/hr</Text>
            </View>
            <Text>{deg}</Text>
          </View>
          <View style={{ alignItems: "flex-end", paddingBottom: 20 }}>
            <Text>{pop * 100} %</Text>
            <Text>Chances of rain</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default FutureTempElement;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 350,
    backgroundColor: "#f2e9d7",
    marginLeft: 10,
    marginRight: 3,
    marginVertical: 25,
    borderRadius: 8,
    justifyContent: "center",
    // padding: 20,
  },
  temp: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 3,
  },
  tempRow: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 15,
    justifyContent: "space-between",
  },
  superScriptText: {
    fontSize: 12,
    textAlignVertical: "top",
  },
  middle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 35,
  },
  date: {
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  wind: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    // marginBottom: 15,
    // paddingBottom: 10,
  },
  weatherIcon: {
    height: 40,
    width: 40,
  },
  sky: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
