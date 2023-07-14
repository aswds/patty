import { Dimensions, StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { colors } from "../../../src/colors";
import { isAndroid } from "../../../src/platform";

interface RenderItemProps {
  eventInfo: any;
}

export default function RenderItem({
  eventInfo,
}: RenderItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textNumberStyle}>{eventInfo.data}</Text>
      </View>
      <View>
        <Text style={styles.textStyle}>{eventInfo.title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: isAndroid
      ? Dimensions.get("window").height * 0.2
      : Dimensions.get("window").height * 0.15,
    backgroundColor: colors.input,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    margin: 10,
    shadowColor: isAndroid ? "grey" : "rgba(0, 0, 0, 0.7)",
    borderRadius: 45,
    elevation: 5,
  },
  textNumberStyle: {
    fontFamily: FontFamily.bold,
    color: colors.text,
    fontSize: 20,
  },
  textStyle: {
    color: colors.text,
    fontFamily: FontFamily.medium,
  },
  textStyleUsername: {
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
});
