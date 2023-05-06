import React from "react";
import { Region } from "react-native-maps";
import CustomMarker from "./Markers/CustomMarker";
import { IEvent } from "../../../Types/Events";

interface EventMarkersProps {
  events: IEvent[];
  onMarkerPress: (doc: IEvent, region: Region) => void;
}

const EventMarkers: React.FC<EventMarkersProps> = ({
  events,
  onMarkerPress,
}) => {
  const handleMarkerPress = async (doc: IEvent) => {
    const region = doc?.location?.region as Region;
    onMarkerPress(doc, region);
  };

  return (
    <>
      {events.map((doc: IEvent, index?: React.Key | null) => {
        return (
          <CustomMarker
            doc={doc}
            index={index}
            onPress={() => handleMarkerPress(doc)}
            key={index}
            tracksViewChanges={false}
          />
        );
      })}
    </>
  );
};

export default EventMarkers;
