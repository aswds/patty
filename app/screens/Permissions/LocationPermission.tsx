import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Screen } from "../../shared/Screen/Screen";
import Text from "../../shared/Text/BoldText";
import { colors } from "../../src/colors";
import Button from "../../shared/Buttons/BigButton";
import * as Location from "expo-location";
const LocationPermissionScreen: React.FC = () => {
  const grantPermission = () => {
    if (foreground?.status !== Location.PermissionStatus.GRANTED) {
      requestForeground();
    } else if (background?.status !== Location.PermissionStatus.GRANTED) {
      requestBackground();
    }
  };
  const [foreground, requestForeground] = Location.useForegroundPermissions();
  const [background, requestBackground] = Location.useBackgroundPermissions();

  return (
    <Screen>
      <View style={styles.container}>
        <Text textStyles={styles.title}>Location Permission Denied</Text>
        <Text textStyles={styles.text}>
          Please grant location permission to continue using the app.
        </Text>
      </View>
      <View style={styles.container}>
        <Button
          onPress={grantPermission}
          title="Grant permission"
          style={{ width: "100%", marginBottom: "5%" }}
        />
        {/* <Button
          onPress={openSettings}
          title="Open settings"
          style={{ width: "100%" }}
        /> */}
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
  },
  text: {
    textAlign: "center",
  },
});
export default LocationPermissionScreen;
