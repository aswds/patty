import { useAssets } from "expo-asset";

export const useAssetsLoad = () => {
  const [isLoaded, error] = useAssets([
    require("../../assets/images/pattyLogo2.png"),
  ]);
  return { isLoaded, error };
};
