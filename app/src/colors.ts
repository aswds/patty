import { isDarkTheme } from "./theme";

export const colors = {
  background: isDarkTheme ? "#151515" : "#FFFFFF", //#202020
  text: isDarkTheme ? "#DDDD" : "#2E2E2E",
  text_2: isDarkTheme ? "#444" : "#404040",
  accentColor: isDarkTheme ? "#9B3232" : "rgba(255, 80, 80, 1)", // #9B3232  rgba(155 , 50, 50 , 1)
  disabledButton: isDarkTheme ? "rgba(100 , 57 , 55, 0.5)" : "#E88B86",
  disabledText: isDarkTheme ? "#947A7A" : "#F2C8C8",
  input: isDarkTheme ? "#202020" : "#F2F2F2",
  iconColor: isDarkTheme ? "#6D6D6D" : "#9d9d9d",
  buttonTextColor: "white",
  mapAccentColor: "rgb(210, 40, 45)", //#D2282D
  doneButtonBG: isDarkTheme ? "rgba(43, 53, 38, 0.5)" : "#000080", // Profile screen // Edit button
  doneButtonText: isDarkTheme ? "#9FC084" : "white", // Profile screen // Edit button
  buttonBG: isDarkTheme ? "rgba(57, 37, 36, 0.5)" : "rgba(109, 109, 109, 0.1)", // rgba(47, 37, 36,) Profile screen // Edit button
  buttonText: isDarkTheme ? "rgba(255, 84, 84, 1)" : "black", // Profile screen // Edit button
  cancel: "#A85959", //TypeError
  blue_text: "cornflowerblue",
  partyCreateScreenColors: {
    button: {
      backgroundColor: "#722424",
    },
  },
  follow_unfollow_buttons: {
    follow_button: isDarkTheme ? "#2B3526" : "#000080",
    unfollow_button: isDarkTheme ? "#2B3526" : "#000080",
  },
  partyMarkerColors: {
    ViaInvite: {
      intimateGathering: "#FFC107",
      mediumGathering: "#FF9800",
      largeGathering: "#FF5722",
    },
    Public: {
      intimateGathering: "#FF8A8A",
      mediumGathering: "#D04848",
      largeGathering: "#FF0000",
    },
  },
  initialScreenButton: isDarkTheme ? "#363636" : "#F6F6F6",
  modalBackground: isDarkTheme ? "#111111" : "#FFFFFF",
  mapButtons: isDarkTheme ? "#151515" : "white",
  error: "#B00020",
  alertBackground: "#181818",
};

const lightColor = {
  primary: "#FFD700",
};
