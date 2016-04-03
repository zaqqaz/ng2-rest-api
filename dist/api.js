"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('es6-shim');
var http_1 = require('angular2/http');
var helper_1 = require('./helper');
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var exceptions_1 = require("./exceptions");
var lang_1 = require('angular2/src/facade/lang');
var application_ref_1 = require('angular2/src/core/application_ref');
var api_config_1 = require('./api_config');
var ApiProvider = (function () {
    function ApiProvider(http, ApplicationRef) {
        var config = {};
        ApplicationRef.componentTypes.forEach(function (component) {
            var annotations = reflection_1.reflector.annotations(component);
            annotations.forEach(function (annotation) {
                if (annotation instanceof api_config_1.default) {
                    Object.assign(config, annotation);
                }
            });
        });
        /**
         * Инициализация конечных endpoint и их методов
         * TODO: cache
         */
        for (var _i = 0, _a = helper_1.default.entries(config.endpoints); _i < _a.length; _i++) {
            var _b = _a[_i], endpoint = _b[0], endpointParams = _b[1];
            this[endpoint] = {};
            var _loop_1 = function(action, actionParams) {
                var url = config.baseUrl + endpointParams.route, configRoutePrams = actionParams.params || {}, model = endpointParams.model, method = actionParams.method.toUpperCase(), instantiateModel = actionParams.instantiateModel, headersForReading = actionParams.headersForReading, isArray = actionParams.isArray, isSaveRequest = (method === 'PUT' || method === 'POST');
                this_1[endpoint][action] = function (data, params) {
                    if (data === void 0) { data = null; }
                    if (params === void 0) { params = {}; }
                    var compiledUrl = helper_1.default.setUrlParams(data, Object.assign(configRoutePrams, params), url), copiedRequestData = helper_1.default.copyInstances(data);
                    if (isSaveRequest && copiedRequestData && lang_1.isFunction(copiedRequestData.beforeSave)) {
                        copiedRequestData.beforeSave();
                    }
                    var requestOptions = new http_1.RequestOptions({
                        method: method,
                        url: compiledUrl,
                        body: JSON.stringify(copiedRequestData)
                    });
                    var httpPromise = http.request(compiledUrl, requestOptions)
                        .toPromise()
                        .then(function (response) {
                        var mappedResponse;
                        if (instantiateModel === false) {
                            mappedResponse = response.data;
                        }
                        else {
                            var responseBody = JSON.parse(response._body), responseIsArray = Array.isArray(responseBody);
                            if (isArray && !responseIsArray) {
                                throw new exceptions_1.ApiResponseTypeError('Response not array but should');
                            }
                            else if (!isArray && responseIsArray) {
                                throw new exceptions_1.ApiResponseTypeError('Response array but should not');
                            }
                            mappedResponse = responseIsArray ?
                                responseBody.map(function (element) { return ApiProvider.instantiateModel(element, model); }) :
                                ApiProvider.instantiateModel(data, model);
                        }
                        return Array.isArray(headersForReading) ?
                            [mappedResponse, ApiProvider.readHeaders(headersForReading, response.headers)] :
                            mappedResponse;
                    });
                    return Observable_1.Observable.fromPromise(httpPromise);
                };
            };
            var this_1 = this;
            for (var _c = 0, _d = helper_1.default.entries(ApiProvider.mergeWithDefaultActions(endpointParams.actions)); _c < _d.length; _c++) {
                var _e = _d[_c], action = _e[0], actionParams = _e[1];
                _loop_1(action, actionParams);
            }
        }
    }
    Object.defineProperty(ApiProvider, "parameters", {
        get: function () {
            return [[http_1.Http], [application_ref_1.ApplicationRef]];
        },
        enumerable: true,
        configurable: true
    });
    ApiProvider.instantiateModel = function (jsonData, model) {
        var instantiateModel = new model(jsonData);
        if (instantiateModel && lang_1.isFunction(instantiateModel.afterLoad)) {
            instantiateModel.afterLoad();
        }
        return instantiateModel;
    };
    ApiProvider.readHeaders = function (headersForReading, headers) {
        var result = {};
        headersForReading.forEach(function (headerKey) {
            var header = headers.get(headerKey);
            if (header) {
                result[headerKey] = header;
            }
        });
        return result;
    };
    ApiProvider.mergeWithDefaultActions = function (actions) {
        var defaultActions = {
            get: {
                method: 'GET'
            },
            query: {
                method: 'GET',
                isArray: true
            },
            save: {
                method: 'POST'
            },
            update: {
                method: 'PUT'
            },
            patch: {
                method: 'PATCH'
            },
            remove: {
                method: 'DELETE'
            }
        };
        return Object.assign(defaultActions, actions);
    };
    ApiProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Object, Object])
    ], ApiProvider);
    return ApiProvider;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiProvider;
