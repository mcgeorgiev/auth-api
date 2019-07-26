const createError = require("http-errors");

export interface IHttpErrors {
    conflict: Error;
    internalServerError: Error;
    unauthorized: Error;
}

export const HttpErrors = {
    conflict: new createError.Conflict(),
    internalServerError: new createError.InternalServerError(),
    unauthorized: new createError.Unauthorized()
} as IHttpErrors;