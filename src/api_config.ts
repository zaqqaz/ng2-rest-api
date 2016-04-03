export default class ApiConfig {
    public baseUrl;
    public endpoints;

    constructor({baseUrl, endpoints}) {
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
    };
}