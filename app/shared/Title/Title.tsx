import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../src/colors";
import React from "react";

interface ITitle {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
}

export function Title({ title, icon, description }: ITitle) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.textStyle}>{title}</Text>
        </View>

        {icon}
      </View>
      <Text style={styles.descriptionTextStyle}>{description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: colors.iconColor,
    fontSize: 26,
    fontFamily: "WorkSans-Bold",
  },
  descriptionTextStyle: {
    fontFamily: "WorkSans-Medium",
    fontSize: 15,
    color: colors.iconColor,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    marginBottom: "5%",
  },
});
