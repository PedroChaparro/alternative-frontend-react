import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  token: string;
};

type UpdatePasswordResponse = {
  success: boolean;
  msg: string;
};

export const updatePasswordService = async (
  req: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> => {
  try {
    const updatePasswordResponse = await axios.patch(
      `${ENVIRONMENT.PROXY_BASE_URL}/account/password`,
      req,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );
    const { data } = updatePasswordResponse;

    return {
      success: true,
      msg: data.msg
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to update your password";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
