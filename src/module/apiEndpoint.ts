import {Http, RequestOptions, Response} from "@angular/http";
import {Endpoint} from "./interfaces";
import {Helper} from "./helper";
import {isFunction} from "@angular/core/src/facade/lang";
import {Observable} from "rxjs";

export class ApiEndpoint {
  constructor(private http: Http, private endpoint: Endpoint) {
  }

  action(actionName: string, data = {}, params = {}) {
    let request;

    this.endpoint.actions.some(action => {
      if (action.name.toLowerCase() === actionName.toLowerCase()) {
        const isSaveRequest = (action.method === 'PUT' || action.method === 'POST');

        // if is not save request - we don't have body data, only get params.
        if(!isSaveRequest) {
          params = data;
        }

        const compiledUrl = Helper.setUrlParams(data, Object.assign({}, action.params, params), this.endpoint.route);

        // copy entity to prevent side-effects and execute beforeSave method for save requests
        const copiedRequestData = Helper.copyInstances(data);
        if (isSaveRequest && copiedRequestData && isFunction(copiedRequestData.beforeSave)) {
          copiedRequestData.beforeSave();
        }

        const requestOptions = new RequestOptions({
          method: action.method,
          url: compiledUrl,
          body: JSON.stringify(copiedRequestData)
        });

        request = this.http.request(compiledUrl, requestOptions)
          .map((response: Response) => {
            let mappedResponse;

            if (action.instantiateModel === false || !response.text()) {
              mappedResponse = response.text();
            } else {
              let responseBody = response.json(),
                responseIsArray = Array.isArray(responseBody);

              if (action.isArray && !responseIsArray) {
                throw new Error('API: Response not array but should');
              } else if (!action.isArray && responseIsArray) {
                throw new Error('API: Response not array but should');
              }

              mappedResponse = responseIsArray ?
                responseBody.map(element => this.instantiateModel(element)) :
                this.instantiateModel(responseBody)
              ;
            }

            return Array.isArray(action.headersForReading) ?
              [mappedResponse, Helper.readHeaders(action.headersForReading, response.headers)] :
              mappedResponse;
          })
          .catch((error: any) => {
            let errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';

            console.error(errMsg);

            return Observable.throw(error);
          });

        return true;
      }
      return false;
    });

    if (!request) {
      const error = new Error(`API: '${actionName}' is not a registered action`);
      console.error(error);

      return Observable.throw(error);
    }
    return request;
  }

  instantiateModel(jsonData) {
    let instantiateModel = new this.endpoint.model(jsonData);

    if (instantiateModel && isFunction(instantiateModel.afterLoad)) {
      instantiateModel.afterLoad();
    }

    return instantiateModel;
  }
}
