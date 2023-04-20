import { SignUpNavNavigatorParamList } from "../SignUp/NavigationTypes";
import { SignInNavNavigatorParamList } from "../SignIn/NavigationTypes";

export type AuthorizationParamList = {
  InitialScreen: undefined;
  SignInNav: SignInNavNavigatorParamList;
  SignUpNav: SignUpNavNavigatorParamList;
};
