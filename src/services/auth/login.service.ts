import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  msg: string;
  token: string;
};

export const loginService = async (
  req: LoginRequest
): Promise<LoginResponse> => {
  try {
    const loginResponse = await axios.post(
      `${ENVIRONMENT.PROXY_BASE_URL}/auth/login`,
      req
    );
    const { data } = loginResponse;

    return {
      success: true,
      msg: data.msg,
      token: data.token
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to login";

    if (error instanceof AxiosError) {
      errorMsg = error.response?.data.msg || errorMsg;
    }

    return {
      success: false,
      msg: errorMsg,
      token: ""
    };
  }
};
