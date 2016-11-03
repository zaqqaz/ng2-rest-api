exports["ng2-rest-api"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(2);
var common_1 = __webpack_require__(6);
var Ng2RestApiModule = function () {
    function Ng2RestApiModule() {}
    /**
     * Creates a module with a provider registering endpoints.
     */
    Ng2RestApiModule.configure = function (config) {
        return {
            ngModule: Ng2RestApiModule,
            providers: [provideApiConfig(config)]
        };
    };
    Ng2RestApiModule = __decorate([core_1.NgModule({
        imports: [common_1.CommonModule]
    }), __metadata('design:paramtypes', [])], Ng2RestApiModule);
    return Ng2RestApiModule;
}();
exports.Ng2RestApiModule = Ng2RestApiModule;
exports.API_CONFIG = new core_1.OpaqueToken('API_CONFIG');
function provideApiConfig(config) {
    return [{ provide: exports.API_CONFIG, multi: true, useValue: config }];
}
exports.provideApiConfig = provideApiConfig;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
"use strict";

var Helper = function () {
    function Helper() {}
    // /**
    //  * Copy instance with their methods
    //  */
    Helper.copyInstances = function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) {
            Object.defineProperties(target, Object.keys(source).reduce(function (descriptors, key) {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                return descriptors;
            }, {}));
        });
        return target;
    };
    /**
     * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
     * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
     * (pchar) allowed in path segments:
     *    segment       = *pchar
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    Helper.encodeUriSegment = function (val) {
        return Helper.encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
    };
    /**
     * This method is intended for encoding *key* or *value* parts of query component. We need a
     * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
     * have to be encoded per http://tools.ietf.org/html/rfc3986:
     *    query       = *( pchar / "/" / "?" )
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    Helper.encodeUriQuery = function (val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
    };
    // Helper functions and regex to lookup a dotted path on an object
    // stopping at undefined/null.  The path must be composed of ASCII
    // identifiers (just like $parse)
    Helper.isValidDottedPath = function (path) {
        var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
        return path != null && path !== '' && path !== 'hasOwnProperty' && MEMBER_NAME_REGEX.test('.' + path);
    };
    Helper.lookupDottedPath = function (obj, path) {
        if (!Helper.isValidDottedPath(path)) {
            throw Error("Dotted member path \"" + path + "\" is invalid.");
        }
        var keys = path.split('.');
        for (var i = 0, ii = keys.length; i < ii && typeof obj !== 'undefined'; i++) {
            var key = keys[i];
            obj = obj !== null ? obj[key] : undefined;
        }
        return obj;
    };
    Helper.extractParams = function (data, actionParams) {
        var ids = {};
        for (var _i = 0, _a = Object.keys(actionParams); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = actionParams[key];
            if (value && typeof value === 'function') {
                value = value();
            }
            ids[key] = value && value.charAt && value.charAt(0) == '@' ? Helper.lookupDottedPath(data, value.substr(1)) : value;
        }
        return ids;
    };
    Helper.setUrlParams = function (data, params, actionUrl) {
        var protocolAndDomain = '',
            urlParams = {},
            url = actionUrl,
            PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/,
            val,
            encodedVal;
        url.split(/\W/).forEach(function (param) {
            if (param === 'hasOwnProperty') {
                throw Error("hasOwnProperty is not a valid parameter name.");
            }
            if (!new RegExp("^\\d+$").test(param) && param && new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url)) {
                var isQueryParamValue = new RegExp("\\?.*=:" + param + "(?:\\W|$)").test(url);
                urlParams[param] = {
                    isQueryParamValue: isQueryParamValue
                };
                if (!params[param] && !isQueryParamValue) {
                    params[param] = '@' + param;
                }
            }
        });
        url = url.replace(/\\:/g, ':');
        url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function (match) {
            protocolAndDomain = match;
            return '';
        });
        params = Helper.extractParams(data, params) || {};
        for (var _i = 0, _a = Object.keys(urlParams); _i < _a.length; _i++) {
            var urlParam = _a[_i];
            var paramInfo = urlParams[urlParam];
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : '';
            if (typeof val !== 'undefined' && val !== null) {
                if (paramInfo.isQueryParamValue) {
                    encodedVal = Helper.encodeUriQuery(val, true);
                } else {
                    encodedVal = Helper.encodeUriSegment(val);
                }
                url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function (match, p1) {
                    return encodedVal + p1;
                });
            } else {
                url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function (match, leadingSlashes, tail) {
                    if (tail.charAt(0) == '/') {
                        return tail;
                    } else {
                        return leadingSlashes + tail;
                    }
                });
            }
        }
        url = url.replace(/\/+$/, '') || '/';
        // then replace collapse `/.` if found in the last URL path segment before the query
        // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
        url = url.replace(/\/\.(?=\w+($|\?))/, '.');
        // replace escaped `/\.` with `/.`
        var compiledUrl = protocolAndDomain + url.replace(/\/\\\./, '/.');
        // set other get params
        for (var _b = 0, _c = Object.keys(params); _b < _c.length; _b++) {
            var key = _c[_b];
            var value = params[key];
            if (!urlParams[key] && value) {
                compiledUrl += (compiledUrl.indexOf("?") < 0 ? "?" : "&") + key + "=" + value;
            }
        }
        return compiledUrl;
    };
    Helper.normalizeUrl = function (str) {
        // make sure protocol is followed by two slashes
        str = str.replace(/:\//g, '://');
        // remove consecutive slashes
        str = str.replace(/([^:\s])\/+/g, '$1/');
        // remove trailing slash before parameters or hash
        str = str.replace(/\/(\?|&|#[^!])/g, '$1');
        // replace ? in parameters with &
        str = str.replace(/(\?.+)\?/g, '$1&');
        return str;
    };
    Helper.readHeaders = function (headersForReading, headers) {
        var result = {};
        headersForReading.forEach(function (headerKey) {
            var header = headers.get(headerKey);
            if (header) {
                result[headerKey] = header;
            }
        });
        return result;
    };
    return Helper;
}();
exports.Helper = Helper;

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("@angular/core");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("@angular/http");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
var core_1 = __webpack_require__(2);
var ng2_rest_api_module_1 = __webpack_require__(0);
var helper_1 = __webpack_require__(1);
var http_1 = __webpack_require__(3);
var apiEndpoint_1 = __webpack_require__(5);
var ApiProvider = function () {
    function ApiProvider(configs, http) {
        var _this = this;
        this.http = http;
        configs.forEach(function (c) {
            return _this.endpoints = _this.configureEndpoints(c).slice();
        });
    }
    ApiProvider.prototype.endpoint = function (name) {
        var endpoint;
        this.endpoints.some(function (e) {
            if (e.name === name) {
                endpoint = e;
                return true;
            }
            return false;
        });
        return new apiEndpoint_1.ApiEndpoint(this.http, endpoint);
    };
    ApiProvider.prototype.configureEndpoints = function (config) {
        var defaultActions = [{
            name: 'get',
            method: 'GET'
        }, {
            name: 'query',
            method: 'GET',
            isArray: true
        }, {
            name: 'save',
            method: 'POST'
        }, {
            name: 'update',
            method: 'PUT'
        }, {
            name: 'patch',
            method: 'PATCH'
        }, {
            name: 'remove',
            method: 'DELETE'
        }];
        return config.endpoints.map(function (e) {
            e.route = helper_1.Helper.normalizeUrl([config.baseUrl, e.route].join('/'));
            // add defaults actions
            e.actions = e.actions || [];
            e.actions.forEach(function (a) {
                if (a.name.toLowerCase() === 'get') {
                    defaultActions.find(function (a) {
                        return a.name === 'get';
                    })['skip'] = true;
                }
                if (a.name.toLowerCase() === 'query') {
                    defaultActions.find(function (a) {
                        return a.name === 'query';
                    })['skip'] = true;
                }
                if (a.name.toLowerCase() === 'save') {
                    defaultActions.find(function (a) {
                        return a.name === 'save';
                    })['skip'] = true;
                }
                if (a.name.toLowerCase() === 'update') {
                    defaultActions.find(function (a) {
                        return a.name === 'update';
                    })['skip'] = true;
                }
                if (a.name.toLowerCase() === 'patch') {
                    defaultActions.find(function (a) {
                        return a.name === 'patch';
                    })['skip'] = true;
                }
                if (a.name.toLowerCase() === 'remove') {
                    defaultActions.find(function (a) {
                        return a.name === 'remove';
                    })['skip'] = true;
                }
            });
            e.actions = e.actions.concat(defaultActions.filter(function (a) {
                return !a['skip'];
            }));
            return e;
        });
    };
    ApiProvider = __decorate([core_1.Injectable(), __param(0, core_1.Inject(ng2_rest_api_module_1.API_CONFIG)), __metadata('design:paramtypes', [Array, http_1.Http])], ApiProvider);
    return ApiProvider;
}();
exports.ApiProvider = ApiProvider;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var http_1 = __webpack_require__(3);
var helper_1 = __webpack_require__(1);
var lang_1 = __webpack_require__(7);
var rxjs_1 = __webpack_require__(8);
var ApiEndpoint = function () {
    function ApiEndpoint(http, endpoint) {
        this.http = http;
        this.endpoint = endpoint;
    }
    ApiEndpoint.prototype.action = function (actionName, data, params) {
        var _this = this;
        if (data === void 0) {
            data = {};
        }
        if (params === void 0) {
            params = {};
        }
        var request;
        this.endpoint.actions.some(function (action) {
            if (action.name.toLowerCase() === actionName.toLowerCase()) {
                var isSaveRequest = action.method === 'PUT' || action.method === 'POST';
                // if is not save request - we don't have body data, only get params.
                if (!isSaveRequest) {
                    params = data;
                }
                var compiledUrl = helper_1.Helper.setUrlParams(data, Object.assign({}, action.params, params), _this.endpoint.route);
                // copy entity to prevent side-effects and execute beforeSave method for save requests
                var copiedRequestData = helper_1.Helper.copyInstances(data);
                if (isSaveRequest && copiedRequestData && lang_1.isFunction(copiedRequestData.beforeSave)) {
                    copiedRequestData.beforeSave();
                }
                var requestOptions = new http_1.RequestOptions({
                    method: action.method,
                    url: compiledUrl,
                    body: JSON.stringify(copiedRequestData)
                });
                request = _this.http.request(compiledUrl, requestOptions).map(function (response) {
                    var mappedResponse;
                    if (action.instantiateModel === false || !response.text()) {
                        mappedResponse = response.text();
                    } else {
                        var responseBody = response.json(),
                            responseIsArray = Array.isArray(responseBody);
                        if (action.isArray && !responseIsArray) {
                            throw new Error('API: Response not array but should');
                        } else if (!action.isArray && responseIsArray) {
                            throw new Error('API: Response not array but should');
                        }
                        mappedResponse = responseIsArray ? responseBody.map(function (element) {
                            return _this.instantiateModel(element);
                        }) : _this.instantiateModel(responseBody);
                    }
                    return Array.isArray(action.headersForReading) ? [mappedResponse, helper_1.Helper.readHeaders(action.headersForReading, response.headers)] : mappedResponse;
                }).catch(function (error) {
                    var errMsg = error.message ? error.message : error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg);
                    return rxjs_1.Observable.throw(error);
                });
                return true;
            }
            return false;
        });
        if (!request) {
            var error = new Error("API: '" + actionName + "' is not a registered action");
            console.error(error);
            return rxjs_1.Observable.throw(error);
        }
        return request;
    };
    ApiEndpoint.prototype.instantiateModel = function (jsonData) {
        var instantiateModel = new this.endpoint.model(jsonData);
        if (instantiateModel && lang_1.isFunction(instantiateModel.afterLoad)) {
            instantiateModel.afterLoad();
        }
        return instantiateModel;
    };
    return ApiEndpoint;
}();
exports.ApiEndpoint = ApiEndpoint;

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("@angular/common");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("@angular/core/src/facade/lang");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("rxjs");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var api_service_1 = __webpack_require__(4);
exports.ApiProvider = api_service_1.ApiProvider;
var ng2_rest_api_module_1 = __webpack_require__(0);
exports.Ng2RestApiModule = ng2_rest_api_module_1.Ng2RestApiModule;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map