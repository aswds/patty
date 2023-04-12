import React from "react";

import { StyleSheet, View, Text } from "react-native";
import { BackButton } from "../../../shared/Buttons/BackButton";
import { Title } from "../../../shared/Title/Title";
import { colors } from "../../../src/colors";
import { NavigationProp } from "@react-navigation/native";

interface NavigationBarProps {
  navigation: NavigationProp<any, any>;
  text: string;
}

const NavigationBar = ({ navigation, text }: NavigationBarProps) => {
  return (
    <View style={styles.titleContainer}>
      <BackButton
        navigation={navigation}
        style={{ position: "relative", left: 0 }}
      />
      <Title
        title={text}
        fontStyle={{}}
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
