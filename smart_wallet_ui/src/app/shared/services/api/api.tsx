import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback } from "react";
import { showMessage, MessageOptions } from "react-native-flash-message";
import { useEnvironment } from "../../../../environments/environments";
import { handleApiError } from "../../utils/errorHandler";

export enum VerboseAPI {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 4
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

type ApiErrorResponse = {
  message: string;
  code?: string;
};

interface RequestBaseOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

export const useApiUtils = () => {
  const { apiUrl } = useEnvironment();

  const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
  });

  async function RequestBase<ApiResponse>(
    method: VerboseAPI,
    url: string,
    params?: any,
    options?: RequestBaseOptions
  ): Promise<any> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...options?.headers,
      };

      let response: AxiosResponse;

      if (params) {
        url = `${url}?${new URLSearchParams(params).toString()}`;
      }

      switch (method) {
        case VerboseAPI.GET:
          response = await api.get(url, { headers, timeout: options?.timeout });
          break;
        case VerboseAPI.POST:
          response = await api.post(url, params, { headers, timeout: options?.timeout });
          break;
        case VerboseAPI.PUT:
          response = await api.put(url, params, { headers, timeout: options?.timeout });
          break;
        case VerboseAPI.DELETE:
          response = await api.delete(url, { headers, timeout: options?.timeout });
          break;
        default:
          throw new Error(`Invalid method ${method}`);
      }

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      console.log(error);
      handleApiError(error);
      throw error;
    }
  };

  return { RequestBase };
};
