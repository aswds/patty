import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useUserLocation from "../../hooks/useUserLocation";
import Loader from "../../shared/Loaders/Loader";
import DoPartyButton from "./components/DoPartyButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../src/colors";
import type { IDoc } from "../../Types/Type";

const mapStyle = require("./mapStyle.json");
export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const { userLocation, parties, isLoading } = useUserLocation();
  return (
    <View style={styles.container}>
      {isLoading && <Loader isVisible={isLoading} />}

      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={userLocation}
        userLocationPriority={"low"}
        showsBuildings={true}
        loadingEnabled={true}
        showsUserLocation
        paddingAdjustmentBehavior="always"
        onPress={(r) => {
          setMarkers([...markers, r.nativeEvent?.coordinate]);
        }}
      >
        {parties?.map((doc: IDoc, index) => {
          return (
            <Marker
              coordinate={doc.location.region}
              key={index}
              onPress={() => {
                console.log("F");
              }}
            >
              <FontAwesome5
                name="fire-alt"
                size={30}
                color={colors.accentColor}
              />
              <Text>{doc.title}</Text>
            </Marker>
          );
        })}
      </MapView>
      <Callout style={styles.buttonsContainer}>
        <DoPartyButton
          onPress={() => {
            navigation.navigate("PartyCreationScreen", {
              userLocation: userLocation,
            });
          }}
        />
      </Callout>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonsContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: "20%",
  },
  button: {
    height: "70%",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  container: {
    flex: 1,
  },
  loaderStyle: { height: 100, zIndex: -1 },
});
