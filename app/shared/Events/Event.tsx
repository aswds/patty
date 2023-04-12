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
import UserInfo from "./UserInfo";
import { useNavigation } from "@react-navigation/native";
import { MapNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";

interface ITopInfo {
  markerInfo: IEvent;
  isJoinedEvent?: boolean;
  style?: ViewStyle;
  onFavoritePress?: () => void;
}
function Title({ title }: { title: string }) {
  return (
    <Text style={styles.textTitleStyle} numberOfLines={1}>
      {title}
    </Text>
  );
}

function PartyDate({ date }: { date: Date }) {
  const createDate = new Date(date);
  return (
    <Text style={styles.dateTextStyle}>{moment(createDate).format("lll")}</Text>
  );
}
const Address = ({
  address,
  partyPlace,
}: {
  address: IFullAddress | null | undefined;
  partyPlace: IEvent["partyPlace"];
}) => {
  return (
    <Text style={styles.addressTextStyle}>
      {address?.street} {"," && address?.houseNumber}{" "}
      <Text
        style={[
          styles.highlightedText,
          { color: colors.accentColor, fontSize: 13 },
        ]}
      >
        - {partyPlace}
      </Text>
    </Text>
  );
};
const DrinksAndFood = ({
  drinks,
  food,
}: {
  drinks: IEvent["drinksType"];
  food: IEvent["foodProvided"];
}) => {
  return (
    <View
      style={{
        justifyContent: "space-evenly",
      }}
    >
      <Text style={styles.subtitle}>
        food: <Text style={styles.highlightedText}>{food}</Text>
      </Text>
      <Text style={styles.subtitle}>
        drinks: <Text style={styles.highlightedText}>{drinks}</Text>
      </Text>
    </View>
  );
};

const Gift = ({ giftRequired }: { giftRequired: IEvent["giftRequired"] }) => {
  return (
    <View>
      <Text style={styles.subtitle}>
        gift:<Text style={styles.highlightedText}> {giftRequired}</Text>
      </Text>
    </View>
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
export const Event: React.FC<ITopInfo> = ({ markerInfo, style }) => {
  return (
    <View style={[styles.topInfoContainer, style]}>
      <View style={styles.partyInfoContainer}>
        <View style={styles.titleContainer}>
          <Title title={markerInfo?.title!} />
          <UserInfo user={markerInfo?.user} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PartyDate date={markerInfo?.time as Date} />
          <NumberOfGuests guests={markerInfo?.guests} />
        </View>
        <Address
          address={markerInfo?.location?.fullAddressInfo}
          partyPlace={markerInfo?.partyPlace}
        />
        <View style={{ marginVertical: "1%" }}>
          <DrinksAndFood
            drinks={markerInfo?.drinksType}
            food={markerInfo?.foodProvided}
          />
          <Gift giftRequired={markerInfo?.giftRequired} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  partyInfoContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: "center",
    width: "100%",

    // maxWidth: "80%",
  },
  subtitle: { fontFamily: FontFamily.medium, color: colors.text, fontSize: 15 },

  highlightedText: {
    color: colors.accentColor,
    fontFamily: FontFamily.bold,
    fontSize: 15,
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
    maxWidth: "70%",
    marginRight: 10,
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
    flexShrink: 1,
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