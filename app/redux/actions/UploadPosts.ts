import {
  UPLOAD_PROGRESS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_COMPRESS,
} from "../constants/Upload_constans";
import {
  UploadProgressAction,
  UploadStartAction,
  UploadSuccessAction,
  UploadFailureAction,
  UploadCompressionStatus,
} from "../reducers/Types/Upload";

export const updateUploadProgress = (
  progress: number
): UploadProgressAction => ({
  type: UPLOAD_PROGRESS,
  payload: progress,
});

export const startUpload = (): UploadStartAction => ({
  type: UPLOAD_START,
});

export const uploadSuccess = (): UploadSuccessAction => ({
  type: UPLOAD_SUCCESS,
});
export const uploadCompressing = (
  isCompressing: boolean
): UploadCompressionStatus => ({
  type: UPLOAD_COMPRESS,
  payload: isCompressing,
});
export const uploadFailure = (error: string): UploadFailureAction => ({
  type: UPLOAD_FAILURE,
  payload: error,
});
