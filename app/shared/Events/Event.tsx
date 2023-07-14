import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import type { IEvent, IFullAddress } from "../../Types/Events";
import { MapNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";
import { colors } from "../../src/colors";
import PartyInfoIcon from "../Icons/PartyInfoIcon";
import UserInfo from "./UserInfo";
import BoldText from "../Text/BoldText";

interface ITopInfo {
  markerInfo: IEvent;
  isJoinedEvent?: boolean;
  style?: ViewStyle;
}

const additionalInfoIcons = 15;

function Title({ title }: { title: string }) {
  return (
    <Text style={styles.textTitleStyle} numberOfLines={1}>
      {title}
    </Text>
  );
}

function PartyDate({ date }: { date: string }) {
  const createDate = new Date(date);
  return (
    <PartyInfoIcon
      Icon={MaterialCommunityIcons}
      name={"clock"}
      text={moment(createDate).format("lll")}
      textStyle={styles.dateTextStyle}
    />
  );
}
function RadiusToPost({ radius }: { radius?: string }) {
  return (
    <PartyInfoIcon
      Icon={FontAwesome5}
      name="dot-circle"
      textStyle={styles.dateTextStyle}
      text={
        <Text>
          Radius to post
          <Text style={styles.highlightedText}>
            {"  - "}
            {radius} M
          </Text>
        </Text>
      }
    />
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
    <PartyInfoIcon
      Icon={MaterialCommunityIcons}
      name={"map-marker"}
      text={
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
      }
      textStyle={styles.dateTextStyle}
    />
  );
};
const AdditionalInfo = ({
  drinks,
  giftRequired,
  food,
}: {
  drinks: IEvent["drinksType"];
  food: IEvent["foodProvided"];
  giftRequired: IEvent["giftRequired"];
}) => {
  return (
    <View style={styles.additionalInfoContainer}>
      <PartyInfoIcon
        style={styles.additionalInfoIconContainer}
        text={<Text style={styles.highlightedText}>{food}</Text>}
        additionalText={
          <BoldText>
            food{" "}
            <MaterialCommunityIcons
              name="food-outline"
              size={additionalInfoIcons}
              color={colors.text}
              style={styles.additionalInfoIcon}
            />
          </BoldText>
        }
        iconSize={additionalInfoIcons}
      />
      <PartyInfoIcon
        style={styles.additionalInfoIconContainer}
        text={<Text style={styles.highlightedText}>{drinks}</Text>}
        additionalText={
          <BoldText>
            drinks{" "}
            <FontAwesome5
              name="wine-bottle"
              size={additionalInfoIcons}
              color={colors.text}
              style={styles.additionalInfoIcon}
            />
          </BoldText>
        }
        iconSize={additionalInfoIcons}
      />
      <PartyInfoIcon
        style={styles.additionalInfoIconContainer}
        text={<Text style={styles.highlightedText}>{giftRequired}</Text>}
        additionalText={
          <BoldText>
            gift{" "}
            <AntDesign
              name="gift"
              size={additionalInfoIcons}
              color={colors.text}
              style={styles.additionalInfoIcon}
            />
          </BoldText>
        }
      />
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
        style={styles.numberOfGuestsIcon}
      />

      <Text style={styles.numberOfGuestsText}>{guests && guests?.length}</Text>
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

        <View style={styles.dateGuestsContainer}>
          <PartyDate date={markerInfo?.time as string} />
          <NumberOfGuests guests={markerInfo?.guests} />
        </View>

        <Address
          address={markerInfo?.location?.fullAddressInfo}
          partyPlace={markerInfo?.partyPlace}
        />
        <RadiusToPost radius={markerInfo?.radiusToPost} />
        <AdditionalInfo
          drinks={markerInfo?.drinksType}
          food={markerInfo?.foodProvided}
          giftRequired={markerInfo?.giftRequired}
        />
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
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: colors.iconColor,
  },
  dateGuestsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberOfGuestsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
  },
  numberOfGuestsIcon: {
    paddingHorizontal: 5,
  },
  numberOfGuestsText: {
    fontFamily: FontFamily.medium,
    fontSize: 17,
    color: colors.iconColor,
  },
  addressTextStyle: {
    fontFamily: FontFamily.bold,
    flexShrink: 1,
    fontSize: 15,
    color: colors.text,
    marginLeft: 10,
  },
  additionalInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    borderRadius: 30,
    backgroundColor: colors.background,
    marginVertical: "1%",
  },
  additionalInfoIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  additionalInfoIcon: {
    alignItems: "center",
    marginLeft: 5,
  },
  additionalInfoText: {
    fontFamily: FontFamily.medium,
    color: colors.text,
    fontSize: 15,
  },
  highlightedText: {
    color: colors.accentColor,
    fontFamily: FontFamily.bold,
    fontSize: 13,
  },
  dateTextStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 17,
    color: colors.text,
    marginLeft: 10,
  },
});
