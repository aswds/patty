import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

type EventLoaderProps = {
  isLoading: boolean;
};
const EventLoader = ({ isLoading }: EventLoaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: colors.modalBackground,
        zIndex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        top: insets.top + 10,
        padding: 10,
        flexDirection: "row",
      }}
    >
      <Text
        style={{ color: colors.accentColor, fontFamily: FontFamily.medium }}
      >
        Loading events in your city
      </Text>
      <ActivityIndicator
        color={colors.accentColor}
        size={"small"}
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
};

export default EventLoader;
