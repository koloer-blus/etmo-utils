"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.Storage = void 0;
/**
 * BaseStorage
 */
var BaseStorage = /** @class */ (function () {
    function BaseStorage() {
        this.writeTime = Number(new Date());
    }
    BaseStorage.prototype.isNotExist = function (value) {
        return value === null || typeof value === 'undefined';
    };
    return BaseStorage;
}());
/**
 * @class storage 存储器
 */
var Storage = /** @class */ (function (_super) {
    __extends(Storage, _super);
    function Storage(prefixOfKey) {
        var _this = _super.call(this) || this;
        /**
         * set LocalStorage by key, value and expired
         */
        _this.setLtg = function (key, value, expired) {
            _this.setStorage({
                key: key,
                value: value,
                expired: expired,
                isLocal: true,
            });
        };
        /**
         * del LocalStorage by key
         */
        _this.delLtg = function (key) {
            _this.delStorage({
                key: key,
                isLocal: true,
            });
            return key;
        };
        /**
         * set SessionStorage by key, value and expired
         */
        _this.setStg = function (key, value, expired) {
            _this.setStorage({
                key: key,
                value: value,
                expired: expired,
                isLocal: false,
            });
        };
        /**
         * del SessionStorage by key
         */
        _this.delStg = function (key) {
            _this.delStorage({
                key: key,
                isLocal: false,
            });
            return key;
        };
        _this.prefix = prefixOfKey || '';
        return _this;
    }
    // >>> LocalStorage
    /**
     * get LocalStorage by key
     */
    Storage.prototype.getLtg = function (key) {
        return this.getStorage({
            key: key,
            isLocal: true,
        });
    };
    // >>>> sessionStorage
    /**
     * get SessionStorage by key
     * @param key
     */
    Storage.prototype.getStg = function (key) {
        return this.getStorage({
            key: key,
            isLocal: false,
        });
    };
    /**
     * set the storage value use some props
     * @param params {SetProps}
     */
    Storage.prototype.setStorage = function (params) {
        var value = params.value, expired = params.expired, isLocal = params.isLocal, key = params.key;
        var sKey = this.prefix + key;
        var data = {
            value: value,
            writeTime: this.writeTime,
            expired: expired,
        };
        if (isLocal) {
            localStorage.setItem(sKey, JSON.stringify(data));
        }
        else {
            sessionStorage.setItem(sKey, JSON.stringify(data));
        }
    };
    /**
     * get the value by key in the storage
     * @param params {GetProps}
     */
    Storage.prototype.getStorage = function (params) {
        var isLocal = params.isLocal, key = params.key;
        var sKey = this.prefix + key;
        var dataJSON = null;
        if (isLocal) {
            dataJSON = localStorage.getItem(sKey);
        }
        else {
            dataJSON = sessionStorage.getItem(sKey);
        }
        if (this.isNotExist(dataJSON)) {
            return null;
        }
        var data = JSON.parse(dataJSON);
        if (this.isNotExist(data.expired)) {
            return data.value;
        }
        if (this.isOutPeriod(data)) {
            this.delStorage({ key: sKey, isLocal: isLocal });
            return null;
        }
        return data.value;
    };
    /**
     * del the matched key from storage
     * @param params {DelProps}
     */
    Storage.prototype.delStorage = function (params) {
        var isLocal = params.isLocal, key = params.key;
        var sKey = this.prefix + key;
        if (isLocal) {
            localStorage.removeItem(sKey);
        }
        else {
            sessionStorage.removeItem(sKey);
        }
    };
    /**
     * Calculate storage occupancy and remaining space (unit: byte)
     */
    Storage.prototype.getStorageUsedSize = function () {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            return navigator.storage.estimate();
        }
        return Promise.reject(null);
    };
    /**
     * Determine whether it is expired
     */
    Storage.prototype.isOutPeriod = function (obj) {
        if (!obj.value) {
            return true;
        }
        var readTime = Number(new Date());
        return readTime - obj.writeTime > obj.expired;
    };
    return Storage;
}(BaseStorage));
exports.Storage = Storage;
exports.storage = new Storage('');
