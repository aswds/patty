type boldFonts = "Nunito-Bold" | "WorkSans-Bold";
type regularFonts = "Nunito-Regular" | "WorkSans-Regular";
type mediumFonts = "Nunito-Medium" | "WorkSans-Medium";
type semi_boldFonts = "Nunito-SemiBold" | "WorkSans-SemiBold";
type extra_boldFonts = "Nunito-ExtraBold";
export interface IFonts {
  bold: boldFonts;
  regular: regularFonts;

  medium: mediumFonts;

  semi_bold: semi_boldFonts;
  extra_bold: extra_boldFonts;
}
