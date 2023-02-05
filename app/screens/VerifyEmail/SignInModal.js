import React from "react";
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Input from "../../shared/Input/Input";
import Button from "../Register_LogIn/components/button";
import { colors } from "../../src/colors";

const SignInModal = (props) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.showModal}
        onRequestClose={props.hideModal}
      >
        <Pressable
          style={[
            Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
            styles.backdrop,
          ]}
          onPress={props.hideModal}
        />

        <SafeAreaView>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: colors.background,
                height: "50%",
                alignItems: "center",
                justifyContent: "space-around",
                width: "90%",
              }}
            >
              <View>
                <Input style={styles.inputStyle} />
                <Input style={styles.inputStyle} />
              </View>
              <Button>Hello</Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  inputStyle: { width: "80%" },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SignInModal;
