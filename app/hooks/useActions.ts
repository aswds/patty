import {
  createEventsGeneralDataUpdate,
  createEventsLocationAndTimeUpdate,
  createEventsAdditionalInformationUpdate,
  clearCreateEvents,
} from "./../redux/reducers/CreateEvent";
import { bindActionCreators } from "redux";
import { fetch_events } from "../redux/actions/Events";
import { fetch_user } from "../redux/actions/User";
import { useAppDispatch } from "./useAppDispatch";
import { eventsLoading, eventsUploaded } from "../redux/reducers/Events";
import { updateUserLocation } from "../redux/reducers/User";

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      fetch_events,
      fetch_user,
      createEventsGeneralDataUpdate,
      createEventsLocationAndTimeUpdate,
      createEventsAdditionalInformationUpdate,
      clearCreateEvents,
      eventsLoading,
      eventsUploaded,
      updateUserLocation,
    },
    dispatch
  );
};
