import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import type { IEvent, IFullAddress } from "../../Types/Events";
import moment from "moment/moment";
import { colors } from "../../src/colors";
import { Octicons } from "@expo/vector-icons";
import { FontFamily } from "../../../assets/fonts/Fonts";
import UserInfo from "../Events/UserInfo";
import { useNavigation } from "@react-navigation/native";
import { MapNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";

interface ITopInfo {
  markerInfo: IEvent;
  isJoinedEvent?: boolean;
  style?: ViewStyle;
  onFavoritePress?: () => void;
}
function Title({ title }: { title: string }) {
  return <Text style={styles.textTitleStyle}>{title}</Text>;
}

function PartyDate({ date }: { date: Date }) {
  const createDate = new Date(date);
  return (
    <Text style={styles.dateTextStyle}>{moment(createDate).format("lll")}</Text>
  );
}
const Address = ({ address }: { address: IFullAddress | null | undefined }) => {
  return (
    <Text style={styles.addressTextStyle}>
      {address?.Street}, {address?.HouseNumber}
    </Text>
  );
};

function NumberOfGuests({ guests }: { guests: string[] }) {
  const navigation = useNavigation<MapNavigationProps>();
  return (
    <TouchableOpacity
      style={styles.numberOfGuestsContainer}
      onPress={() => navigation.navigate("Guests", { guests: guests })}
    >
      <Octicons
        name="people"
        size={24}
        color={colors.iconColor}
        style={{ paddingHorizontal: 5 }}
      />

      <Text style={styles.numberOfGuests}>{guests && guests?.length}</Text>
    </TouchableOpacity>
  );
}
// if hideModal present
export const Event: React.FC<ITopInfo> = ({
  markerInfo,
  isJoinedEvent,
  style,
}) => {
  return (
    <View style={[styles.topInfoContainer, style]}>
      <View style={styles.partyInfoContainer}>
        <View style={styles.titleContainer}>
          <View style={{ maxWidth: "50%" }}>
            <Title title={markerInfo?.title} />
          </View>

          <UserInfo user={markerInfo?.user} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PartyDate date={markerInfo?.time as Date} />
          <NumberOfGuests guests={markerInfo?.guests} />
        </View>
        <Address address={markerInfo?.location?.fullAddressInfo} />
      </View>

      {/*{isJoinedEvent && (*/}
      {/*  <TouchableOpacity*/}
      {/*    style={{ alignItems: "flex-end" }}*/}
      {/*    onPress={onFavoritePress}*/}
      {/*  >*/}
      {/*    <AntDesign*/}
      {/*      name={"star"}*/}
      {/*      size={35}*/}
      {/*      color={colors.accentColor}*/}
      {/*      style={{ marginHorizontal: "5%" }}*/}
      {/*    />*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}

      {/*{hideModal && <CloseButton onPress={hideModal} />}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  topInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  partyInfoContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: "center",
    width: "100%",

    // maxWidth: "80%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "2%",
  },
  textTitleStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: colors.text,
  },
  numberOfGuestsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
  },
  numberOfGuests: {
    fontFamily: FontFamily.medium,
    fontSize: 17,
    color: colors.iconColor,
  },
  addressTextStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: colors.text_2,
  },

  dateTextStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 17,
    color: colors.text_2,
  },
  usernameText: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: colors.iconColor,
  },
  descriptionTextStyle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: colors.iconColor,
  },
});
