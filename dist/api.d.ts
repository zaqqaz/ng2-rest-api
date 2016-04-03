import 'es6-shim';
import { Http } from 'angular2/http';
import { ApplicationRef } from 'angular2/src/core/application_ref';
declare class ApiProvider {
    static parameters: (typeof Http[] | typeof ApplicationRef[])[];
    constructor(http: any, ApplicationRef: any);
    static instantiateModel(jsonData: any, model: any): any;
    static readHeaders(headersForReading: any, headers: any): {};
    static mergeWithDefaultActions(actions: any): any;
}
export default ApiProvider;
