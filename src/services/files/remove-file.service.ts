import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type RemoveFileRequest = {
  token: string;
  fileUUID: string;
};

type RemoveFileResponse = {
  success: boolean;
  msg: string;
};

export const removeFileService = async (
  req: RemoveFileRequest
): Promise<RemoveFileResponse> => {
  try {
    const deleteFileResponse = await axios.delete(
      `${ENVIRONMENT.PROXY_BASE_URL}/file/${req.fileUUID}`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );

    const { data } = deleteFileResponse;

    if (deleteFileResponse.status === 200) {
      return {
        success: true,
        msg: data.msg
      };
    } else {
      return {
        success: false,
        msg: data.msg
      };
    }
  } catch (error) {
    let errorMsg = "There was an error while trying to delete the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
