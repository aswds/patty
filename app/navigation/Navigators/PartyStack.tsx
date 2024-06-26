import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PartyNavigatorParamList } from "../../Types/PartyStack/NavigationTypes";
import PartyScreen from "../../screens/Party/PartyScreen";
import AddAnnouncementScreen from "../../screens/Party/components/AddAnnouncement/AddAnnouncementScreen";
import MediaListToUpload from "../../screens/Party/components/AddPost/MediaListToUpload";
import PostUploadScreen from "../../screens/Party/components/AddPost/UploadPostScreen";
import ProvidedPartyScreen from "../../screens/Party/ProvidedPartyScreen";
const Stack = createNativeStackNavigator<PartyNavigatorParamList>();
export function PartyNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={PartyScreen} name="PartyScreen" />
      <Stack.Screen
        component={PostUploadScreen}
        name="PostUploadScreen"
        options={{}}
      />
      <Stack.Screen component={MediaListToUpload} name="MediaListToUpload" />
      <Stack.Screen
        component={AddAnnouncementScreen}
        name="AddAnnouncementScreen"
      />
      {/*<Stack.Screen component={AddCreatorsScreen} name="AddCreators" />*/}
    </Stack.Navigator>
  );
}
