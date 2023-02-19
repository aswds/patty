import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { IDoc } from "../../../../Types/Type";
import moment from "moment/moment";
import { colors } from "../../../../src/colors";
import { Ionicons, Octicons } from "@expo/vector-icons";

interface ITopInfo {
  markerInfo: IDoc;
  hideModal: () => void;
}
function Title({ title }) {
  return <Text style={styles.textTitleStyle}>{title}</Text>;
}

function PartyDate({ date }) {
  const createDate = new Date(date.seconds * 1000);
  return (
    <Text style={styles.dateTextStyle}>{moment(createDate).format("lll")}</Text>
  );
}
const Address = ({ address }) => {
  return (
    <Text style={styles.addressTextStyle}>
      {address?.Street}, {address?.HouseNumber}
    </Text>
  );
};

function NumberOfGuests({ number_of_guests }) {
  return (
    <View style={styles.numberOfGuestsContainer}>
      <Octicons
        name="people"
        size={24}
        color={colors.iconColor}
        style={{ paddingHorizontal: 5 }}
      />

      <Text style={styles.numberOfGuests}>{number_of_guests}</Text>
    </View>
  );
}
function CloseButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="close" size={40} color={colors.iconColor} />
    </TouchableOpacity>
  );
}
export const TopInfo: React.FC<ITopInfo> = ({ markerInfo, hideModal }) => {
  return (
    <View style={styles.topInfoContainer}>
      <View style={styles.partyInfoContainer}>
        <Title title={markerInfo?.title} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PartyDate date={markerInfo?.time} />
          <NumberOfGuests number_of_guests={markerInfo?.number_of_guests} />
        </View>
        <Address address={markerInfo.location.fullAddressInfo} />
      </View>
      <CloseButton onPress={hideModal} />
    </View>
  );
};
const styles = StyleSheet.create({
  topInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  partyInfoContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: "center",

    // maxWidth: "80%",
  },
  textTitleStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 22,
    color: colors.text,
  },
  numberOfGuestsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
  },
  numberOfGuests: {
    fontFamily: "WorkSans-Medium",
    fontSize: 17,
    color: colors.iconColor,
  },
  addressTextStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 15,
    color: colors.text_2,
  },

  dateTextStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 17,
    color: colors.text_2,
  },
});
