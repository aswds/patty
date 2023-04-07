import React, { ReactNode } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { colors } from "../../../../src/colors";
import { Title } from "../../../../shared/Title/Title";
import { MaterialIcons } from "@expo/vector-icons";
import { ICoordinates } from "../../../../Types/Events";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PartyCreationNavigatorParamList } from "../../../../Types/MapStack/NavigationTypes";
import { descriptionTexts } from "../descriptionTexts";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

const mapStyle = require("../../mapStyle.json");

interface LocationProps {
  userLocation: ICoordinates | undefined;
  locationAddButton: ReactNode;
}
export default function Location({
  userLocation,
  locationAddButton,
}: LocationProps): JSX.Element {
  const route =
    useRoute<RouteProp<PartyCreationNavigatorParamList, "LocationAndTime">>();
  function TitleIcon() {
    return (
      <View style={{ marginBottom: 5 }}>
        <MaterialIcons
          name="add-location-alt"
          size={25}
          color={colors.iconColor}
          style={{}}
        />
      </View>
    );
  }

  function Address() {
    return (
      <View style={styles.locationTitleContainer}>
        <Text style={styles.locationAddressStyle}>
          {`${route.params?.addressTitle ?? ``}`}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <Title
          title={"Location"}
          icon={<TitleIcon />}
          description={descriptionTexts.location}
        />
      </View>
      <View style={styles.map}>
        <MapView
          style={{ flex: 1 }}
          region={{
            ...userLocation!,
            ...route.params?.region,
            longitudeDelta: 0.003,
            latitudeDelta: 0.003,
          }}
          provider={PROVIDER_DEFAULT}
          pointerEvents="none"
          customMapStyle={mapStyle}
        >
          {route.params?.region && <Marker coordinate={route.params?.region} />}
        </MapView>
      </View>
      <Address />
      {locationAddButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  map: {
    height: Dimensions.get("screen").height * 0.3,
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    alignSelf: "center",
  },
  locationTitleContainer: {
    marginVertical: 10,
  },
  locationAddressStyle: {
    fontFamily: FontFamily.bold,
    textAlign: "center",
    color: colors.text,
  },
});
