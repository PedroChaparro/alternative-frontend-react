import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type RenameFileRequest = {
  token: string;
  fileUUID: string;
  newName: string;
};

type RenameFileResponse = {
  success: boolean;
  msg: string;
};

export const renameFileService = async (
  req: RenameFileRequest
): Promise<RenameFileResponse> => {
  const URL = `${ENVIRONMENT.PROXY_BASE_URL}/file/${req.fileUUID}/rename`;

  try {
    const renameFileResponse = await axios.patch(
      URL,
      {
        newName: req.newName
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = renameFileResponse;

    return {
      success: true,
      msg: data.msg
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to rename the file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
