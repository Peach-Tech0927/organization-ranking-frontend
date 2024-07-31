import { AuthRegisterResponse } from "@/app/type/auth";
import axios, { AxiosResponse } from "axios";

const authAPI = {
  async register(
    username: string,
    email: string,
    password: string,
    githubId: string
  ): Promise<AxiosResponse<AuthRegisterResponse>> {
    const response = await axios.post<AuthRegisterResponse>(
      "http://localhost:8080/api/auth/register",
      {
        username,
        email,
        password,
        github_id: githubId,
      }
    );
    return response;
  },
};

export default authAPI;
