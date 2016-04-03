import 'es6-shim';
import {Http, RequestOptions, Request, RequestMethod} from 'angular2/http';
import Helper from './helper';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {RouteRegistry} from 'angular2/router';
import {reflector}  from 'angular2/src/core/reflection/reflection';
import {ApiResponseTypeError} from "./exceptions";
import {isFunction} from 'angular2/src/facade/lang';
import {ApplicationRef} from 'angular2/src/core/application_ref';
import ApiConfig from './api_config';

@Injectable()
class ApiProvider {
    static get parameters() {
        return [[Http], [ApplicationRef]];
    }

    constructor(http, ApplicationRef) {
        let config = {};

        ApplicationRef.componentTypes.forEach((component) => {
            let annotations = reflector.annotations(component);
            annotations.forEach((annotation) => {
                if (annotation instanceof ApiConfig) {
                    Object.assign(config, annotation);
                }
            })
        });

        /**
         * Инициализация конечных endpoint и их методов
         * TODO: cache
         */
        for (let [endpoint, endpointParams] of Helper.entries(config.endpoints)) {
            this[endpoint] = {};

            for (let [action, actionParams] of Helper.entries(ApiProvider.mergeWithDefaultActions(endpointParams.actions))) {
                let url = config.baseUrl + endpointParams.route,
                    configRoutePrams = actionParams.params || {},
                    model = endpointParams.model,
                    method = actionParams.method.toUpperCase(),
                    instantiateModel = actionParams.instantiateModel,
                    headersForReading = actionParams.headersForReading,
                    isArray = actionParams.isArray,
                    isSaveRequest = (method === 'PUT' || method === 'POST');

                this[endpoint][action] = (data = null, params = {}) => {
                    let compiledUrl = Helper.setUrlParams(data, Object.assign(configRoutePrams, params), url),
                        copiedRequestData = Helper.copyInstances(data);

                    if(isSaveRequest && copiedRequestData && isFunction(copiedRequestData.beforeSave)) {
                        copiedRequestData.beforeSave();
                    }

                    let requestOptions = new RequestOptions({
                        method: method,
                        url: compiledUrl,
                        body: JSON.stringify(copiedRequestData)
                    });

                    let httpPromise = http.request(compiledUrl, requestOptions)
                        .toPromise()
                        .then(function (response) {
                            let mappedResponse;

                            if (instantiateModel === false) {
                                mappedResponse = response.data;
                            } else {
                                let responseBody = JSON.parse(response._body),
                                    responseIsArray = Array.isArray(responseBody);

                                if (isArray && !responseIsArray) {
                                    throw new ApiResponseTypeError('Response not array but should');
                                } else if (!isArray && responseIsArray) {
                                    throw new ApiResponseTypeError('Response array but should not');
                                }

                                mappedResponse = responseIsArray ?
                                    responseBody.map((element) => ApiProvider.instantiateModel(element, model)) :
                                    ApiProvider.instantiateModel(data, model)
                            }

                            return Array.isArray(headersForReading) ?
                                [mappedResponse, ApiProvider.readHeaders(headersForReading, response.headers)] :
                                mappedResponse;
                        });

                    return Observable.fromPromise(httpPromise)
                }
            }
        }
    }

    static instantiateModel(jsonData, model) {
        let instantiateModel = new model(jsonData);

        if (instantiateModel &&  isFunction(instantiateModel.afterLoad)) {
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
}

export default ApiProvider;