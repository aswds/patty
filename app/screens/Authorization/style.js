import { FontFamily } from "../../../assets/fonts/Fonts";

export const textStyle = {
  color: "grey",
  textContainer: {
    justifyContent: "center",
    paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  },

  innerText: {
    alignItems: "center",
  },
  textTerms: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textTermsStyle: {
    fontFamily: FontFamily.regular,
    fontWeight: "400",
    color: "grey",
  },
};
