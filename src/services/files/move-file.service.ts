import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type MoveFileRequest = {
  token: string;
  fileUUID: string;
  directoryUUID: string | null;
};

type MoveFileResponse = {
  success: boolean;
  msg: string;
};

export const moveFileService = async (
  req: MoveFileRequest
): Promise<MoveFileResponse> => {
  const { fileUUID, directoryUUID } = req;
  const URL = `${ENVIRONMENT.PROXY_BASE_URL}/file/${fileUUID}/move`;

  try {
    const moveFileResponse = await axios.patch(
      URL,
      {
        targetDirectoryUUID: directoryUUID
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = moveFileResponse;

    return {
      success: true,
      msg: data.msg
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to move file";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
