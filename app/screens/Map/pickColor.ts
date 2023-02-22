import { colors } from "../../src/colors";

export function pickColor(number_of_guests: number) {
  if (number_of_guests <= 10) {
    return colors.partyMarkerColors.smallGroupOfPeople;
  } else if (number_of_guests >= 10 && number_of_guests <= 20) {
    return colors.partyMarkerColors.midGroupOfPeople;
  } else {
    return colors.partyMarkerColors.bigGroupOfPeople;
  }
}
