# Etom

✔Etom is a collection of front-end universal functional solutions!

[中文文档](./README_ZH.md)

## Install

```shell
npm install etmo

yarn add etmo
```

## main module

### Request

`Request` is mainly the `Request` class encapsulated by `Axios`.

`Request` class parameters not only support the configuration parameters that come with `Axios`, but also support incoming request interception function (`requestCallback`), response interception function (`responseCallback`) and `GET` request parameter processing function (`queryParamsCallback` ).

#### Initialize

1. Use the default configuration directly

This will execute `const request = new Request({})` by default:

````js
import {request} from 'etmo';
request.get('http://test/api');
````

2. Requires custom configuration

Here you need to use the `Request` class:

````js
import {Request} from 'etmo';
const request = new Request({
  requestCallback: ...,
  responseCallback: ...,
  queryParamsCallback: ...,
  baseUrl: ...,
  ...
});
````

#### Interceptor

The incoming interceptor function `requestCallback/responseCallback` accepts a `request/response instance` as a parameter, and intercepts and handles errors by using the `use` method of the parameter.

For example, the following is the writing method of the request interceptor:

````js
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
````


#### request method

Currently only `get`, `post`, `put`, `delete` are supported:

- `get(url[, params[, config]])`
- `post(url[, params[, config]])`
- `put(url[, params[, config]])`
- `delete(url[, params[, config]])`

#### cancel request

Currently `etmo` supports two methods of canceling requests that `Axios` natively supports:

- `controller.abort`
- `source.cancelToken`

These two ways are simpler in `etmo`:

````js
const req = new Request({});
// source is used to cancel the request by cancelToken
const source = req.cancel()
//abort is mainly applicable to the cancellation of fetch requests, mainly using AbortController
const controller = req.abort();
````

### Storage

`Storage` mainly encapsulates operations related to front-end browser storage `sessionStorage` and `localStorage`, and supports setting prefix and expiration time.

In `Storage`, the content related to `Ltg` represents `localStorage`, and the content related to `Stg` represents `sessionStorage`.

#### start

1. Use `storage` directly

````js
import {storage} from 'etmo';
storage.get('test');
````

2. `new Storage()` custom

`Storage` supports passing a parameter as a prefix for all storage information `key`:

````js
import {Storage} from 'etmo';
export const storage = new Storage('prefix');
````

#### store/delete/retrieve

1. `localStorage`

- `setLtg(key, value[, expired])`
- `delLtg(key)`
- `getLtg(key)`


2. `sessionStorage`

- `setStg(key, value[, expired])`
- `delStg(key)`
- `getStg(key)`

#### Get browser `Storage` storage space (available in some browsers)

- `getStorageUsedSize`

Returns a result with a `Promise`

#### Does it expire?

Used to determine whether the set value has expired:

- `isOutPeriod({key, value, expired})`

### Handler

Generic error handling based on `try...catch...`:

#### how to use

First, you need to pass in the handler functions in the `success`, `error`, and `finally` states:

- `successHandler: (value) => void`
- `errorHandler: (error) => void`
- `finalHandler: () => void`

where `errorHandler` and `finalHandler` are optional parameters.

````js
import {Handler} from 'etmo';

const temp = Handler((v) => console.info(v));

temp.use(() => {
  ....
})

````

## Precautions

- When the `Request` class cancels the request, only the `Fetch` request can use the `AbortController`
- `Storage` will not be actively deleted after the value expires, and will only be deleted or other operations when the value is retrieved next time