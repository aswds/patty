import React, { Key } from "react";
import { Octicons } from "@expo/vector-icons";
import { pickColor } from "../../pickColor";
import { Marker, Region } from "react-native-maps";
import { IEvent } from "../../../../Types/Events";
import { colors } from "../../../../src/colors";

type CustomMarkerProps = {
  doc: IEvent;
  index?: Key | null;
  onPress: () => void;
  tracksViewChanges: boolean;
};

const CustomMarker = React.memo(
  ({ doc, index, onPress, tracksViewChanges }: CustomMarkerProps) => {
    return (
      <Marker
        coordinate={doc?.location?.region as Region}
        key={index}
        onPress={onPress}
        tracksViewChanges={tracksViewChanges}
      >
        <Octicons
          name="dot-fill"
          size={31}
          color={pickColor(
            doc?.guests.length,
            doc.isViaInvite
              ? colors.partyMarkerColors.ViaInvite
              : colors.partyMarkerColors.Public
          )}
        />
      </Marker>
    );
  }
);

export default CustomMarker;
