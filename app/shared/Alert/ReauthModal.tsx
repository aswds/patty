import Input from "../Input/Input";
import { useState } from "react";
import { KeyboardAvoidingView, Modal, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { colors } from "../../src/colors";
import Button from "../Buttons/Button";
import BoldText from "../Text/BoldText";
import { FontFamily } from "../../../assets/fonts/Fonts";
export function ReauthModal({ visible, onSubmit, onCancel, error }) {
  const [password, setPassword] = useState("");

  if (!visible) return null;

  return (
    <Modal animationType="fade" transparent>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <BoldText textStyles={{ alignSelf: "center", fontSize: 15 }}>
              Please enter your password to continue
            </BoldText>
            <Input
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isValid
              style={{ width: "100%" }}
            />
            <BoldText textStyles={{ color: colors.buttonText }}>
              {error}
            </BoldText>
            <View style={styles.buttonContainer}>
              <Button
                text="Submit"
                onPress={() => onSubmit(password)}
                style={styles.buttonStyle}
                textStyled={{
                  color: colors.doneButtonText,
                  fontFamily: FontFamily.bold,
                }}
              />
              <Button
                text="Cancel"
                onPress={onCancel}
                style={[
                  styles.buttonStyle,
                  { backgroundColor: colors.buttonBG, marginTop: 10 },
                ]}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 20,
  },
  buttonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: colors.doneButtonBG,
  },
  buttonContainer: { marginVertical: "5%", justifyContent: "space-evenly" },
});
