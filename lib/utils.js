"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isArray = exports.isObject = void 0;
var isObject = function (obj) { return Object.prototype.toString.call(obj) === '[object Object]'; };
exports.isObject = isObject;
var isArray = function (arr) { return Object.prototype.toString.call(arr) === '[object Array]'; };
exports.isArray = isArray;
var isFunction = function (callback) { return typeof callback === 'function'; };
exports.isFunction = isFunction;
