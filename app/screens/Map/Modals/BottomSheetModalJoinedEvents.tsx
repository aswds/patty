import React, { PropsWithChildren, Ref, useMemo } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ModalProps } from "./Types/Modals";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../src/colors";

interface BottomSheetModalProps extends PropsWithChildren, ModalProps {
  modalRef: Ref<BottomSheet>;
}

const BottomSheetModalJoinedEvents: React.FC<BottomSheetModalProps> = ({
  modalRef,
  children,
  onClose,
}) => {
  // variables
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const insets = useSafeAreaInsets();
  // render

  return (
    <BottomSheet
      style={styles.container}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      onClose={onClose}
      ref={modalRef}
      backgroundStyle={styles.backgroundStyle}
      handleIndicatorStyle={{
        backgroundColor: "gray",
      }}
      containerStyle={{
        overflow: "hidden",
      }}
    >
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom },
        ]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundStyle: {
    backgroundColor: colors.modalBackground,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

export default BottomSheetModalJoinedEvents;
