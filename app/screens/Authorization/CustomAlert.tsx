import React from "react";
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CustomAlertProps {
  showModal: boolean;
  hideModal: () => void;
  errorMsg: string;
  testID?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  showModal,
  hideModal,
  errorMsg,
}) => {
  return (
    <View testID="alert">
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={hideModal}
      >
        <Pressable
          style={[
            Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
            styles.backdrop,
          ]}
          onPress={hideModal}
        />

        <SafeAreaView>
          <View style={styles.modalContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>{errorMsg}</Text>
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
    width: "85%",
  },
  textContainer: {
    backgroundColor: "rgba(40,40,40,1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 30,
  },
  textStyle: { color: "rgba(110,110,110,1)", textAlign: "center" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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

export default CustomAlert;
