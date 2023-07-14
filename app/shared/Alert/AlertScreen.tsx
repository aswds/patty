import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { isAndroid } from "../../src/platform";

interface AlertScreenProps extends PropsWithChildren {
  showModal: boolean;
  hideModal: () => void;
}

const AlertScreen: React.FC<AlertScreenProps> = ({
  hideModal,
  showModal,
  children,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={hideModal}
      style={{ justifyContent: "center" }}
    >
      <Pressable
        style={[
          !isAndroid ? styles.iOSBackdrop : styles.androidBackdrop,
          styles.backdrop,
        ]}
        onPress={hideModal}
      />

      <View
        style={{ flex: 1, justifyContent: "center" }}
        pointerEvents="box-none"
      >
        {children}
      </View>
    </Modal>
  );
};

export default AlertScreen;

const styles = StyleSheet.create({
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
