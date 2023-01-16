import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default function SearchBar({
  placeholderText,
  style,
  isPlaceSearcher,
  ...rest
}) {
  return (
    <View style={[styles.container, style]}>
      {isPlaceSearcher ? (
        {}
      ) : (
        <TextInput placeholder={placeholderText} {...rest} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "80%",
    position: "absolute",
  },
});
