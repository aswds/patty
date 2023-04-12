import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../../src/colors";
import { addPartyOnMap } from "../Firebase/addPartyOnMap";
import { useNavigation } from "@react-navigation/native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../Types/Events";
import { MapNavigationProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { joinEvent } from "../../Firebase/fetchUserJoinedEvents";
import { AdditionalInformationData } from "../../../../redux/reducers/CreateEvent";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";

interface CreatePartyButtonProps {
  data: AdditionalInformationData;
}

export default function CreatePartyButton({ data }: CreatePartyButtonProps) {
  const navigation = useNavigation<MapNavigationProps>();
  const { clearCreateEvents } = useActions();
  const { general_data, location_time_data } = useTypedSelector(
    (state) => state.create_events_state
  );
  const _data = { ...data, ...general_data, ...location_time_data };

  const allNecessaryDataPresent = general_data && location_time_data;

  async function onPress() {
    if (allNecessaryDataPresent) {
      await addPartyOnMap(_data).then(() => {});
      await joinEvent(_data);
      navigation.navigate("Map");
      clearCreateEvents();
    } else {
      Alert.alert("Please make sure you entered all data.");
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonBg} onPress={onPress}>
        <Text style={styles.textStyle}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    width: "100%",
  },
  buttonBg: {
    backgroundColor: colors.accentColor,
    height: 50,
    marginTop: "10%",
    width: "100%",
    borderRadius: 999999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: colors.buttonTextColor,
  },
});
