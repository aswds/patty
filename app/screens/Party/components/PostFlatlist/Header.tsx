import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import { Title } from "../../../../shared/Title/Title";
import { image } from "../../../../../assets/images";
import { IEvent, IEvent_User } from "../../../../Types/Events";
import { colors } from "../../../../src/colors";
import ProfileButton from "../../../Map/components/ProfileButton";
import { useNavigation } from "@react-navigation/native";
import { MapNavNavigatorParamList } from "../../../../Types/MapStack/NavigationTypes";
import { ProfileNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { getUserByUID } from "../../../../services/getUserByUID";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import UserInfo from "../../../../shared/Events/UserInfo";

interface HeaderProps {
  user: IEvent_User;
  title: IEvent["title"];
  navigation: any;
}

const Header: React.FC<HeaderProps> = ({ title, user }) => {
  const navigation = useNavigation<ProfileNavigationProps>();

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          flexShrink: 1,
          alignItems: "center",
        }}
      >
        <Title
          title={title}
          navigation={navigation}
          containerStyle={{
            marginRight: "5%",
            flexShrink: 1,
            left: 0,
          }}
          fontStyle={{ fontSize: 30 }}
        />
      </View>
      <View
        style={{
          height: "100%",
          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <UserInfo user={user} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.accentColor,
    backgroundColor: "grey",
  },
  crownIcon: {
    width: 20,
    height: 20,
  },
  hostTextStyle: {
    marginHorizontal: 5,
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: colors.text,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
});
