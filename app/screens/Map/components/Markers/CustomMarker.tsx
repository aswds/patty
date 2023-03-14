import React, { Key } from "react";
import { Octicons } from "@expo/vector-icons";
import { pickColor } from "../../pickColor";
import { Marker, Region } from "react-native-maps";
import { IEvent } from "../../../../Types/Events";

type CustomMarkerProps = {
  doc: IEvent;
  index?: Key | null;
  onPress: () => void;
};

const CustomMarker = React.memo(
  ({ doc, index, onPress }: CustomMarkerProps) => {
    return (
      <Marker
        coordinate={doc?.location?.region as Region}
        key={index}
        onPress={onPress}
      >
        <Octicons
          name="dot-fill"
          size={31}
          color={pickColor(doc.number_of_guests)}
        />
      </Marker>
    );
  }
);

export default CustomMarker;
