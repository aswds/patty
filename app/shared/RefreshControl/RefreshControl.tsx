import React, { Dispatch, SetStateAction } from "react";
import { RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import { onRefresh } from "./refreshControlFuncs";

interface CustomRefreshControlProps {
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  refreshing: boolean;
}

const CustomRefreshControl = ({
  setRefreshing,
  refreshing,
}: CustomRefreshControlProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh.bind(null, setRefreshing)}
        tintColor={colors.buttonText}
        style={{ alignItems: "flex-end", zIndex: 1 }}
      />
    </View>
  );
};

export default CustomRefreshControl;
