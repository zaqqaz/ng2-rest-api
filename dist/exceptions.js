"use strict";
class ApiResponseTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "ApiResponseTypeError";
        this.message = message;
        this.stack = (new Error(message)).stack;
    }
    ;
}
exports.ApiResponseTypeError = ApiResponseTypeError;
