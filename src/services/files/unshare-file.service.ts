import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type UnshareFileRequest = {
  token: string;
  fileUUID: string;
  otherUsername: string;
};

type UnshareFileResponse = {
  success: boolean;
  msg: string;
};

export const unshareFileService = async (
  req: UnshareFileRequest
): Promise<UnshareFileResponse> => {
  const URL = `${ENVIRONMENT.PROXY_BASE_URL}/file/unshare`;

  try {
    const unshareFileResponse = await axios.post(
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
    const { data } = unshareFileResponse;

    return {
      success: true,
      msg: data.msg
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to un-share the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
