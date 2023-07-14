import React, { PropsWithChildren, useMemo } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { ModalProps } from "./Types/Modals";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
interface BottomSheetModalProps extends PropsWithChildren, ModalProps {}

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
      index={-1}
      enablePanDownToClose
      onClose={onClose}
      ref={modalRef}
      backgroundStyle={styles.backgroundStyle}
      handleIndicatorStyle={{
        backgroundColor: "gray",
      }}
      topInset={insets.top}
      animateOnMount
    >
      <BottomSheetScrollView
        contentContainerStyle={[styles.contentContainer]}
        style={{
          ...styles.container,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundStyle: {
    backgroundColor: colors.modalBackground,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 25,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

export default BottomSheetModal;
