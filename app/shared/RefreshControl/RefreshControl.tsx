import { Dispatch, SetStateAction } from "react";
import { RefreshControl } from "react-native";
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
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefreshFunction ?? onRefresh.bind(null, setRefreshing)}
      tintColor={colors.buttonText}
    />
  );
};

export default CustomRefreshControl;
