import { useFonts } from "expo-font";

export const useFontsLoad = () => {
  const [isLoaded, error] = useFonts({
    "Lato-Regular": require("../../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../../assets/fonts/Lato/Lato-Bold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "WorkSans-Bold": require("../../assets/fonts/WorkSans/WorkSans-Bold.ttf"),
    "WorkSans-Regular": require("../../assets/fonts/WorkSans/WorkSans-Regular.ttf"),
    "WorkSans-Medium": require("../../assets/fonts/WorkSans/WorkSans-Medium.ttf"),
    "WorkSans-SemiBold": require("../../assets/fonts/WorkSans/WorkSans-SemiBold.ttf"),
    "Nunito-ExtraBold": require("../../assets/fonts/Nunito/static/Nunito-ExtraBold.ttf"),
    "Nunito-Bold": require("../../assets/fonts/Nunito/static/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("../../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../../assets/fonts/Nunito/static/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
  });

  return { isLoaded, error };
};
