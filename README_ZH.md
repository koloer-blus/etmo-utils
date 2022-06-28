# Etom

✔Etom是前端通用功能解决方案的集合！

[English Doc](./README.md)

## 主要模块

### Request

`Request`主要是`Axios`进行封装的`Request`类。

`Request`类参数除了支持`Axios`自带的配置参数外，还支持传入请求拦截函数(`requestCallback`)、响应拦截函数(`responseCallback`)和`GET`请求参数处理函数(`queryParamsCallback`)。

#### 初始化

1. 直接使用默认配置

这里默认会执行`const request = new Request({})`：

```js
import {request} from 'etmo';
request.get('http://test/api');
```

2. 需要自定义配置

这里需要使用`Request`类：

```js
import {Request} from 'etmo';
const request = new Request({
  requestCallback: ...,
  responseCallback: ...,
  queryParamsCallback: ...,
  baseUrl: ...,
  ...
});
```

#### 拦截器

传入的拦截器函数`requestCallback/responseCallback`接受一个`请求/响应实例`作为参数，通过使用参数的`use`方法来进行拦截和错误处理。

比如下面为请求拦截器的写法：

```js
const requestCallback = (request) => {
      request.use(
        function (config: AxiosRequestConfig) {
          // Do something before request is sent
          return config;
        },
        function (error: AxiosError) {
          // Do something with request error
          return Promise.reject(error);
        },
      );
    };
```


#### 请求方法

目前仅支持`get`、`post`、`put`、`delete`：

- `get(url[, params[, config]])`
- `post(url[, params[, config]])`
- `put(url[, params[, config]])`
- `delete(url[, params[, config]])`

#### 取消请求

目前`etmo`支持`Axios`本身支持的两种取消请求的方式：

- `controller.abort`
- `source.cancelToken`

这两种方式在`etmo`中较为简单：

```js
const req = new Request({});
// source用于cancelToken的方式取消请求
const source = req.cancel()
//abort主要适用于fetch请求的取消，主要使用AbortController
const controller = req.abort();
```

### Storage

`Storage`主要是对于前端浏览器存储`sessionStorage`和`localStorage`相关操作的封装，支持设置前缀和过期时间。

在`Storage`中，`Ltg`相关的内容代表`localStorage`，`Stg`相关的内容代表`sessionStorage`。

#### 开始

1. 直接使用`storage`

```js
import {storage} from 'etmo';
storage.get('test'); 
```

2. `new Storage()`自定义

`Storage`支持传入一个参数作为所有的存储信息`key`的前缀：

```js
import {Storage} from 'etmo';
export const storage =  new Storage('prefix');
```

#### 存储/删除/取值

1. `localStorage`

- `setLtg(key, value[, expired])`
- `delLtg(key)`
- `getLtg(key)`


2. `sessionStorage`

- `setStg(key, value[, expired])`
- `delStg(key)`
- `getStg(key)`

#### 获取浏览器`Storage`存储空间(部分浏览器可用)

- `getStorageUsedSize`

返回一个带有`Promise`的结果

#### 是否过期

用于判断设置的值是否过期：

- `isOutPeriod({key, value, expired})`

### Handler

基于`try...catch...`的通用错误处理：

#### 如何使用

首先需要传入`success`、`error`、`finally`状态下的处理函数：

- `successHandler: (value) => void`
- `errorHandler: (error) => void`
- `finalHandler: () => void`

其中`errorHandler`和`finalHandler`是可选参数。

```js
import {Handler} from 'etmo';

const temp = Handler((v) => console.info(v));

temp.use(() => {
  ....
})

```

## 注意事项

- `Request`类取消请求时，只有`Fetch`请求才可以使用`AbortController`
- `Storage`在数值过期后不会主动删除，只有在下次取值时才会进行删除或者其他操作