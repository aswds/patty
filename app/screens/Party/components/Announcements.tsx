import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Title } from "../../../shared/Title/Title";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../src/colors";

const Announcements = () => {
  return (
    <View style={styles.container}>
      <Title
        title="Announcements"
        icon={
          <AntDesign
            name="notification"
            size={20}
            color={colors.text}
            style={{
              transform: [{ rotateY: "180deg" }],
              marginHorizontal: "5%",
            }}
          />
        }
      />
    </View>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
  },
});
