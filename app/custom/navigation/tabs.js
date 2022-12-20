import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { View, Image, Text, ImageBackground, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../navigation/SignIn&SingUp/components/Icon";
import Chat from "../../screens/Chat/Chat";
import Map from "../../screens/Map/Map";
import Profile from "../../screens/Profile/Profile";
import { BackButton } from "../../screens/Register_LogIn/components/BackButton";
import { ProfileNavigator } from "../../navigation/Navigators/ProfileNavigator";
import { MapNavigator } from "../../navigation/Navigators/MapNavigator";

const Tab = createBottomTabNavigator();

const tabOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    borderTopWidth: 0,
    borderRadius: 15,
    height: 70,
    elevation: 0,
  },
};
const TabButton = (props) => {
  const { item, onPress, accessibilityState, Icon } = props;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{ flex: 1 }}>
      {props.children}
    </TouchableOpacity>
  );
};
export const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions} initialRouteName="MapNav">
      <Tab.Screen
        name="ProfileNav"
        component={ProfileNavigator}
        options={{
          // tabBarButton: (props) => {
          //   return (
          //     <TabButton
          //       props={props}
          //       focused={props.accessibilityState.selected}
          //     />
          //   );
          // },
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                title={"Profile"}
                Icon={Feather}
                icon_name="user"
                focused={focused}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="MapNav"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                title={"Map"}
                Icon={Ionicons}
                icon_name={focused ? "map" : "map-outline"}
                focused={focused}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                title={"Chat"}
                Icon={Ionicons}
                icon_name={
                  focused
                    ? "chatbubble-ellipses-sharp"
                    : "chatbubble-ellipses-outline"
                }
                focused={focused}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
{
  // tabBarBackground: () => {
  //   return (
  //     <ImageBackground
  //       source={require("../../../assets/AE/SignUpBckgr.png")}
  //       style={[
  //         StyleSheet.absoluteFill,
  //         { borderRadius: 15, overflow: "hidden" },
  //       ]}
  //     >
  //       <BlurView
  //         style={[StyleSheet.absoluteFill, { borderRadius: 15 }]}
  //         intensity={15}
  //       />
  //     </ImageBackground>
  //   );
  // },
}
