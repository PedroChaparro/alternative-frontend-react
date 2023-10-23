import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type ShareFileRequest = {
  token: string;
  fileUUID: string;
  otherUsername: string;
};

type ShareFileResponse = {
  success: boolean;
  msg: string;
};

export const shareFileService = async (
  req: ShareFileRequest
): Promise<ShareFileResponse> => {
  const URL = `${ENVIRONMENT.PROXY_BASE_URL}/file/share`;

  try {
    const shareFileResponse = await axios.post(
      URL,
      {
        fileUUID: req.fileUUID,
        otherUsername: req.otherUsername
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = shareFileResponse;

    return {
      success: true,
      msg: data.msg
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to share the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
