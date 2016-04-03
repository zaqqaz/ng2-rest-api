"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApiResponseTypeError = (function (_super) {
    __extends(ApiResponseTypeError, _super);
    function ApiResponseTypeError(message) {
        _super.call(this, message);
        this.name = "ApiResponseTypeError";
        this.message = message;
        this.stack = (new Error(message)).stack;
    }
    ;
    return ApiResponseTypeError;
}(Error));
exports.ApiResponseTypeError = ApiResponseTypeError;
