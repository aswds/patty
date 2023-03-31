import React from "react";

import { StyleSheet, View } from "react-native";
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
        fontStyle={{ fontSize: 22, color: colors.text_2 }}
        containerStyle={{ marginBottom: 0 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
});
export default NavigationBar;
