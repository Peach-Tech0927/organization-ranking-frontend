import { AuthResponse } from "@/app/type/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
  }
  return `http://localhost:8080`;
};

const authAPI = {
  async register(
    username: string,
    email: string,
    password: string,
    githubId: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const options: AxiosRequestConfig = {
      url: `${getBaseUrl()}/api/auth/register`,
      method: "POST",
      data: {
        username,
        email,
        password,
        github_id: githubId,
      },
    };

    const response = await axios<AuthResponse>(options);
    return response;
  },

  async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const options: AxiosRequestConfig = {
      url: `${getBaseUrl()}/api/auth/login`,
      method: "POST",
      data: {
        email,
        password,
      },
    };

    const response = await axios<AuthResponse>(options);
    return response;
  },
};

export default authAPI;
