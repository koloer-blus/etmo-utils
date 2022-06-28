import { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
export declare type QueryHandler = (url: string, query?: any) => string;
export interface RequestProps extends AxiosRequestConfig {
    /**请求拦截器 */
    requestCallback?: (request: AxiosInterceptorManager<AxiosRequestConfig<any>>) => void;
    /**响应拦截器 */
    responseCallback?: (request: AxiosInterceptorManager<AxiosRequestConfig<any>>) => void;
    queryParamsCallback?: (url: string, query?: any) => string;
}
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
export declare type DelProps = GetProps;
export declare type SetFunc = (key: string, value: any, expired: number) => void;
export declare type DelFunc = (key: string) => string;
export declare type ErrorHandler = (e: Error) => void;
export declare type FinalHandler = () => void;
