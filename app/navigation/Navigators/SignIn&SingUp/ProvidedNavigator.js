import { AuthContextProvider } from "./components/AuthContext";
import { RootNavigator } from "../../App_navigation/RootNavigator";

export const ProvidedNavigator = (props) => {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
};
