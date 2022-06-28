export const isObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]';

export const isArray = (arr: any) => Object.prototype.toString.call(arr) === '[object Array]';

export const isFunction = (callback: any) => typeof callback === 'function';
