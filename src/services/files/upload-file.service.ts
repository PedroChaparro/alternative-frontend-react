import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type UploadFileRequest = {
  token: string;
  file: File;
  directory: string | null;
};

type UploadFileResponse = {
  success: boolean;
  msg: string;
  fileUUID: string;
};

export const uploadFileService = async (
  req: UploadFileRequest
): Promise<UploadFileResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", req.file);
    formData.append("location", req.directory || "");

    const uploadFileResponse = await axios.post(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = uploadFileResponse;

    return {
      success: true,
      msg: data.msg,
      fileUUID: data.fileUUID
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to upload the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      fileUUID: ""
    };
  }
};
