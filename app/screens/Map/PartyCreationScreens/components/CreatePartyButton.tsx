import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { AppNavigatorNavigationProp } from "../../../../Types/AppNavigator/AppNavigator";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { AdditionalInformationData } from "../../../../redux/reducers/CreateEvent";
import { colors } from "../../../../src/colors";
import { joinEvent } from "../../Firebase/eventFunctions";
import { addPartyOnMap } from "../Firebase/addPartyOnMap";
import { isAndroid } from "../../../../src/platform";

interface CreatePartyButtonProps {
  data: AdditionalInformationData;
}

export default function CreatePartyButton({ data }: CreatePartyButtonProps) {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const insets = useSafeAreaInsets();
  const { clearCreateEvents } = useActions();
  const { general_data, location_time_data } = useTypedSelector(
    (state) => state.create_events_state
  );
  const _data = { ...data, ...general_data, ...location_time_data };

  const allNecessaryDataPresent = general_data && location_time_data;

  async function onPress() {
    if (allNecessaryDataPresent) {
      await addPartyOnMap(_data).then(async () => {
        await joinEvent(_data);
      });
      new Promise((res, rej) => {
        navigation.navigate("MapNav", {
          screen: "Map",
        });

        navigation.navigate("PartyNav", {
          screen: "PartyScreen",
          params: {
            partyData: _data,
          },
        });
      }).then(() => {
        clearCreateEvents();
      });
    } else {
      Alert.alert("Please make sure you entered all data.");
    }
  }
  return (
    <View
      style={[styles.container, { bottom: isAndroid ? 20 : insets.bottom }]}
    >
      <TouchableOpacity style={styles.buttonBg} onPress={onPress}>
        <Text style={styles.textStyle}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    right: 0,
    left: 0,
    alignItems: "center",
  },
  buttonBg: {
    backgroundColor: colors.accentColor,
    height: 50,
    width: "90%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 999999,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: colors.buttonTextColor,
  },
});
