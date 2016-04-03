"use strict";
var ApiConfig = (function () {
    function ApiConfig(_a) {
        var baseUrl = _a.baseUrl, endpoints = _a.endpoints;
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
    }
    ;
    return ApiConfig;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiConfig;
