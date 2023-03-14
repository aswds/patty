import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../src/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { PartyCreationNavigationProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { ICoordinates, IFullAddress } from "../../../../Types/Events";

interface ChooseLocationButtonProps {
  region: ICoordinates | undefined;
  fullAddress: IFullAddress | undefined;
}

export default function ChooseLocationButton({
  region,
  fullAddress,
}: ChooseLocationButtonProps) {
  const navigation = useNavigation<PartyCreationNavigationProps>();
  return (
    <View style={styles.locationButtonCallout}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (fullAddress?.Label && region) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate("LocationAndTime", {
              region: region,
              addressTitle: fullAddress.Label,
              fullAddressInfo: fullAddress,
            });
          } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          }
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

    height: "100%",
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
    height: "7%",
  },
});
