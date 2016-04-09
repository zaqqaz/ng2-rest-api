export class ApiConfig {
    public baseUrl:string;
    public endpoints:Array;

    constructor({baseUrl, endpoints}) {
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
    };
}