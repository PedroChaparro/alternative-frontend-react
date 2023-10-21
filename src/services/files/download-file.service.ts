import { ENVIRONMENT } from "@/config/environment";
import axios from "axios";

type DownloadFileRequest = {
  token: string;
  fileUUID: string;
};

export const downloadFileService = async (
  req: DownloadFileRequest
): Promise<Blob> => {
  const response = await axios.get(
    `${ENVIRONMENT.PROXY_BASE_URL}/file/download/${req.fileUUID}`,
    {
      headers: {
        Authorization: `Bearer ${req.token}`
      },
      responseType: "blob"
    }
  );

  return response.data;
};
