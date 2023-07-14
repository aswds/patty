import React, { ReactNode } from "react";

import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { colors } from "../../src/colors";
interface PartyInfoIconProps extends ViewProps {
  Icon?: typeof React.Component;
  name?: string;
  text?: string | ReactNode;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
  iconSize?: number;
  additionalText?: ReactNode;
}
export function PartyInfoIcon({
  Icon,
  name,
  text,
  textStyle,
  iconSize,
  iconStyle,
  additionalText,
  ...props
}: PartyInfoIconProps) {
  return (
    <View style={styles.containerWithIcon} {...props}>
      {Icon && (
        <Icon
          name={name}
          size={iconSize ?? 34}
          color={colors.iconColor}
          style={iconStyle}
        />
      )}
      <Text style={[textStyle, {}]}>{text}</Text>
      {additionalText}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
});

export default PartyInfoIcon;
