import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type DownloadFileRequest = {
  token: string;
  fileUUID: string;
};

type DownloadFileResponse = {
  success: boolean;
  msg: string;
};

export const downloadFileService = async (
  req: DownloadFileRequest
): Promise<DownloadFileResponse> => {
  try {
    await axios.get(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/download/${req.fileUUID}`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    
    return {
      success: true,
      msg: "File downloaded successfully"
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to download the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
