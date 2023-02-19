import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    height: 80,
    elevation: 0,
  },
};

export const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions} initialRouteName="MapNav">
      {/*<Tab.Screen*/}
      {/*  name="ProfileNav"*/}
      {/*  component={ProfileNavigator}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({ focused }) => {*/}
      {/*      return (*/}
      {/*        <Icon*/}
      {/*          title={"Profile"}*/}
      {/*          Icon={Feather}*/}
      {/*          icon_name="user"*/}
      {/*          focused={focused}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<Tab.Screen*/}
      {/*  name="MapNav"*/}
      {/*  component={MapNavigator}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({ focused }) => {*/}
      {/*      return (*/}
      {/*        <Icon*/}
      {/*          title={"Map"}*/}
      {/*          Icon={Ionicons}*/}
      {/*          icon_name={focused ? "map" : "map-outline"}*/}
      {/*          focused={focused}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Tab.Screen*/}
      {/*  name="ChatNav"*/}
      {/*  component={ChatNavigator}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({ focused }) => {*/}
      {/*      return (*/}
      {/*        <Icon*/}
      {/*          title={"Chat"}*/}
      {/*          Icon={Ionicons}*/}
      {/*          icon_name={*/}
      {/*            focused*/}
      {/*              ? "chatbubble-ellipses-sharp"*/}
      {/*              : "chatbubble-ellipses-outline"*/}
      {/*          }*/}
      {/*          focused={focused}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}
    </Tab.Navigator>
  );
};
