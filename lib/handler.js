"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
var defaultErrorHandler = function (e) { return console.error(e); };
var defaultFinalHandler = function () { return console.log("%c finish ".concat(new Date()), 'color:blue'); };
var Handle = function (successHandler, errorHandler, finalHandler) {
    this.successHandler = successHandler;
    this.errorHandler = errorHandler || defaultErrorHandler;
    this.finalHandler = finalHandler || defaultFinalHandler;
};
Handle.prototype.use = function (callback) {
    try {
        var res = callback();
        this.successHandler(res);
    }
    catch (e) {
        this.errorHandler(e);
    }
    finally {
        this.finalHandler();
    }
};
exports.Handler = Handle;
