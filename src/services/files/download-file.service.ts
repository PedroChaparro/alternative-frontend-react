import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type DownloadFileRequest = {
  token: string;
  fileUUID: string;
};

export const downloadFileService = async (
  req: DownloadFileRequest
): Promise<Blob> => {
  try {
    const response = await axios.get(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/download/${req.fileUUID}`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        },
        responseType: 'blob'
      }
    );

    return response.data; 
  } catch (error) {
    let errorMsg = "There was an error while trying to download the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    throw new Error(errorMsg);
  }
};
