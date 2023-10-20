import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type CreateFoldersRequest = {
  token: string;
  name: string;
  directory: string | null;
};

type CreateFoldersResponse = {
  success: boolean;
  msg: string;
  directoryUUID: string;
};

export const createFoldersService = async (
  req: CreateFoldersRequest
): Promise<CreateFoldersResponse> => {
  try {
    const createFoldersResponse = await axios.post(
      `${ENVIRONMENT.PROXY_BASE_URL}/folders`,
      {
        directoryName: req.name,
        location: req.directory
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = createFoldersResponse;

    return {
      success: true,
      msg: data.msg,
      directoryUUID: data.directoryUUID
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to create folders";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      directoryUUID: ""
    };
  }
};
