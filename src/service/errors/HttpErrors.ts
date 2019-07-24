const createError = require("http-errors");

export interface IHttpErrors {
    conflict: Error;
    internalServerError: Error;
}

export const HttpErrors = {
    conflict: new createError.Conflict(),
    internalServerError: new createError.InternalServerError()
} as IHttpErrors;