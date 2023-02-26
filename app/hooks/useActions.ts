import { bindActionCreators } from "redux";
import { fetch_parties } from "../redux/actions/Parties";
import { fetch_user } from "../redux/actions/User";
import { useAppDispatch } from "./useAppDispatch";

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators({ fetch_parties, fetch_user }, dispatch);
};
