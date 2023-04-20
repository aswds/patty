import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { User } from "firebase/auth";

export type VerificationParamList = {
  VerifyEmail: { changedEmail?: string };
  ChangeEmail: { user?: User };
};

export type VerificationStackScreenProp<T extends keyof VerificationParamList> =
  NativeStackScreenProps<VerificationParamList, T>;
