import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../../src/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function ChooseLocationButton({ region, address }) {
  const navigation = useNavigation();
  return (
    <View style={styles.locationButtonCallout}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("PartyCreationScreen", { region, address });
        }}
      >
        <MaterialCommunityIcons
          name="map-marker-check-outline"
          size={40}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    // make button bg

    height: 70,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.accentColor,
    justifyContent: "center",
    alignItems: "center",
  },
  locationButtonCallout: {
    // make location button position
    position: "absolute",
    bottom: "10%",
    alignSelf: "center",
  },
});
