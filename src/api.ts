import {Http, RequestOptions, Request, RequestMethod} from 'angular2/http';
import {Injectable} from 'angular2/core';
import * as Rx from 'rxjs/rx';
import {reflector}  from 'angular2/src/core/reflection/reflection';
import {isFunction} from 'angular2/src/facade/lang';
import {ApplicationRef} from 'angular2/src/core/application_ref';
import Helper from './helper';
import {ApiResponseTypeError} from "./exceptions";
import {ApiConfig} from './api_config';

@Injectable()
export class ApiProvider {
    constructor(private http: Http, private applicationRef: ApplicationRef) {
        let config:ApiConfig = new ApiConfig({});

        this.applicationRef.componentTypes.forEach((component) => {
            let annotations = reflector.annotations(component);
            annotations.forEach((annotation) => {
                if (annotation instanceof ApiConfig) {
                    Object.assign(config, annotation);
                }
            })
        });

        /**
         * Init endpoints and their actions
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

                    let httpPromise = this.http.request(compiledUrl, requestOptions).toPromise();
                    return Rx.Observable.fromPromise(httpPromise
                        .then((response) => {
                            let mappedResponse;

                            if (instantiateModel === false) {
                                mappedResponse = response.text();
                            } else {
                                let responseBody = response.json(),
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
                        }));
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
