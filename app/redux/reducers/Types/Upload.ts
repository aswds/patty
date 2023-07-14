import {
  UPLOAD_PROGRESS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_COMPRESS,
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
export interface UploadCompressionStatus {
  type: typeof UPLOAD_COMPRESS;
  payload: boolean;
}
export type UploadActionTypes =
  | UploadProgressAction
  | UploadStartAction
  | UploadSuccessAction
  | UploadFailureAction
  | UploadCompressionStatus;
