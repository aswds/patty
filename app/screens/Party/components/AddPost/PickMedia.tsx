import { EvilIcons } from "@expo/vector-icons";
import _ from "lodash";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { MediaItem } from "../../../../Types/Events";
import { colors } from "../../../../src/colors";

interface MediaComponentProps {
  media?: MediaItem;
  handleMediaPick: () => void;
}

const MediaComponent = ({ media, handleMediaPick }: MediaComponentProps) => {
  if (media && !_.isEmpty(media)) {
    return (
      <TouchableOpacity
        onPress={handleMediaPick}
        style={styles.mediaPickedView}
      >
        <Text style={styles.pickMediaButtonText}>Pick Media</Text>
        <EvilIcons name="image" size={30} style={styles.pickMediaButtonIcon} />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.pickMediaButton}
        onPress={handleMediaPick}
      >
        <Text style={styles.pickMediaButtonText}>Pick Media</Text>
        <EvilIcons name="image" size={30} style={styles.pickMediaButtonIcon} />
      </TouchableOpacity>
    );
  }
};
export default MediaComponent;
const styles = StyleSheet.create({
  pickMediaButton: {
    backgroundColor: "rgba(155, 50, 50, 0.2)",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.accentColor,
    borderRadius: 20,
    width: "100%",
    aspectRatio: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  mediaPickedView: {
    flexDirection: "row",
    marginVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  pickMediaButtonText: {
    color: colors.accentColor,
    fontFamily: FontFamily.bold,
    fontSize: 20,
  },
  pickMediaButtonIcon: {
    color: colors.accentColor,
  },
  placeholderView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginBottom: "5%",
  },
});
