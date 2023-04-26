import React, { useState } from "react";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
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
import { text_modifier_tags } from "../../../../services/text_modifier";

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
    if (tagTitle.length > 0 && tagTitle.length <= 20) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTags(addTag);
      hideModal();
    } else {
      if (!tagTitle.length > 0) {
        Alert.alert(`Tag can't be smaller than 1.😶‍🌫️`);
      }
      if (tagTitle.length > 0 && tagTitle.length <= 20) {
        Alert.alert(`Tag can't be longer than 20 characters.😶‍🌫️`);
      }
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
        <Text style={[styles.textStyle, { color: colors.cancel }]}>Cancel</Text>
      </TouchableOpacity>
    );
  }
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.modalView}>
              <Input
                style={{
                  width: "70%",
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
              <View style={styles.buttonsContainer}>
                <CloseButton />
                <AddButton />
              </View>
            </View>
          </KeyboardAvoidingView>
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
  buttonsContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "space-evenly",
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
    height: 200,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 40,
  },
});
