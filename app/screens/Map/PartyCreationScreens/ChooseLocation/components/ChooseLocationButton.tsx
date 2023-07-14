import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ICoordinates, IFullAddress } from "../../../../../Types/Events";
import { PartyCreationNavigationProps } from "../../../../../Types/MapStack/ScreenNavigationProps";
import { colors } from "../../../../../src/colors";

interface ChooseLocationButtonProps {
  region: ICoordinates | undefined;
  fullAddress?: IFullAddress | null;
  outsideCity: boolean;
}

export default function ChooseLocationButton({
  region,
  fullAddress,
  outsideCity,
}: ChooseLocationButtonProps) {
  const navigation = useNavigation<PartyCreationNavigationProps>();
  return (
    <View style={styles.locationButtonCallout}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (fullAddress?.label && region && !outsideCity) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate("LocationAndTime", {
              region: region,
              addressTitle: fullAddress.label,
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
