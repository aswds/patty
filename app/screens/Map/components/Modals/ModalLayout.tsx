import React, { PropsWithChildren, ReactNode } from "react";

import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CloseButton } from "../Buttons/CloseButton";

const borderRadius = 35;

interface ModalLayoutProps extends PropsWithChildren {
  visible: boolean;
  title?: ReactNode;
  hideModal: () => void;
}

const ModalLayout = ({
  visible,
  hideModal,
  title,
  children,
}: ModalLayoutProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal animationType={"slide"} visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={[styles.bottomSheetContainer]}>
          <ScrollView
            contentContainerStyle={{
              padding: 20,
              paddingBottom: insets.bottom,
            }}
          >
            {title && (
              <View style={styles.titleContainer}>
                {title}
                <CloseButton
                  onPress={hideModal}
                  style={{
                    top: 0,
                  }}
                />
              </View>
            )}
            {children}
          </ScrollView>
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
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default ModalLayout;
