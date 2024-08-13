import axios, { AxiosResponse } from "axios";
import { showMessage } from "react-native-flash-message";
import enviroment from '../../../../enviroments/environments';

export enum verboseAPI {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 4
}

export const api = axios.create({
  baseURL: enviroment.BACKEND_URL,
});

export default function RequestBase<T>(method: verboseAPI, url: string, params?: any): Promise<T>{
  return new Promise<T>(async (resolve, reject) => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      let response: AxiosResponse<T>;
      switch (method) {
        case verboseAPI.GET:
          if (params) {
            url = `${url}?${params}`;
          }
          response = await api.get(url, {headers});
          break;
        case verboseAPI.POST:
          response = await api.post(url, params, {headers});
          break;
        case verboseAPI.PUT:
          response = await api.put(url, params, {headers});
          break;
        case verboseAPI.DELETE:
          response = await api.delete(url, {headers});
          break;
        default:
          throw new Error(`Invalid method ${method}`);
      }

      resolve(response.data);
    } catch (error: any) {
      showMessage({
        message: `Verifique sua conexão com a internet [${error.message}]`,
        type: 'danger',
      });
      reject(error);
    }
  });
}
