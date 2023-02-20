import React from "react";
import { Entypo } from "@expo/vector-icons";
import { pickColor } from "../../pickColor";
import { Marker } from "react-native-maps";

const CustomMarker = ({ doc, index, onPress }) => {
  return (
    <Marker coordinate={doc?.location?.region} key={index} onPress={onPress}>
      <Entypo
        name="shareable"
        size={31}
        color={pickColor(doc.number_of_guests)}
      />
    </Marker>
  );
};

export default CustomMarker;
