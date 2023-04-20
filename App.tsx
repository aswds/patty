import { StatusBar, StyleSheet, View } from "react-native";
import { useFontsLoad } from "./app/hooks/useFontsLoad";
import { ProvidedNavigator } from "./app/navigation/Navigators/Authorization/ProvidedNavigator";
import { Asset } from "expo-asset";
import { StrictMode, useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { getUserLocation } from "./app/shared/GetLocationFunctions/getUserLocation";
import React from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { isDarkTheme } from "./app/src/theme";
// Setting splash screen
SplashScreen.preventAutoHideAsync();
export default function App() {
  const { isLoaded, error } = useFontsLoad();
  let cacheResources = async () => {
    const images = [
      require("./assets/logo.png"),
      require("./assets/images/noImage-01.png"),
    ];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await cacheResources();
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady || isLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      // SplashScreen.hideAsync()
    }
  }, [appIsReady]);

  if (!appIsReady || !isLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        {/* <StrictMode> */}
        <BottomSheetModalProvider>
          <ProvidedNavigator />
        </BottomSheetModalProvider>

        {/* </StrictMode> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
