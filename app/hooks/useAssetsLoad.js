import { useAssets } from "expo-asset";

export const useAssetsLoad = () => {
  const [isLoaded, error] = useAssets([
    require("../../assets/icon.png"),
    require("../../assets/logo.png"),
    require("../../assets/"),
  ]);
  return { isLoaded, error };
};
