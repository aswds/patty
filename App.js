import { StatusBar, StyleSheet, View } from "react-native";
import { useFontsLoad } from "./app/hooks/useFontsLoad";
import { ProvidedNavigator } from "./app/navigation/SignIn&SingUp/ProvidedNavigator";
import { Asset } from "expo-asset";

export default function App() {
  const { isLoaded, error } = useFontsLoad();

  let cacheResources = async () => {
    const images = [
      require("./assets/images/logoAuth.png"),
      require("./assets/images/noImage-01.png"),
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
