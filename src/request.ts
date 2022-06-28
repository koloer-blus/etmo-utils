import axios, { AxiosError, AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryHandler, RequestProps } from './types';
import * as queryString from 'query-string';
import { isFunction } from './utils';

const handleCallback = (callback: any, useCallBack: (params: any) => void, params: any) => {
  if (isFunction(callback)) {
    callback(params);
  } else {
    useCallBack(params);
  }
};

const defaultQueryHandler: QueryHandler = (url, params) => queryString.stringifyUrl({ url: url, query: params });

/**
 * request class
 *
 * Request class encapsulated with Axios
 */
export class Request {
  instance: AxiosInstance;
  queryHandler: QueryHandler;

  constructor(props?: RequestProps) {
    this.instance = axios.create(props);
    this.requestInterceptors(props?.requestCallback);
    this.responseInterceptors(props?.responseCallback);
    this.queryHandler = props?.queryParamsCallback || defaultQueryHandler;
  }

  cancel() {
    const source = axios.CancelToken.source();
    return source;
  }

  abort() {
    const controller = new AbortController();
    return controller;
  }

  requestInterceptors(props: RequestProps['requestCallback']) {
    const instance = this.instance.interceptors.request;
    const useRequest = (request: AxiosInterceptorManager<AxiosRequestConfig<any>>) => {
      request.use(
        function (config: AxiosRequestConfig) {
          // Do something before request is sent
          return config;
        },
        function (error: AxiosError) {
          // Do something with request error
          return Promise.reject(error);
        },
      );
    };
    handleCallback(props, useRequest, instance);
  }

  responseInterceptors(props: RequestProps['responseCallback']) {
    const instance = this.instance.interceptors.response;
    const useResponse = (response: AxiosInterceptorManager<AxiosResponse<any, any>>) => {
      response.use(
        function (response: AxiosResponse) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response.data;
        },
        function (error: AxiosError) {
          return Promise.reject(error);
        },
      );
    };
    handleCallback(props, useResponse, instance);
  }
  /**
   * When a get request is initiated, the [`query-string`](https://www.npmjs.com/package/query-string) stringifyUrl is used to process the request by default.
   */
  get<V = undefined>(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.get<V, V, AxiosRequestConfig>(url, {
      ...config,
      params: params,
    });
  }
  post<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.post<V, V, AxiosRequestConfig>(url, params, config);
  }
  put<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V, V, AxiosRequestConfig>(url, params, config);
  }
  delete<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V, V, AxiosRequestConfig>(url, params, config);
  }
}

export const request = new Request({});
