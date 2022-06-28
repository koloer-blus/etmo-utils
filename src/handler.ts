import { ErrorHandler, FinalHandler } from './types';

const defaultErrorHandler: ErrorHandler = (e) => console.error(e);
const defaultFinalHandler: FinalHandler = () => console.log(`%c finish ${new Date()}`, 'color:blue');

export class Handler {
  successHandler: (p: any) => void;
  errorHandler: ErrorHandler;
  finalHandler: FinalHandler;
  constructor(
    successHandler: (p: any) => void,
    errorHandler?: ErrorHandler,
    finalHandler?: FinalHandler
  ) {
    this.successHandler = successHandler;
    this.errorHandler = errorHandler || defaultErrorHandler;
    this.finalHandler = finalHandler || defaultFinalHandler;
  };

  use(callback: Function) {
    try {
      const res = callback();
      this.successHandler(res);
    } catch (e: any) {
      this.errorHandler(e);
    } finally {
      this.finalHandler();
    }
  };
}
