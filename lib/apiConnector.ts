import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an Axios instance with credentials
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Define supported HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Define the API function's parameters and return type
export const apiConnector = async <T>(
  method: HttpMethod,
  url: string,
  bodyData?: Record<string, any> | null,
  headers?: Record<string, string> | null,
  params?: Record<string, any> | null
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data: bodyData ?? null,
      headers: headers ?? undefined,
      params: params ?? undefined,
    };

    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error) {

    if (axios.isAxiosError(error)) {
      console.error("API Error:", error);
      throw new Error(
        error.response?.data?.error || "Something went wrong, please try again."
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    
    throw error;
  }
};
