// we handle errors from separate file - ErrorHandler

class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor); 
    }
} 

module.exports = ErrorHandler;