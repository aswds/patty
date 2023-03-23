import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {styles} from "./styles";

interface DoPartyButtonProps {
  onPress: () => void;
}

export default function DoPartyButton(props: DoPartyButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.buttonContainer, styles.mainButton]}
    >
      <Text numberOfLines={1} style={styles.textStyle}>
        make a party
      </Text>
      {/*<AntDesign name="pluscircle" size={40} color={colors.accentColor} />*/}
      {/*<Ionicons name="add-sharp"  />*/}
    </TouchableOpacity>
  );
}
// const styles = StyleSheet.create({
//   buttonContainer: {
//     alignSelf: "center",
//   },
//   button: {},
//
//   icon: {},
//   textContainer: {
//     marginTop: 10,
//   },
//   textStyle: {
//     fontFamily: FontFamily.bold,
//     color: colors.iconColor,
//     fontSize: 15,
//     opacity: 0.8,
//   },
// });
