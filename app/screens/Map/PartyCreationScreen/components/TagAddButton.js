import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../../src/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import TagModal from "./TagModal";
import { isAndroid } from "../../../../src/platform";

export default function TagAddButton({ setTags }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsModalVisible(true);
  }
  return (
    <TouchableOpacity style={styles.tagStyle} onPress={onPress}>
      <Text style={styles.textStyle}>Add tag</Text>
      <Ionicons
        name="add-circle-outline"
        size={25}
        color={colors.iconColor}
        style={{ marginHorizontal: "2%" }}
      />
      <KeyboardAvoidingView
        style={{
          height: "100%",
        }}
        behavior={isAndroid ? "padding" : "height"}
      >
        <TagModal
          setTags={setTags}
          isVisible={isModalVisible}
          hideModal={() => setIsModalVisible(false)}
        />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.input,
    padding: 10,
    height: 50,
    borderRadius: 100,
  },
  tagStyle: {
    padding: 12,
    backgroundColor: colors.input,
    height: 50,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // margin: 5,
    marginLeft: 0,
  },
  textStyle: {
    color: colors.iconColor,
  },
});
