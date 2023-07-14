import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DrinkTypes,
  FoodProvided,
  GiftsRequireTextTypes,
  IEvent,
} from "../../../Types/Events";
import { PartyCreationStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ScreenCreateParty } from "../../../shared/Screen/ScreenCreateParty";
import { colors } from "../../../src/colors";
import FoodAndDrinkList from "./FoodAndDrinks/FoodAndDrinks";
import Gifts from "./Gifts/Gifts";
import NavigationBar from "./NavigationBar";
import RadiusToPost from "./RadiusToPost/RadiusToPost";
import CreatePartyButton from "./components/CreatePartyButton";

const AdditionalInformation = ({
  navigation,
  route,
}: PartyCreationStackScreenProps<"AdditionalInformation">) => {
  //route params
  const { uid, name, image, surname, username, userLocation } =
    useTypedSelector((state) => state.user_state.current_user);
  //states
  const [foodProvided, setFoodProvided] =
    useState<FoodProvided>("Not Provided");
  const [radiusToPost, setRadiusToPost] = useState<number>(50);
  const [drinksType, setDrinksType] = useState<DrinkTypes>("Soft");
  const [giftRequired, setGiftsRequired] =
    useState<GiftsRequireTextTypes>("Not Required");
  const eventData: IEvent = {
    user: {
      image,
      name,
      surname,
      uid,
      username,
    },
    foodProvided,
    drinksType,
    giftRequired,
    guests: [uid!],
    partyID: uid!,
    radiusToPost,
  };
  //functions

  const updateFunctions = {
    setDrinksType,
    setFoodProvided,
  };

  function onGiftUpdate(value: GiftsRequireTextTypes) {
    setGiftsRequired(value);
  }
  function onRadiusUpdate(value: number) {
    setRadiusToPost(value);
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenCreateParty
        containerStyle={{ paddingBottom: 50 }}
        navigationBar={
          <NavigationBar
            navigation={navigation}
            text="Additional information"
          />
        }
      >
        <RadiusToPost onPress={onRadiusUpdate} />
        <FoodAndDrinkList onUpdate={updateFunctions} />
        <Gifts onGiftUpdate={onGiftUpdate} />
      </ScreenCreateParty>
      <CreatePartyButton data={eventData} />
    </View>
  );
};

export default AdditionalInformation;

const styles = StyleSheet.create({});
