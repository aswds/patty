import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { DrinkTypes, FoodProvided } from "../../../../Types/Events";
import TwoButtons from "../../../../shared/Buttons/TwoChoiseButtons";
import { TwoButtonsText } from "../../../../shared/Buttons/Types/TwoButtonsType";
import { Title } from "../../../../shared/Title/Title";
import { colors } from "../../../../src/colors";
import { descriptionTexts } from "../descriptionTexts";

interface FoodAndDrinkListProps {
  onUpdate: {
    setDrinksType: Dispatch<SetStateAction<DrinkTypes>>;
    setFoodProvided: Dispatch<SetStateAction<FoodProvided>>;
  };
}

const foodButtonsText: TwoButtonsText<FoodProvided> = {
  button1: "Provided",
  button2: "Not Provided",
};

const drinkButtonsText: TwoButtonsText<DrinkTypes> = {
  button1: "Alcohol",
  button2: "Soft",
};

const FoodAndDrinkList: React.FC<FoodAndDrinkListProps> = ({ onUpdate }) => {
  function onFoodUpdate(selectedButton: FoodProvided) {
    onUpdate.setFoodProvided(selectedButton);
  }
  function onDrinksUpdate(selectedButton: DrinkTypes) {
    onUpdate.setDrinksType(selectedButton);
  }
  return (
    <>
      <Title
        title={"Food&Drinks"}
        icon={
          <MaterialCommunityIcons
            name="food-outline"
            size={24}
            color={colors.text}
            style={{ paddingBottom: 5, paddingLeft: 5 }}
          />
        }
        description={descriptionTexts.foodAndDrinks}
      />

      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Text style={styles.heading}>Food:</Text>
          <TwoButtons
            buttonsText={foodButtonsText}
            onButtonUpdate={onFoodUpdate}
            initialValue={foodButtonsText.button1}
          />
          <View style={styles.inputContainer}></View>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.heading}>Drinks:</Text>
          <TwoButtons
            buttonsText={drinkButtonsText}
            onButtonUpdate={onDrinksUpdate}
            initialValue={drinkButtonsText.button1}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  listContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text_2,
    fontFamily: FontFamily.extra_bold,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 40,
    color: colors.text,
    fontFamily: FontFamily.bold,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: colors.accentColor,
    paddingHorizontal: 15,
    height: "100%",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default FoodAndDrinkList;
