import { ENVIRONMENT } from "@/config/environment";
import axios, { AxiosError } from "axios";

type ChallengeServiceResponse = {
  success: boolean;
  msg: string;
  token: string;
};

export const challengeService = async (
  token: string
): Promise<ChallengeServiceResponse> => {
  try {
    const response = await axios.post(
      `${ENVIRONMENT.PROXY_BASE_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const { data } = response;
    if (!data.token) {
      return {
        success: false,
        msg: "Token is not valid",
        token: ""
      };
    }

    return {
      success: true,
      msg: "Token is valid",
      token: data.token
    };
  } catch (error) {
    let errorMsg = "There was an error while trying to validate the token";

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
