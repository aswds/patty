import { isDarkTheme } from "./theme";

export const colors = {
  background: isDarkTheme ? "#202020" : "#FFFFFF", //#202020
  text: isDarkTheme ? "white" : "#2E2E2E",
  text_2: isDarkTheme ? "#AEAEAE" : "#404040",
  accentColor: isDarkTheme ? "#9B3232" : "rgba(255, 80, 80, 1)", // #9B3232  rgba(155 , 50, 50 , 1)
  disabledButton: isDarkTheme ? "#5F3937" : "#E88B86",
  disabledText: isDarkTheme ? "#947A7A" : "#F2C8C8",
  input: isDarkTheme ? "#2C2C2C" : "#F2F2F2",
  iconColor: isDarkTheme ? "#6D6D6D" : "#9d9d9d",
  buttonTextColor: "white",
  mapAccentColor: "rgb(210, 40, 45)", //#D2282D
  doneButtonBG: isDarkTheme ? "#2B3526" : "#9CC08A", // Profile screen // Edit button
  doneButtonText: isDarkTheme ? "#9FC084" : "white", // Profile screen // Edit button
  buttonBG: isDarkTheme ? "rgba(47, 37, 36, 1)" : "rgba(109, 109, 109, 0.1)", // rgba(47, 37, 36,) Profile screen // Edit button
  buttonText: isDarkTheme ? "rgba(255, 84, 84)" : "black", // Profile screen // Edit button
  cancel: "#A85959", //TypeError
  blue_text: "#0A67FF",
  partyCreateScreenColors: {
    button: {
      backgroundColor: "#722424",
    },
  },
  partyMarkerColors: {
    smallGroupOfPeople: "#FF8A8A",
    midGroupOfPeople: "#D04848",
    bigGroupOfPeople: "#FF0000",
  },
  initialScreenButton: isDarkTheme ? "#363636" : "#F6F6F6",
  modalBackground: isDarkTheme ? "#1c1c1c" : "#FFFFFF",
};

const lightColor = {
  primary: "#FFD700",
};
