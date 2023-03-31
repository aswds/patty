import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "../Loaders/Loader";
import ListLoader from "../Loaders/ListLoader";

interface ListEmptyComponentProps {
  title: string;
  isLoading?: boolean;
}

const ListEmptyComponent = ({ title, isLoading }: ListEmptyComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={55}
          color={colors.iconColor}
        />
      </View>
      <View style={{}}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "10%",
  },
  iconContainer: {
    marginVertical: "5%",
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
