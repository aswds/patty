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

interface NavigationBarProps {
  navigation: NavigationProp<any, any>;
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  fontStyle?: TextStyle;
}

const NavigationBar = ({
  navigation,
  text,
  style,
  fontStyle,
  onPress,
}: NavigationBarProps) => {
  return (
    <SafeAreaView>
      <View style={[styles.titleContainer, style]}>
        <BackButton
          navigation={navigation}
          onPress={onPress}
          style={{ position: "relative", left: 0 }}
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
    </SafeAreaView>
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
