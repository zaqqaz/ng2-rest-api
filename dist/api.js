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
const http_1 = require('angular2/http');
const core_1 = require('angular2/core');
const Rx = require('rxjs/rx');
const reflection_1 = require('angular2/src/core/reflection/reflection');
const lang_1 = require('angular2/src/facade/lang');
const application_ref_1 = require('angular2/src/core/application_ref');
const helper_1 = require('./helper');
const exceptions_1 = require("./exceptions");
const api_config_1 = require('./api_config');
let ApiProvider_1;
let ApiProvider = ApiProvider_1 = class ApiProvider {
    constructor(http, applicationRef) {
        this.http = http;
        this.applicationRef = applicationRef;
        let config = new api_config_1.ApiConfig({});
        this.applicationRef.componentTypes.forEach((component) => {
            let annotations = reflection_1.reflector.annotations(component);
            annotations.forEach((annotation) => {
                if (annotation instanceof api_config_1.ApiConfig) {
                    Object.assign(config, annotation);
                }
            });
        });
        /**
         * Init endpoints and their actions
         * TODO: cache
         */
        for (let [endpoint, endpointParams] of helper_1.default.entries(config.endpoints)) {
            this[endpoint] = {};
            for (let [action, actionParams] of helper_1.default.entries(ApiProvider_1.mergeWithDefaultActions(endpointParams.actions))) {
                let url = config.baseUrl + endpointParams.route, configRoutePrams = actionParams.params || {}, model = endpointParams.model, method = actionParams.method.toUpperCase(), instantiateModel = actionParams.instantiateModel, headersForReading = actionParams.headersForReading, isArray = actionParams.isArray, isSaveRequest = (method === 'PUT' || method === 'POST');
                this[endpoint][action] = (data = null, params = {}) => {
                    let compiledUrl = helper_1.default.setUrlParams(data, Object.assign(configRoutePrams, params), url), copiedRequestData = helper_1.default.copyInstances(data);
                    if (isSaveRequest && copiedRequestData && lang_1.isFunction(copiedRequestData.beforeSave)) {
                        copiedRequestData.beforeSave();
                    }
                    let requestOptions = new http_1.RequestOptions({
                        method: method,
                        url: compiledUrl,
                        body: JSON.stringify(copiedRequestData)
                    });
                    let httpPromise = this.http.request(compiledUrl, requestOptions).toPromise();
                    return Rx.Observable.fromPromise(httpPromise
                        .then((response) => {
                        let mappedResponse;
                        if (instantiateModel === false) {
                            mappedResponse = response.text();
                        }
                        else {
                            let responseBody = response.json(), responseIsArray = Array.isArray(responseBody);
                            if (isArray && !responseIsArray) {
                                throw new exceptions_1.ApiResponseTypeError('Response not array but should');
                            }
                            else if (!isArray && responseIsArray) {
                                throw new exceptions_1.ApiResponseTypeError('Response array but should not');
                            }
                            mappedResponse = responseIsArray ?
                                responseBody.map((element) => ApiProvider_1.instantiateModel(element, model)) :
                                ApiProvider_1.instantiateModel(data, model);
                        }
                        return Array.isArray(headersForReading) ?
                            [mappedResponse, ApiProvider_1.readHeaders(headersForReading, response.headers)] :
                            mappedResponse;
                    }));
                };
            }
        }
    }
    static instantiateModel(jsonData, model) {
        let instantiateModel = new model(jsonData);
        if (instantiateModel && lang_1.isFunction(instantiateModel.afterLoad)) {
            instantiateModel.afterLoad();
        }
        return instantiateModel;
    }
    static readHeaders(headersForReading, headers) {
        let result = {};
        headersForReading.forEach((headerKey) => {
            let header = headers.get(headerKey);
            if (header) {
                result[headerKey] = header;
            }
        });
        return result;
    }
    static mergeWithDefaultActions(actions) {
        let defaultActions = {
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
    }
};
ApiProvider = ApiProvider_1 = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, application_ref_1.ApplicationRef])
], ApiProvider);
exports.ApiProvider = ApiProvider;
