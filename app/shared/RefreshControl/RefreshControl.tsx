import React, { Dispatch, SetStateAction, useState } from "react";
import { RefreshControl, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import { onRefresh } from "./refreshControlFuncs";

interface CustomRefreshControlProps {
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  refreshing: boolean;
  onRefreshFunction?: () => void;
}

const CustomRefreshControl = ({
  setRefreshing,
  refreshing,
  onRefreshFunction,
}: CustomRefreshControlProps) => {
  const insets = useSafeAreaInsets();
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefreshFunction ?? onRefresh.bind(null, setRefreshing)}
      tintColor={colors.buttonText}
      style={{ alignItems: "center", justifyContent: "center" }}
    />
  );
};

export default CustomRefreshControl;
