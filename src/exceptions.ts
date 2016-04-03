export class ApiResponseTypeError extends Error {
    public stack;

    constructor(message) {
        super(message);
        this.name = "ApiResponseTypeError";
        this.message = message;
        this.stack = (new Error(message)).stack;
    };
}