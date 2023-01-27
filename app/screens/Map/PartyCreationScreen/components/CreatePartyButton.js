import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../src/colors";
import { useSelector } from "react-redux";

export default function CreatePartyButton({ data }) {
  const { verifiedEmail } = useSelector((state) => {
    return state.user_state.current_user;
  });
  const { time, location, title, tags } = data;
  const allNecessaryDataPresent = Boolean(
    time,
    location.region,
    location.address,
    title
  );
  function onPress() {
    if (allNecessaryDataPresent && verifiedEmail) {
    } else if (!verifiedEmail) {
      Alert.alert("Please verify your email to continue.");
    } else {
      Alert.alert("Please make sure you entered all data.");
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonBg} onPress={onPress}>
        <Text style={styles.textStyle}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonBg: {
    backgroundColor: colors.accentColor,
    height: 50,
    marginVertical: "10%",
    width: "100%",
    borderRadius: 999999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 16,
    color: colors.buttonTextColor,
  },
});
