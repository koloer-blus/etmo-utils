import { ErrorHandler, FinalHandler } from './types';

const defaultErrorHandler: ErrorHandler = (e) => console.error(e);
const defaultFinalHandler: FinalHandler = () => console.log(`%c finish ${new Date()}`, 'color:blue');

const Handle = function (successHandler: (p: any) => void, errorHandler?: ErrorHandler, finalHandler?: FinalHandler) {
  this.successHandler = successHandler;
  this.errorHandler = errorHandler || defaultErrorHandler;
  this.finalHandler = finalHandler || defaultFinalHandler;
};

Handle.prototype.use = function (callback: Function) {
  try {
    const res = callback();
    this.successHandler(res);
  } catch (e) {
    this.errorHandler(e);
  } finally {
    this.finalHandler();
  }
};

export const Handler = Handle;