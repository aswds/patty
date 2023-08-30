import { useNavigation } from "@react-navigation/native";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  Styles,
} from "react-native-google-places-autocomplete";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { PartyCreationNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import NavigationBar from "../../screens/Map/PartyCreationScreens/NavigationBar";
import { colors } from "../../src/colors";
interface GooglePlaceSearchProps {
  style: StyleProp<ViewStyle>;
  regionUpdate: (region: GooglePlaceDetail["geometry"]["location"]) => void;
}
export default function GooglePlaceSearch({
  style,
  regionUpdate,
}: GooglePlaceSearchProps) {
  const location = useTypedSelector(
    (state) => state.user_state.current_user.userLocation?.coords
  );
  const currentLocation = {
    description: "📍\tCurrent location",
    geometry: {
      location: {
        lat: location?.latitude,
        lng: location?.longitude,
      },
    },
  };

  const navigation = useNavigation<PartyCreationNavigationProps>();
  return (
    <View style={[styles.container, style]}>
      <NavigationBar
        navigation={navigation}
        text="Pick a location"
        style={{
          shadowColor: "black",
          // marginHorizontal: -20,
          // paddingHorizontal: 20,
          marginBottom: 10,
          // backgroundColor: "rgba(0,0,0,0.2)",
          shadowOpacity: 0.6,
          shadowRadius: 3,
          elevation: 5,
          shadowOffset: { width: 0, height: 3 },
        }}
      />
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder={"Search location"}
          fetchDetails={true}
          query={{
            key: "AIzaSyDC-sa73L21bELvv1eaA8D-M0jj0VVqkrg",
            //   location: "latitude,longitude",
          }}
          // styles={searchBarStyle}
          onPress={(data, details) => regionUpdate(details?.geometry.location!)}
          enablePoweredByContainer={false}
          styles={searchBarStyle}
          predefinedPlaces={[currentLocation]}
          textInputProps={{
            placeholderTextColor: "grey",
          }}
        />
      </View>
    </View>
  );
}

const searchBarStyle: Styles = {
  textInputContainer: {},
  textInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: 10,
    color: colors.text,
    fontFamily: FontFamily.medium,
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderColor: "#c8c7cc",
    borderTopWidth: 0.5,
  },
  listView: {
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.accentColor,
  },
  row: {
    backgroundColor: colors.input,
  },

  description: { color: colors.text, fontFamily: FontFamily.bold },
  loader: {
    height: 20,
  },
  container: {},
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  searchBarContainer: { height: "45%", width: "75%" },
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: colors.input,
    height: "40%",
    width: "80%",
    // paddingHorizontal: "2%",
    borderRadius: 999999,
    top: "10%",
  },

  textInput: {
    color: "#5d5d5d",
    fontSize: 14,
    backgroundColor: "transparent",
    borderRadius: 999999,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
});
