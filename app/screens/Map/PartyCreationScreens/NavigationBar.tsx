import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { BackButton } from "../../../shared/Buttons/BackButton";
import { Title } from "../../../shared/Title/Title";

interface NavigationBarProps {
  navigation: NavigationProp<any, any>;
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  safeAreaViewStyle?: ViewStyle;
  fontStyle?: TextStyle;
  iconName?: keyof typeof FontAwesome.glyphMap;
  description?: string;
}

const NavigationBar = ({
  navigation,
  text,
  style,
  fontStyle,
  onPress,
  safeAreaViewStyle,
  description,
  iconName,
}: NavigationBarProps) => {
  return (
    <View style={[styles.titleContainer, style]}>
      <BackButton
        navigation={navigation}
        onPress={onPress}
        style={{ position: "relative", left: 0, top: 0 }}
        iconName={iconName}
      />
      <Title
        title={text}
        fontStyle={fontStyle}
        containerStyle={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 0,
          flexShrink: 1,
        }}
        description={description}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {},
});
export default NavigationBar;
