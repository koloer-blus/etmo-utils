"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.Request = void 0;
var axios_1 = require("axios");
var queryString = require("query-string");
var utils_1 = require("./utils");
var handleCallback = function (callback, useCallBack, params) {
    if ((0, utils_1.isFunction)(callback)) {
        callback(params);
    }
    else {
        useCallBack(params);
    }
};
var defaultQueryHandler = function (url, params) { return queryString.stringifyUrl({ url: url, query: params }); };
/**
 * request class
 *
 * Request class encapsulated with Axios
 */
var Request = /** @class */ (function () {
    function Request(props) {
        this.instance = axios_1.default.create(props);
        this.requestInterceptors(props === null || props === void 0 ? void 0 : props.requestCallback);
        this.responseInterceptors(props === null || props === void 0 ? void 0 : props.responseCallback);
        this.queryHandler = (props === null || props === void 0 ? void 0 : props.queryParamsCallback) || defaultQueryHandler;
    }
    Request.prototype.cancel = function () {
        var source = axios_1.default.CancelToken.source();
        return source;
    };
    Request.prototype.abort = function () {
        var controller = new AbortController();
        return controller;
    };
    Request.prototype.requestInterceptors = function (props) {
        var instance = this.instance.interceptors.request;
        var useRequest = function (request) {
            request.use(function (config) {
                // Do something before request is sent
                return config;
            }, function (error) {
                // Do something with request error
                return Promise.reject(error);
            });
        };
        handleCallback(props, useRequest, instance);
    };
    Request.prototype.responseInterceptors = function (props) {
        var instance = this.instance.interceptors.response;
        var useResponse = function (response) {
            response.use(function (response) {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response.data;
            }, function (error) {
                return Promise.reject(error);
            });
        };
        handleCallback(props, useResponse, instance);
    };
    /**
     * When a get request is initiated, the [`query-string`](https://www.npmjs.com/package/query-string) stringifyUrl is used to process the request by default.
     */
    Request.prototype.get = function (url, params, config) {
        return this.instance.get(url, __assign(__assign({}, config), { params: params }));
    };
    Request.prototype.post = function (url, params, config) {
        return this.instance.post(url, params, config);
    };
    Request.prototype.put = function (url, params, config) {
        return this.instance.put(url, params, config);
    };
    Request.prototype.delete = function (url, params, config) {
        return this.instance.put(url, params, config);
    };
    return Request;
}());
exports.Request = Request;
exports.request = new Request({});
