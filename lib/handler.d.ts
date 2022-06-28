import { ErrorHandler, FinalHandler } from './types';
export declare class Handler {
    successHandler: (p: any) => void;
    errorHandler: ErrorHandler;
    finalHandler: FinalHandler;
    constructor(successHandler: (p: any) => void, errorHandler?: ErrorHandler, finalHandler?: FinalHandler);
    use(callback: Function): void;
}
