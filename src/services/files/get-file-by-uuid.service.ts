import { ENVIRONMENT } from "@/config/environment";
import { File } from "@/types/entities";
import axios, { AxiosError } from "axios";

type GetFileByUUIDRequest = {
  token: string;
  fileUUID: string;
};

type GetFileByUUIDResponse = {
  success: boolean;
  msg: string;
  file: File | null;
};

export const getFileByUUIDService = async (
  req: GetFileByUUIDRequest
): Promise<GetFileByUUIDResponse> => {
  const URL = `${ENVIRONMENT.PROXY_BASE_URL}/file/${req.fileUUID}`;

  try {
    const getFileResponse = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    });
    const { data } = getFileResponse;
    if (data.file) {
      return {
        success: true,
        msg: data.msg,
        file: data.file
      };
    }

    return {
      success: true,
      msg: data.msg,
      file: null
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to get file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      file: null
    };
  }
};
