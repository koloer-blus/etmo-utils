import { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

//>>>> request
type QueryHandler = (url: string, query?: any) => string;

interface RequestProps extends AxiosRequestConfig {
  /**请求拦截器 */
  requestCallback?: (request: AxiosInterceptorManager<AxiosRequestConfig<any>>) => void;
  /**响应拦截器 */
  responseCallback?: (request: AxiosInterceptorManager<AxiosRequestConfig<any>>) => void;
  queryParamsCallback?: (url: string, query?: any) => string;
}

//>>>> storage

interface StorageBaseProps {
  isLocal: boolean;
}

/**设置存储 */
interface SetProps extends StorageBaseProps {
  key: string;
  value: string;
  expired: number;
}

/**获取存储 */
interface GetProps extends StorageBaseProps {
  key: string;
}

interface IsOutExpiredProps {
  value: any;
  writeTime: number;
  expired: number;
}

/**
 * 删除存储
 */
type DelProps = GetProps;

type SetFunc = (key: string, value: any, expired: number) => void;
type DelFunc = (key: string) => string;

// Handler
type ErrorHandler = (e: Error) => void;
type FinalHandler = () => void;
