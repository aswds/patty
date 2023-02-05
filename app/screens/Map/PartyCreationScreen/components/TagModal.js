import React, { useState } from "react";

import {
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../../src/colors";
import { AntDesign } from "@expo/vector-icons";
import Input from "../../../../shared/Input/Input";
import * as Haptics from "expo-haptics";
import { text_modifier_tags } from "../../../Register_LogIn/Sign_up/Sign_up_screens/Sign_up_Functions/text_modifier";

export default function TagModal({ setTags, isVisible, hideModal }) {
  const [tagTitle, setTagTitle] = useState("");
  function onChangeText(text) {
    setTagTitle(text_modifier_tags(text));
  }
  function onClose() {
    hideModal();
  }
  function addTag(_tags) {
    if (_tags.length < 7) {
      return [..._tags, text_modifier_tags(tagTitle)];
    } else {
      Alert.alert("You can only add 7 tags");

      return [..._tags];
    }
  }
  function onAdd() {
    if (tagTitle.length > 0 && tagTitle.length < 20) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTags(addTag);
      hideModal();
    } else {
      Alert.alert(`Tag can't be longer than 20 characters or less than 1`);
    }
    setTagTitle("");
  }

  function AddButton() {
    return (
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={[styles.textStyle, { color: colors.text }]}>Add</Text>
      </TouchableOpacity>
    );
  }
  function CloseButton() {
    return (
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={[styles.textStyle, { color: colors.cancel }]}>Cancle</Text>
      </TouchableOpacity>
    );
  }
  return (
    <Modal
      transparent
      style={styles.container}
      visible={isVisible}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View>
              <Input
                style={{
                  width: "60%",
                  alignSelf: "center",
                  borderRadius: 20,
                }}
                onChangeText={onChangeText}
                icon={
                  <AntDesign name="tago" size={25} color={colors.iconColor} />
                }
                isValid={true}
                placeholder="Tag title"
                defaultValue={tagTitle}
                inputStyle={{ width: "80%" }}
              />
            </View>

            <View style={styles.butonsContainer}>
              <CloseButton />
              <AddButton />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  textStyle: {},
  butonsContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    width: "35%",
    height: "50%",
    borderRadius: 30,
    backgroundColor: colors.input,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: "25%",
    width: "80%",
    justifyContent: "center",
    backgroundColor: colors.background,
    borderRadius: 40,
  },
});
