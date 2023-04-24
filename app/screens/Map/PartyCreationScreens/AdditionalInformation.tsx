import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  DrinkTypes,
  FoodProvided,
  GiftsRequireTextTypes,
  IEvent,
} from "../../../Types/Events";
import FoodAndDrinkList from "./FoodAndDrinks/FoodAndDrinks";
import Gifts from "./Gifts/Gifts";
import { Screen } from "../../../shared/Screen/Screen";
import NavigationBar from "./NavigationBar";
import { PartyCreationStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import CreatePartyButton from "./components/CreatePartyButton";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ScreenCreateParty } from "../../../shared/Screen/ScreenCreateParty";
import { colors } from "../../../src/colors";

const AdditionalInformation = ({
  navigation,
  route,
}: PartyCreationStackScreenProps<"AdditionalInformation">) => {
  //route params
  const { uid, name, image, surname, username } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  //states
  const [foodProvided, setFoodProvided] =
    useState<FoodProvided>("Not Provided");
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
  };
  //functions

  const updateFunctions = {
    setDrinksType,
    setFoodProvided,
  };

  function onGiftUpdate(value: GiftsRequireTextTypes) {
    setGiftsRequired(value);
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenCreateParty
        containerStyle={{}}
        navigationBar={
          <NavigationBar
            navigation={navigation}
            text="Additional information"
          />
        }
      >
        <FoodAndDrinkList onUpdate={updateFunctions} />
        <Gifts onGiftUpdate={onGiftUpdate} />
      </ScreenCreateParty>
      <CreatePartyButton data={eventData} />
    </View>
  );
};

export default AdditionalInformation;

const styles = StyleSheet.create({});
