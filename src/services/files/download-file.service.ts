import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";


type DownloadFileRequest = {
  token: string;
  fileUUID: string;
};

type DownloadFileResponse = {
  success: boolean;
  msg: string;
  fileContent?: Blob;
  fileName?: string;
};

export const downloadFileService = async (
  req: DownloadFileRequest
): Promise<DownloadFileResponse> => {
  try {
    const downloadFileResponse = await axios.get(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/download/${req.fileUUID}`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        },
        responseType: "blob" // Set the response type to "blob" to handle binary data
      }
    );
    const { data, headers } = downloadFileResponse;

    // Extract the filename from the response headers (if available)
    const contentDisposition = headers["content-disposition"];
    let fileName = "";
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename="(.+)"/);
      if (matches) {
        fileName = matches[1];
      }
    }

    return {
      success: true,
      msg: "File downloaded successfully",
      fileContent: data,
      fileName: fileName
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
