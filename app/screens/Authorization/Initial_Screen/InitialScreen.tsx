import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Logo } from "../components/Logo";
import Buttons from "./components/Buttons";
import { colors } from "../../../src/colors";
import { TermText } from "./TermText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthorizationStackScreenProps } from "../../../Types/Authorization/Auth/ScreenNavigationProps";
import { isAndroid } from "../../../src/platform";

export default function InitialScreen({
  navigation,
}: AuthorizationStackScreenProps<"InitialScreen">) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <View style={styles.subContainer}>
            <Logo />
          </View>
          <View style={styles.subContainer}>
            <Buttons navigation={navigation} />
          </View>
        </View>
        <TermText
          style={{ position: "absolute", bottom: isAndroid ? 20 : 0 }}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  subContainer: {
    width: "100%",
    alignItems: "center",
  },
});
