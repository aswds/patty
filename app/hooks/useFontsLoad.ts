import { useFonts } from "expo-font";

export const useFontsLoad = () => {
  const [isLoaded, error] = useFonts({
    "Lato-Regular": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Nunito-ExtraBold": require("../../assets/fonts/Nunito/static/Nunito-ExtraBold.ttf"),
    "Nunito-Bold": require("../../assets/fonts/Nunito/static/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("../../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../../assets/fonts/Nunito/static/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    "Baloo2-Regular": require("../../assets/fonts/Baloo2/Baloo2-Regular.ttf"),
    "Baloo2-SemiBold": require("../../assets/fonts/Baloo2/Baloo2-SemiBold.ttf"),
    "Baloo2-ExtraBold": require("../../assets/fonts/Baloo2/Baloo2-ExtraBold.ttf"),
    "Baloo2-Medium": require("../../assets/fonts/Baloo2/Baloo2-Medium.ttf"),
    "Baloo2-Bold": require("../../assets/fonts/Baloo2/Baloo2-Bold.ttf"),
  });

  return { isLoaded, error };
};
