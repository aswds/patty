import { EventColors } from "../../Types/Events";
import { colors } from "../../src/colors";

export function pickColor(
  number_of_guests: number,
  partyMarkerColors: EventColors
) {
  if (number_of_guests <= 10) {
    return partyMarkerColors.intimateGathering;
  } else if (number_of_guests >= 10 && number_of_guests <= 20) {
    return partyMarkerColors.mediumGathering;
  } else {
    return partyMarkerColors.largeGathering;
  }
}
