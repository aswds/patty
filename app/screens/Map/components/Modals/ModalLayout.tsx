import React, { PropsWithChildren } from "react";

import { Modal, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CloseButton } from "../Buttons/CloseButton";

const borderRadius = 35;

interface ModalLayoutProps extends PropsWithChildren {
  visible: boolean;
  hideModal: () => void;
}

const ModalLayout = ({ visible, hideModal, children }: ModalLayoutProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal animationType={"slide"} visible={visible} transparent={true}>
      <View style={styles.container}>
        <View
          style={[
            styles.bottomSheetContainer,
            { paddingBottom: insets.bottom },
          ]}
        >
          <CloseButton onPress={hideModal} />

          <View style={{}}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "#1E1E1E",
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    padding: 20,
  },
});
export default ModalLayout;
