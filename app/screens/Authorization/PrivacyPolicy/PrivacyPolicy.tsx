import React from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { colors } from "../../../src/colors";
import { PrivacyPolicySections } from "./SectionData";
import TermsAndPrivacySectionList from "../components/TermsAndPrivacySectionList";

const PrivacyPolicy: React.FC = () => {
  return <TermsAndPrivacySectionList data={PrivacyPolicySections} />;
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.modalBackground,
    justifyContent: "center",
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  headerTextStyle: {
    fontFamily: FontFamily.extra_bold,
    fontSize: 25,
    color: colors.text,
  },
  itemStyle: { paddingVertical: 5 },
  itemTextStyle: { fontFamily: FontFamily.medium, color: colors.text },
});
