import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TermsAndPrivacySectionList from "../components/TermsAndPrivacySectionList";
import { TermsOfServiceSections } from "./TermsOfServiceData";
const TermsOfService = () => {
  return <TermsAndPrivacySectionList data={TermsOfServiceSections} />;
};

export default TermsOfService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
