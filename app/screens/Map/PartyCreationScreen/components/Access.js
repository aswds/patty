import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Title } from "./TagList";
import { colors } from "../../../../src/colors";
import * as Haptics from "expo-haptics";
import { FontAwesome5 } from "@expo/vector-icons";

const Access = ({ setAccess }) => {
  const [AccessType, setAccessType] = useState("public");

  function Button({ title, isFocused, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.buttonStyle,
          {
            backgroundColor: isFocused
              ? colors.accentColor
              : colors.disabledButton,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.buttonTextStyle,
            { color: isFocused ? colors.buttonTextColor : colors.disabledText },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  function onPress(access_type) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAccessType(access_type);
    setAccess(access_type);
  }
  function TitleIcon() {
    return (
      <View style={{ marginBottom: 5, marginLeft: 5 }}>
        <FontAwesome5 name="user-lock" size={20} color={colors.iconColor} />
      </View>
    );
  }

  function Buttons() {
    return (
      <View style={styles.buttonsContainer}>
        {/*<Button*/}
        {/*  title={"Private"}*/}
        {/*  isFocused={AccessType === "private"}*/}
        {/*  onPress={onPress.bind(null, "private")}*/}
        {/*/>*/}
        <Button
          title={"Public"}
          isFocused={AccessType === "public"}
          onPress={onPress.bind(null, "public")}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Title title={"Access"} icon={<TitleIcon />} />
      <Buttons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, flex: 1, justifyContent: "center" },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: colors.accentColor,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999999,
    height: 40,
  },
  buttonTextStyle: {
    color: colors.buttonTextColor,
  },
});
export default Access;
