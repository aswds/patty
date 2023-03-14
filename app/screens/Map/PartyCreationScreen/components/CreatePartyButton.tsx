import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../src/colors";
import { addPartyOnMap } from "../addPartyOnMap";
import { useNavigation } from "@react-navigation/native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../Types/Events";
import { MapNavigationProps } from "../../../../Types/MapStack/ScreenNavigationProps";

interface CreatePartyButtonProps {
  data: IEvent;
}

export default function CreatePartyButton({ data }: CreatePartyButtonProps) {
  const navigation = useNavigation<MapNavigationProps>();
  const { time, location, title } = data;
  const allNecessaryDataPresent =
    time && location?.region && location?.fullAddressInfo && title;
  function onPress() {
    if (allNecessaryDataPresent) {
      addPartyOnMap(data).then(() => {
        navigation.navigate("Map");
      });
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
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: colors.buttonTextColor,
  },
});
