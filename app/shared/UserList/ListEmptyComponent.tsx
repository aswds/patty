import React from "react";

import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "../Loaders/Loader";
import ListLoader from "../Loaders/ListLoader";

interface ListEmptyComponentProps {
  title: string;
  style?: ViewStyle;
  icon?: React.ReactNode;
  titleContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  buttonContainer?: ViewStyle;
  button?: React.ReactNode;
  textProps?: TextProps;
}

const ListEmptyComponent = ({
  titleContainerStyle,
  title,
  style,
  icon,
  textStyle,
  buttonContainer,
  button,
  textProps,
}: ListEmptyComponentProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        {icon ? (
          icon
        ) : (
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={55}
            color={colors.iconColor}
          />
        )}
      </View>
      <View style={titleContainerStyle}>
        <Text style={[styles.textStyle, textStyle]} {...textProps}>
          {title}
        </Text>
      </View>
      {button && <View style={buttonContainer}>{button}</View>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  iconContainer: {
    marginVertical: "1%",
    alignSelf: "center",
  },
  textStyle: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: colors.iconColor,
    textAlign: "center",
  },
});
export default ListEmptyComponent;
