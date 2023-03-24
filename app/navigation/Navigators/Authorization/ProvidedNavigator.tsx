import { AuthContextProvider } from "./components/AuthContext";
import { RootNavigator } from "../../App_navigation/RootNavigator";

export const ProvidedNavigator = () => {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
};
