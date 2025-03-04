
class AppError extends Error {
    constructor(message ,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;// whatever happen in the current call, it will be written inside explanation
    }
};

module.exports = AppError