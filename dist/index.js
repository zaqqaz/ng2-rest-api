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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Ng2RestApiModule_1 = function () {
    function Ng2RestApiModule() {
        _classCallCheck(this, Ng2RestApiModule);
    }

    _createClass(Ng2RestApiModule, null, [{
        key: "configure",

        /**
         * Creates a module with a provider registering endpoints.
         */
        value: function configure(config) {
            return {
                ngModule: Ng2RestApiModule_1,
                providers: [provideApiConfig(config)]
            };
        }
    }]);

    return Ng2RestApiModule;
}();
var Ng2RestApiModule = Ng2RestApiModule_1;
Ng2RestApiModule = Ng2RestApiModule_1 = __decorate([core_1.NgModule({
    imports: [common_1.CommonModule]
}), __metadata('design:paramtypes', [])], Ng2RestApiModule);
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'copyInstances',

        // /**
        //  * Copy instance with their methods
        //  */
        value: function copyInstances(target) {
            for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                sources[_key - 1] = arguments[_key];
            }

            sources.forEach(function (source) {
                Object.defineProperties(target, Object.keys(source).reduce(function (descriptors, key) {
                    descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                    return descriptors;
                }, {}));
            });
            return target;
        }
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

    }, {
        key: 'encodeUriSegment',
        value: function encodeUriSegment(val) {
            return Helper.encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
        }
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

    }, {
        key: 'encodeUriQuery',
        value: function encodeUriQuery(val, pctEncodeSpaces) {
            return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
        }
    }, {
        key: 'entries',
        value: regeneratorRuntime.mark(function entries(obj) {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

            return regeneratorRuntime.wrap(function entries$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!obj) {
                                _context.next = 27;
                                break;
                            }

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 4;
                            _iterator = Object.keys(obj)[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 13;
                                break;
                            }

                            key = _step.value;
                            _context.next = 10;
                            return [key, obj[key]];

                        case 10:
                            _iteratorNormalCompletion = true;
                            _context.next = 6;
                            break;

                        case 13:
                            _context.next = 19;
                            break;

                        case 15:
                            _context.prev = 15;
                            _context.t0 = _context['catch'](4);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 19:
                            _context.prev = 19;
                            _context.prev = 20;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 22:
                            _context.prev = 22;

                            if (!_didIteratorError) {
                                _context.next = 25;
                                break;
                            }

                            throw _iteratorError;

                        case 25:
                            return _context.finish(22);

                        case 26:
                            return _context.finish(19);

                        case 27:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, entries, this, [[4, 15, 19, 27], [20,, 22, 26]]);
        })
        // Helper functions and regex to lookup a dotted path on an object
        // stopping at undefined/null.  The path must be composed of ASCII
        // identifiers (just like $parse)

    }, {
        key: 'isValidDottedPath',
        value: function isValidDottedPath(path) {
            var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
            return path != null && path !== '' && path !== 'hasOwnProperty' && MEMBER_NAME_REGEX.test('.' + path);
        }
    }, {
        key: 'lookupDottedPath',
        value: function lookupDottedPath(obj, path) {
            if (!Helper.isValidDottedPath(path)) {
                throw Error('Dotted member path "' + path + '" is invalid.');
            }
            var keys = path.split('.');
            for (var i = 0, ii = keys.length; i < ii && typeof obj !== 'undefined'; i++) {
                var key = keys[i];
                obj = obj !== null ? obj[key] : undefined;
            }
            return obj;
        }
    }, {
        key: 'extractParams',
        value: function extractParams(data, actionParams) {
            var ids = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Helper.entries(actionParams)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

                    if (value && typeof value === 'function') {
                        value = value();
                    }
                    ids[key] = value && value.charAt && value.charAt(0) == '@' ? Helper.lookupDottedPath(data, value.substr(1)) : value;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return ids;
        }
    }, {
        key: 'setUrlParams',
        value: function setUrlParams(data, params, actionUrl) {
            var protocolAndDomain = '',
                urlParams = {},
                url = actionUrl,
                PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/,
                val = void 0,
                encodedVal = void 0;
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
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Helper.entries(urlParams)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step3$value = _slicedToArray(_step3.value, 2);

                    var urlParam = _step3$value[0];
                    var paramInfo = _step3$value[1];

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
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            url = url.replace(/\/+$/, '') || '/';
            // then replace collapse `/.` if found in the last URL path segment before the query
            // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
            url = url.replace(/\/\.(?=\w+($|\?))/, '.');
            // replace escaped `/\.` with `/.`
            var compiledUrl = protocolAndDomain + url.replace(/\/\\\./, '/.');
            // set other get params
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Helper.entries(params)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _step4$value = _slicedToArray(_step4.value, 2);

                    var key = _step4$value[0];
                    var value = _step4$value[1];

                    if (!urlParams[key]) {
                        compiledUrl += (compiledUrl.indexOf("?") < 0 ? "?" : "&") + key + "=" + value;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return compiledUrl;
        }
    }, {
        key: 'normalizeUrl',
        value: function normalizeUrl(str) {
            // make sure protocol is followed by two slashes
            str = str.replace(/:\//g, '://');
            // remove consecutive slashes
            str = str.replace(/([^:\s])\/+/g, '$1/');
            // remove trailing slash before parameters or hash
            str = str.replace(/\/(\?|&|#[^!])/g, '$1');
            // replace ? in parameters with &
            str = str.replace(/(\?.+)\?/g, '$1&');
            return str;
        }
    }, {
        key: 'readHeaders',
        value: function readHeaders(headersForReading, headers) {
            var result = {};
            headersForReading.forEach(function (headerKey) {
                var header = headers.get(headerKey);
                if (header) {
                    result[headerKey] = header;
                }
            });
            return result;
        }
    }]);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        _classCallCheck(this, ApiProvider);

        this.http = http;
        configs.forEach(function (c) {
            return _this.endpoints = [].concat(_toConsumableArray(_this.configureEndpoints(c)));
        });
    }

    _createClass(ApiProvider, [{
        key: "endpoint",
        value: function endpoint(name) {
            var endpoint = void 0;
            this.endpoints.some(function (e) {
                if (e.name === name) {
                    endpoint = e;
                    return true;
                }
                return false;
            });
            return new apiEndpoint_1.ApiEndpoint(this.http, endpoint);
        }
    }, {
        key: "configureEndpoints",
        value: function configureEndpoints(config) {
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
                e.actions = [].concat(_toConsumableArray(e.actions), _toConsumableArray(defaultActions.filter(function (a) {
                    return !a['skip'];
                })));
                return e;
            });
        }
    }]);

    return ApiProvider;
}();
ApiProvider = __decorate([core_1.Injectable(), __param(0, core_1.Inject(ng2_rest_api_module_1.API_CONFIG)), __metadata('design:paramtypes', [Array, http_1.Http])], ApiProvider);
exports.ApiProvider = ApiProvider;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http_1 = __webpack_require__(3);
var helper_1 = __webpack_require__(1);
var lang_1 = __webpack_require__(7);
var rxjs_1 = __webpack_require__(8);

var ApiEndpoint = function () {
    function ApiEndpoint(http, endpoint) {
        _classCallCheck(this, ApiEndpoint);

        this.http = http;
        this.endpoint = endpoint;
    }

    _createClass(ApiEndpoint, [{
        key: "action",
        value: function action(actionName) {
            var _this = this;

            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var request = void 0;
            this.endpoint.actions.some(function (action) {
                if (action.name.toLowerCase() === actionName.toLowerCase()) {
                    var compiledUrl = helper_1.Helper.setUrlParams(data, Object.assign({}, action.params, params), _this.endpoint.route);
                    var isSaveRequest = action.method === 'PUT' || action.method === 'POST';
                    // copy entity to prevent side-effects and execute beforeSave method
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
                        var mappedResponse = void 0;
                        if (action.instantiateModel === false) {
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
        }
    }, {
        key: "instantiateModel",
        value: function instantiateModel(jsonData) {
            var instantiateModel = new this.endpoint.model(jsonData);
            if (instantiateModel && lang_1.isFunction(instantiateModel.afterLoad)) {
                instantiateModel.afterLoad();
            }
            return instantiateModel;
        }
    }]);

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