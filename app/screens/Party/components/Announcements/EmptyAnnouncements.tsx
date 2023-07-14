import Ionicons from "@expo/vector-icons/build/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { colors } from "../../../../src/colors";

const EmptyAnnouncementsList = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="chatbubble-outline" size={25} color={colors.text_2} />
      <Text style={styles.text}>No Announcements Yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    color: "#555555",
    fontFamily: FontFamily.bold,
  },
});

export default EmptyAnnouncementsList;
