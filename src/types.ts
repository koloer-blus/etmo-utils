import { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

//>>>> request
export type QueryHandler = (url: string, query?: any) => string;

export interface RequestProps extends AxiosRequestConfig {
  /**请求拦截器 */
  requestCallback?: (request: AxiosInterceptorManager<AxiosRequestConfig<any>>) => void;
  /**响应拦截器 */
  responseCallback?: (request: AxiosInterceptorManager<AxiosRequestConfig<any>>) => void;
  queryParamsCallback?: (url: string, query?: any) => string;
}

//>>>> storage

export interface StorageBaseProps {
  isLocal: boolean;
}

/**设置存储 */
export interface SetProps extends StorageBaseProps {
  key: string;
  value: string;
  expired: number;
}

/**获取存储 */
export interface GetProps extends StorageBaseProps {
  key: string;
}

export interface IsOutExpiredProps {
  value: any;
  writeTime: number;
  expired: number;
}

/**
 * 删除存储
 */
export type DelProps = GetProps;

export type SetFunc = (key: string, value: any, expired: number) => void;
export type DelFunc = (key: string) => string;

// Handler
export type ErrorHandler = (e: Error) => void;
export type FinalHandler = () => void;
