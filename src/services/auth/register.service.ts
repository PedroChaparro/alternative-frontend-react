import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type RegisterRequest = {
  username: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = {
  success: boolean;
  msg: string;
  token?: string;
};

export const registerService = async (
  req: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const registerResponse = await axios.post(
      `${ENVIRONMENT.PROXY_BASE_URL}/account/register`,
      req
    );
    const { data } = registerResponse;

    return {
      success: true,
      msg: data.msg,
      token: data.token
    };
  } catch (error) {
    let errorMsg = "There was an error registering your account";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg
    };
  }
};
