const ErrorHandler = require("../utils/errorhander");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    // MongoDB err
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    
    // mongoose duplicate key err
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)
    }
    
    // json webtoken
    if(err.name === "JsonWebTokenError"){
        const message = `JSON Web Token is Invalid, Please try again`
        err = new ErrorHandler(message, 400)
    }

    // jwt expire
    if(err.name === "TokenExpiredError"){
        const message = `JSON Web Token is Expired, Please try again`
        err = new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    });
};