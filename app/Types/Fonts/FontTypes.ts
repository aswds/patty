type boldFonts = "Nunito-Bold" | "WorkSans-Bold" | "Baloo2-Bold";
type regularFonts = "Nunito-Regular" | "WorkSans-Regular" | "Baloo2-Regular";
type mediumFonts = "Nunito-Medium" | "WorkSans-Medium" | "Baloo2-Medium";
type semi_boldFonts =
  | "Nunito-SemiBold"
  | "WorkSans-SemiBold"
  | "Baloo2-SemiBold";
type extra_boldFonts = "Nunito-ExtraBold" | "Baloo2-ExtraBold";
export interface IFonts {
  bold: boldFonts;
  regular: regularFonts;
  medium: mediumFonts;
  semi_bold: semi_boldFonts;
  extra_bold: extra_boldFonts;
}
