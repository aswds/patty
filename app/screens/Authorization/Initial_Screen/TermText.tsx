import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import { colors } from "../../../src/colors";
import { NavigationProp } from "@react-navigation/native";
import { AuthorizationNavigationProp } from "../../../Types/Authorization/Auth/ScreenNavigationProps";
import { AuthorizationParamList } from "../../../Types/Authorization/Auth/NavigationTypes";
import { FontFamily } from "../../../../assets/fonts/Fonts";

interface TermTextProps {
  style: ViewStyle;
  navigation: NavigationProp<AuthorizationParamList, any>;
}
//  Before you start, please take a moment to read our Terms of Service and Privacy Policy. It's important for you to understand our policies, and by using our app, you agree to abide by them.
export const TermText: React.FC<TermTextProps> = ({ style, navigation }) => {
  return (
    <SafeAreaView style={[styles.textTerms, style]}>
      <Text style={styles.textTermsStyle}>
        Before you start, please take a moment to read our{"\n"}
        <Text
          style={{
            ...styles.textTermsStyle,
            color: colors.blue_text,
          }}
          onPress={() => {
            navigation.navigate("TermsOfService");
          }}
        >
          Terms of service
        </Text>{" "}
        and{" "}
        <Text
          style={{
            ...styles.textTermsStyle,
            color: colors.blue_text,
          }}
          onPress={() => {
            navigation.navigate("PrivacyPolicy");
          }}
        >
          Private Policy
        </Text>
        {"\n"}
        By using our app, you agree to comply with our policies.
      </Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textTerms: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "5%",
    alignSelf: "center",
  },
  textTermsStyle: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: "grey",
    textAlign: "center",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
