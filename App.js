import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { LoginAndRegister } from "./app/navigation/SignIn&SingUp/SignIn_SignUp_nav";
import { useFontsLoad } from "./app/hooks/useFontsLoad";
import { ProvidedNavigator } from "./app/navigation/SignIn&SingUp/ProvidedNavigator";
import { StatusBar } from "react-native";
export default function App() {
  const { isLoaded, error } = useFontsLoad();

  let cacheResources = async () => {
    const images = [
      require("./assets/images/logoAuth.png"),
      require("./assets/AE/NameInfo-01.png"),
      require("./assets/AE/SignUpBckgr.png"),
      require("./assets/AE/AvatarChoose-01-01-01.png"),
    ];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };
  if (!isLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ProvidedNavigator />
      {console.log("f")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
