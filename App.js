import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LoginAndRegister } from "./app/navigation/SignIn&SingUp/SignIn_SignUp_nav";
export default function App() {
  const [isLoaded, error] = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "WorkSans-Bold": require("./assets/fonts/WorkSans/WorkSans-Bold.ttf"),
    "WorkSans-Regular": require("./assets/fonts/WorkSans/WorkSans-Regular.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito/static/Nunito-Bold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito/static/Nunito-Regular.ttf"),
  });
  let cacheResources = async () => {
    const images = require("./assets/images/logoAuth.png");

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
      <LoginAndRegister />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
