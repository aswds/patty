import { ImageBackground, StyleSheet, View, SafeAreaView } from "react-native";

export const ACScreen = (props) => {
  return (
    <ImageBackground
      style={{ flex: 1, width: null, height: null }}
      source={require("../../../../../../assets/AE/AvatarChoose-01-01-01.png")}
      blurRadius={0}
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
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});
