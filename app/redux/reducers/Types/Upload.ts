import {
  UPLOAD_PROGRESS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
} from "../../constants/Upload_constans";

export interface UploadProgressAction {
  type: typeof UPLOAD_PROGRESS;
  payload: number;
}

export interface UploadStartAction {
  type: typeof UPLOAD_START;
}

export interface UploadSuccessAction {
  type: typeof UPLOAD_SUCCESS;
}

export interface UploadFailureAction {
  type: typeof UPLOAD_FAILURE;
  payload: string;
}

export type UploadActionTypes =
  | UploadProgressAction
  | UploadStartAction
  | UploadSuccessAction
  | UploadFailureAction;
