// uploadReducer.ts

import {
  UPLOAD_FAILURE,
  UPLOAD_PROGRESS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
} from "../constants/Upload_constans";
import { UploadActionTypes } from "./Types/Upload";

// Define the initial state
interface UploadState {
  uploadProgress: number;
  isUploading: boolean;
  uploadError: string | null;
}

const initialState: UploadState = {
  uploadProgress: 0,
  isUploading: false,
  uploadError: null,
};

// Define action types

// Define the upload reducer function
const uploadReducer = (
  state = initialState,
  action: UploadActionTypes
): UploadState => {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      };
    case UPLOAD_START:
      return {
        ...state,
        isUploading: true,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        isUploading: false,
        uploadProgress: 0,
        uploadError: null,
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        isUploading: false,
        uploadProgress: 0,
        uploadError: action.payload,
      };
    default:
      return state;
  }
};

// Define action creators

export default uploadReducer;
