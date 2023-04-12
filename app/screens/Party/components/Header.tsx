import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BackButton } from "../../../shared/Buttons/BackButton";
import { Title } from "../../../shared/Title/Title";
import { image } from "../../../../assets/images";
import { IEvent, IEvent_User } from "../../../Types/Events";
import { colors } from "../../../src/colors";
import ProfileButton from "../../Map/components/ProfileButton";
import { useNavigation } from "@react-navigation/native";
import { MapNavNavigatorParamList } from "../../../Types/MapStack/NavigationTypes";
import { ProfileNavigationProps } from "../../../Types/ProfileStack/ScreenNavigationProps";
import { getUserByUID } from "../../../services/getUserByUID";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontFamily } from "../../../../assets/fonts/Fonts";

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
        <BackButton
          navigation={navigation}
          style={{ position: "relative", left: 0 }}
        />
        <Title
          title={title}
          containerStyle={{
            width: undefined,
            marginHorizontal: "5%",
            flexShrink: 1,
            alignItems: "center",
          }}
          fontStyle={{ fontSize: 30 }}
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MaterialCommunityIcons
          name="crown-outline"
          size={35}
          color={colors.accentColor}
        />
        <ProfileButton
          userUID={user.uid!}
          userImage={user.image}
          containerStyle={{
            position: "relative",
            padding: 5,
          }}
        />
        <Text style={styles.hostTextStyle}>host</Text>
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
