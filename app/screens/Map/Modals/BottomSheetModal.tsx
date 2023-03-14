import React, { PropsWithChildren, Ref, useMemo } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { ModalProps } from "./Types/Modals";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../src/colors";

interface BottomSheetModalProps extends PropsWithChildren, ModalProps {
  modalRef: Ref<BottomSheet>;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  modalRef,
  children,
  onClose,
}) => {
  // variables
  const snapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const insets = useSafeAreaInsets();
  // renders
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  return (
    <BottomSheet
      style={styles.container}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
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
        onLayout={handleContentLayout}
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

export default BottomSheetModal;
