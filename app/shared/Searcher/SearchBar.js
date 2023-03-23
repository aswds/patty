import React from "react";
import {StyleSheet, TextInput, View} from "react-native";

export default function SearchBar({
  placeholderText,
  style,
  isPlaceSearcher,
  ...rest
}) {
  return (
    <View style={[styles.container, style]}>
      {isPlaceSearcher ? (
        <TextInput
          placeholder={placeholderText}
          {...rest}
          keyboardAppearance={"dark"}
        />
      ) : (
        <TextInput
          placeholder={placeholderText}
          {...rest}
          keyboardAppearance={"dark"}
        />
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
