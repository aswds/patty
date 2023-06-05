import React from "react";

import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
  SafeAreaView,
} from "react-native";
import { BackButton } from "../../../shared/Buttons/BackButton";
import { Title } from "../../../shared/Title/Title";
import { colors } from "../../../src/colors";
import { NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

interface NavigationBarProps {
  navigation: NavigationProp<any, any>;
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  safeAreaViewStyle?: ViewStyle;
  fontStyle?: TextStyle;
  iconName?: keyof typeof FontAwesome.glyphMap;
}

const NavigationBar = ({
  navigation,
  text,
  style,
  fontStyle,
  onPress,
  safeAreaViewStyle,
  iconName,
}: NavigationBarProps) => {
  return (
    <View style={[styles.titleContainer, style]}>
      <BackButton
        navigation={navigation}
        onPress={onPress}
        style={{ position: "relative", left: 0, top: 0 }}
        iconName={iconName}
      />
      <Title
        title={text}
        fontStyle={fontStyle}
        containerStyle={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 0,
          flexShrink: 1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {},
});
export default NavigationBar;
