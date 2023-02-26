import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type {
  IDoc,
  IFullAddress,
  ITime,
} from "../../../../../../Types/Parties";
import moment from "moment/moment";
import { colors } from "../../../../../../src/colors";
import { Octicons } from "@expo/vector-icons";
import { FontFamily } from "../../../../../../../assets/fonts/Fonts";

interface ITopInfo {
  markerInfo: IDoc;
  hideModal: () => void;
}
function Title({ title }: { title: string }) {
  return <Text style={styles.textTitleStyle}>{title}</Text>;
}

function PartyDate({ seconds }: ITime) {
  const createDate = new Date(seconds! * 1000);
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

function NumberOfGuests({ number_of_guests }: { number_of_guests: number }) {
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

export const TopInfo: React.FC<ITopInfo> = ({ markerInfo, hideModal }) => {
  return (
    <View style={styles.topInfoContainer}>
      <View style={styles.partyInfoContainer}>
        <Title title={markerInfo?.title} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PartyDate seconds={markerInfo?.time?.seconds} />
          <NumberOfGuests number_of_guests={markerInfo?.number_of_guests} />
        </View>
        <Address address={markerInfo?.location?.fullAddressInfo} />
      </View>
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
});
