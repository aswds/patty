import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../../src/colors";
import { isAndroid } from "../../src/platform";
import React, { FC } from "react";
import { NavigationProp } from "@react-navigation/native";

interface BackButtonProps {
  navigation: NavigationProp<any, any>;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  iconName?: keyof typeof FontAwesome.glyphMap;
  onPress?: () => void;
}

export const BackButton: FC<BackButtonProps> = ({
  navigation,
  style,
  iconColor,
  iconName,
  onPress,
}) => {
  function goBack() {
    navigation.goBack();
  }
  return (
    <TouchableOpacity
      style={[styles.arrowContainer, style]}
      onPress={onPress ?? goBack}
    >
      <FontAwesome
        name={iconName ? iconName : "arrow-left"}
        size={25}
        color={iconColor ?? colors.buttonTextColor}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  arrowContainer: {
    height: 50,
    aspectRatio: 1,
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: isAndroid ? 10 : 0,
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 30,
  },
});
