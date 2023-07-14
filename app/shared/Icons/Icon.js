import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colors } from "../../src/colors";

export default function Icon({
  Icon,
  icon_name,
  text,
  focused,
  onPress,
  title,
  style,
  textStyle,
}) {
  const color = focused ? colors.accentColor : "black";
  const isMap = title === "Map";
  const DimensionWidth = Dimensions.get("window").width;
  return (
    <View
      style={[
        styles.container,
        {
          height: isMap ? DimensionWidth * 0.16 : DimensionWidth * 0.14,
          marginBottom: isMap ? 20 : 0,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Icon name={icon_name} size={isMap ? 35 : 25} color={color} />
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 100,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
