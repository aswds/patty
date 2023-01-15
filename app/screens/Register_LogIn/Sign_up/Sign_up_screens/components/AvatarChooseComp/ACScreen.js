import { ImageBackground, StyleSheet, View, SafeAreaView } from "react-native";
import { colors } from "../../../../../../src/colors";

export const ACScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        width: null,
        height: null,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.container}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {props.children}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});
