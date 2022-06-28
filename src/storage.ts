import { SetFunc, DelFunc, SetProps, GetProps, DelProps, IsOutExpiredProps } from './types';

/**
 * BaseStorage
 */
class BaseStorage {
  /**写入时间 */
  writeTime: number;
  constructor() {
    this.writeTime = Number(new Date());
  }
  isNotExist(value: any) {
    return value === null || typeof value === 'undefined';
  }
}

/**
 * @class storage 存储器
 */
export class Storage extends BaseStorage {
  /**存储前缀 */
  private prefix: string;
  constructor(prefixOfKey?: string) {
    super();
    this.prefix = prefixOfKey || '';
  }
  // >>> LocalStorage
  /**
   * get LocalStorage by key
   */
  getLtg<T>(key: string) {
    return this.getStorage<T>({
      key,
      isLocal: true,
    });
  }
  /**
   * set LocalStorage by key, value and expired
   */
  setLtg: SetFunc = (key, value, expired) => {
    this.setStorage({
      key,
      value,
      expired,
      isLocal: true,
    });
  };
  /**
   * del LocalStorage by key
   */
  delLtg: DelFunc = (key: string) => {
    this.delStorage({
      key,
      isLocal: true,
    });
    return key;
  };
  // >>>> sessionStorage
  /**
   * get SessionStorage by key
   * @param key
   */
  getStg<T>(key: string) {
    return this.getStorage<T>({
      key,
      isLocal: false,
    });
  }

  /**
   * set SessionStorage by key, value and expired
   */
  setStg: SetFunc = (key, value, expired) => {
    this.setStorage({
      key,
      value,
      expired,
      isLocal: false,
    });
  };
  /**
   * del SessionStorage by key
   */
  delStg: DelFunc = (key: string) => {
    this.delStorage({
      key,
      isLocal: false,
    });
    return key;
  };

  /**
   * set the storage value use some props
   * @param params {SetProps}
   */
  private setStorage(params: SetProps) {
    const { value, expired, isLocal, key } = params;
    const sKey = this.prefix + key;
    let data = {
      value,
      writeTime: this.writeTime,
      expired,
    };
    if (isLocal) {
      localStorage.setItem(sKey, JSON.stringify(data));
    } else {
      sessionStorage.setItem(sKey, JSON.stringify(data));
    }
  }

  /**
   * get the value by key in the storage
   * @param params {GetProps}
   */
  private getStorage<V = null>(params: GetProps): V | null {
    const { isLocal, key } = params;
    const sKey = this.prefix + key;
    let dataJSON = null;
    if (isLocal) {
      dataJSON = localStorage.getItem(sKey);
    } else {
      dataJSON = sessionStorage.getItem(sKey);
    }

    if (this.isNotExist(dataJSON)) {
      return null;
    }
    let data = JSON.parse(dataJSON as any);

    if (this.isNotExist(data.expired)) {
      return data.value;
    }

    if (this.isOutPeriod(data)) {
      this.delStorage({ key: sKey, isLocal });
      return null;
    }
    return data.value;
  }

  /**
   * del the matched key from storage
   * @param params {DelProps}
   */
  private delStorage(params: DelProps) {
    const { isLocal, key } = params;
    const sKey = this.prefix + key;
    if (isLocal) {
      localStorage.removeItem(sKey);
    } else {
      sessionStorage.removeItem(sKey);
    }
  }

  /**
   * Calculate storage occupancy and remaining space (unit: byte)
   */
  getStorageUsedSize(): Promise<StorageEstimate> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return navigator.storage.estimate();
    }
    return Promise.reject(null);
  }

  /**
   * Determine whether it is expired
   */
  isOutPeriod(obj: IsOutExpiredProps): boolean {
    if (!obj.value) {
      return true;
    }
    let readTime = Number(new Date());
    return readTime - obj.writeTime > obj.expired;
  }
}

export const storage = new Storage('');
