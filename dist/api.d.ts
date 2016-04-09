import { Http } from 'angular2/http';
import { ApplicationRef } from 'angular2/src/core/application_ref';
export declare class ApiProvider {
    private http;
    private applicationRef;
    constructor(http: Http, applicationRef: ApplicationRef);
    static instantiateModel(jsonData: any, model: any): any;
    static readHeaders(headersForReading: any, headers: any): {};
    static mergeWithDefaultActions(actions: any): any;
}
