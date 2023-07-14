import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

type LocationLoaderProps = {
  isLoading: boolean;
};
const LocationLoader = ({ isLoading }: LocationLoaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Loading location</Text>
        <ActivityIndicator
          color={colors.accentColor}
          size="small"
          style={styles.activityIndicator}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    bottom: "20%",
    flexDirection: "row",
  },
  content: {
    backgroundColor: "rgba(20, 20, 20, 0.7)",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: colors.accentColor,
    fontFamily: FontFamily.bold,
  },
  activityIndicator: {
    marginHorizontal: 10,
  },
});
export default LocationLoader;
