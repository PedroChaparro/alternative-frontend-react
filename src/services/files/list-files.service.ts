import { ENVIRONMENT } from "@/config/environment";
import { File } from "@/types/entities";
import axios, { AxiosError } from "axios";

type ListFilesRequest = {
  token: string;
  directory: string | null;
  isListedFromSharedFiles?: boolean;
};

type ListFilesResponse = {
  success: boolean;
  msg: string;
  files: File[];
};

export const listFilesService = async ({
  token,
  directory,
  isListedFromSharedFiles = false
}: ListFilesRequest): Promise<ListFilesResponse> => {
  const URL = directory
    ? `${ENVIRONMENT.PROXY_BASE_URL}/file/list?directoryUUID=${directory}`
    : `${ENVIRONMENT.PROXY_BASE_URL}/file/list`;

  try {
    const listFilesResponse = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = listFilesResponse;

    return {
      success: true,
      msg: data.msg,
      files: data.files.map((file: File) => ({
        ...file,
        isReady: true,
        isOwnedByUser: !isListedFromSharedFiles
      }))
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to list files";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      files: []
    };
  }
};
