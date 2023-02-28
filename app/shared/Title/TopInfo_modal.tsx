import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import type { IDoc, IFullAddress, ITime } from "../../Types/Parties";
import moment from "moment/moment";
import { colors } from "../../src/colors";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { CloseButton } from "../../screens/Map/components/Buttons/CloseButton";

interface ITopInfo {
  markerInfo: IDoc;
  hideModal?: () => void;
  style?: ViewStyle;
  onFavoritePress?: () => void;
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
// if hideModal present
export const Event: React.FC<ITopInfo> = ({
  markerInfo,
  hideModal,
  style,
  onFavoritePress,
}) => {
  return (
    <View style={[styles.topInfoContainer, style]}>
      <View style={styles.partyInfoContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title title={markerInfo?.title} />
          <Text style={styles.descriptionTextStyle}>
            {markerInfo?.user && "by " + markerInfo?.user}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PartyDate seconds={markerInfo?.time?.seconds} />
          <NumberOfGuests number_of_guests={markerInfo?.number_of_guests} />
        </View>
        <Address address={markerInfo?.location?.fullAddressInfo} />
      </View>

      {!hideModal && (
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={onFavoritePress}
        >
          <AntDesign
            name={"star"}
            size={35}
            color={colors.accentColor}
            style={{ marginHorizontal: "5%" }}
          />
        </TouchableOpacity>
      )}

      {hideModal && <CloseButton onPress={hideModal} />}
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
  descriptionTextStyle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: colors.iconColor,
  },
});
