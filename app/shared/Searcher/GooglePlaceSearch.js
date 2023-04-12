import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../src/colors";

export default function GooglePlaceSearch({ style, setLocation }) {
  return (
    <View style={[styles.container, style]}>
      <GooglePlacesAutocomplete
        placeholder={"Search location"}
        returnKeyType={"default"}
        fetchDetails={true}
        query={{
          key: "AIzaSyCPNfHc1tXamJ5l-ujrjrW8ZNrQ5iw4STk",

          //   location: "latitude,longitude",
        }}
        styles={searchBarStyle}
        onPress={(data, details = null) =>
          console.log(data.description, setLocation(details.geometry.location))
        }
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        enablePoweredByContainer={false}
      />
    </View>
  );
}

const searchBarStyle = {
  textInputContainer: {
    paddingHorizontal: 10,
  },
  textInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: 9999,
    color: colors.text_2,
    padding: 20,
    width: "100%",
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderColor: "#c8c7cc",
    borderTopWidth: 0.5,
  },

  row: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#c8c7cc",
  },
  description: {},
  loader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 20,
  },
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
  },
  searchBarContainer: { height: "45%", width: "75%" },
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: colors.input,
    height: "40%",
    width: "80%",
    // paddingHorizontal: "2%",
    borderRadius: 999999,
    top: "10%",
  },

  textInput: {
    color: "#5d5d5d",
    fontSize: 14,
    backgroundColor: "transparent",
    borderRadius: 999999,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
});
