import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { QueryHandler, RequestProps } from './types';
/**
 * request class
 *
 * Request class encapsulated with Axios
 */
export declare class Request {
    instance: AxiosInstance;
    queryHandler: QueryHandler;
    constructor(props?: RequestProps);
    cancel(): import("axios").CancelTokenSource;
    abort(): AbortController;
    requestInterceptors(props: RequestProps['requestCallback']): void;
    responseInterceptors(props: RequestProps['responseCallback']): void;
    /**
     * When a get request is initiated, the [`query-string`](https://www.npmjs.com/package/query-string) stringifyUrl is used to process the request by default.
     */
    get<V = undefined>(url: string, params?: any, config?: AxiosRequestConfig): Promise<V>;
    post<V = undefined>(url: string, params: any, config?: AxiosRequestConfig): Promise<V>;
    put<V = undefined>(url: string, params: any, config?: AxiosRequestConfig): Promise<V>;
    delete<V = undefined>(url: string, params: any, config?: AxiosRequestConfig): Promise<V>;
}
export declare const request: Request;
