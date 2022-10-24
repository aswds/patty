import { useAssets } from "expo-asset";

export const useAssetsLoad = () => {
  const [isLoaded, error] = useAssets([
    require("../../assets/images/pattyLogo2.png"),
    require("../../assets/AE"),
  ]);
  return { isLoaded, error };
};
