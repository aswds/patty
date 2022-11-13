import {
  NavigationContainer,
  StackActions,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { AuthContextProvider } from "./components/AuthContext";
import { NavigationController } from "../App_navigation/NavigationController";
export const ProvidedNavigator = (props) => {
  return (
    <AuthContextProvider>
      <NavigationController />
    </AuthContextProvider>
  );
};
