import React, { ReactElement, ReactNode } from "react";

import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { colors } from "../../src/colors";
interface PartyInfoIconProps extends ViewProps {
  Icon: typeof React.Component;
  name: string;
  text?: string | ReactNode;
  textStyle?: TextStyle;
  iconSize?: number;
}
export function PartyInfoIcon({
  Icon,
  name,
  text,
  textStyle,
  iconSize,
  ...props
}: PartyInfoIconProps) {
  return (
    <View style={styles.containerWithIcon} {...props}>
      <Icon name={name} size={iconSize ?? 34} color={colors.iconColor} />
      <Text style={[textStyle, { marginLeft: 10 }]}>{text}</Text>
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
