import axios from 'axios';
import type { AxiosRequestHeaders } from 'axios';

interface IApiConnector<TBody = Record<string, unknown> > {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'; 
  url: string;
  bodyData?: TBody;
  headers?: AxiosRequestHeaders;
  params?: Record<string, number>;
  withCredentials:boolean
}

export const axiosInstance = axios.create({});

export const apiConnector = ({
  method,
  url,
  bodyData,
  headers,
  params,
  withCredentials
}: IApiConnector) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: headers ?? {},
    params: params ?? {},
    withCredentials,
  });
};
