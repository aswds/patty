import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../Types/Events";

export type GeneralData = Pick<
  IEvent,
  "title" | "tags" | "description" | "rsvp"
>;
export type LocationAndTimeData = Pick<
  IEvent,
  "location" | "partyPlace" | "time"
>;
export type AdditionalInformationData = Omit<
  IEvent,
  keyof GeneralData | keyof LocationAndTimeData
>;
interface InitialStateType {
  general_data: GeneralData;
  location_time_data: LocationAndTimeData;
  additional_information: AdditionalInformationData;
}

const initialState: InitialStateType = {
  general_data: {},
  location_time_data: {
    location: { fullAddressInfo: null, region: null, address: null },
  },
  //@ts-expect-error
  additional_information: {},
};

export const createEventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    createEventsGeneralDataUpdate(state, action: PayloadAction<GeneralData>) {
      state.general_data = action.payload;
    },
    createEventsLocationAndTimeUpdate(
      state,
      action: PayloadAction<LocationAndTimeData>
    ) {
      state.location_time_data = action.payload;
    },
    createEventsAdditionalInformationUpdate(
      state,
      action: PayloadAction<AdditionalInformationData>
    ) {
      state.additional_information = action.payload;
    },
    clearCreateEvents(state) {
      return initialState;
    },
  },
});
export default createEventsSlice.reducer;

export const {
  createEventsGeneralDataUpdate,
  createEventsAdditionalInformationUpdate,
  createEventsLocationAndTimeUpdate,
  clearCreateEvents,
} = createEventsSlice.actions;
