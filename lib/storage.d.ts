import { SetFunc, DelFunc, IsOutExpiredProps } from './types';
/**
 * BaseStorage
 */
declare class BaseStorage {
    /**写入时间 */
    writeTime: number;
    constructor();
    isNotExist(value: any): boolean;
}
/**
 * @class storage 存储器
 */
export declare class Storage extends BaseStorage {
    /**存储前缀 */
    private prefix;
    constructor(prefixOfKey?: string);
    /**
     * get LocalStorage by key
     */
    getLtg<T>(key: string): T | null;
    /**
     * set LocalStorage by key, value and expired
     */
    setLtg: SetFunc;
    /**
     * del LocalStorage by key
     */
    delLtg: DelFunc;
    /**
     * get SessionStorage by key
     * @param key
     */
    getStg<T>(key: string): T | null;
    /**
     * set SessionStorage by key, value and expired
     */
    setStg: SetFunc;
    /**
     * del SessionStorage by key
     */
    delStg: DelFunc;
    /**
     * set the storage value use some props
     * @param params {SetProps}
     */
    private setStorage;
    /**
     * get the value by key in the storage
     * @param params {GetProps}
     */
    private getStorage;
    /**
     * del the matched key from storage
     * @param params {DelProps}
     */
    private delStorage;
    /**
     * Calculate storage occupancy and remaining space (unit: byte)
     */
    getStorageUsedSize(): Promise<StorageEstimate>;
    /**
     * Determine whether it is expired
     */
    isOutPeriod(obj: IsOutExpiredProps): boolean;
}
export declare const storage: Storage;
export {};
