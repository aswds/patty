import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileNavigatorParamList } from "../../Types/ProfileStack/NavigationTypes";
import Recovery from "../../screens/Authorization/Recovery";
import ChangeBio from "../../screens/Profile/EditProfile/ChangeBio/ChangeBio";
import ChangeUsername from "../../screens/Profile/EditProfile/ChangeUsername/ChangeUsername";
import EditProfile from "../../screens/Profile/EditProfile/EditProfile";
import Profile from "../../screens/Profile/Profile";
import ChangeEmail from "../../screens/VerifyEmail/ChangeEmail";
import VerifyEmail from "../../screens/VerifyEmail/VerifyEmail";
import { isAndroid } from "../../src/platform";

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

export const ProfileNavigator = () => {
  const radius = isAndroid ? 0 : 50;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Profile} name="Profile" />

      <Stack.Screen component={EditProfile} name="EditProfile" />
      <Stack.Group
        screenOptions={{
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen component={ChangeEmail} name="ChangeEmail" />
        <Stack.Screen component={ChangeBio} name="ChangeBio" />
        <Stack.Screen component={ChangeUsername} name="ChangeUsername" />

        <Stack.Screen component={Recovery} name="ChangePassword" />
      </Stack.Group>
      <Stack.Screen component={VerifyEmail} name="VerifyEmail" />
    </Stack.Navigator>
  );
};
