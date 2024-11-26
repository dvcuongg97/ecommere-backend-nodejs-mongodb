'use strict'

const {
    ReasonPhrases,
    StatusCodes
} = require('../utils/httpStatusCodes')




class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK, 
        reasonStatusCode = ReasonPhrases.OK, 
        metadata = {}
    }){
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }
    send(res, header = {}){
        res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata}){
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.CREATED, 
        reasonStatusCode = ReasonPhrases.CREATED, 
        metadata,
        options = {}
    }) {
        super({message, statusCode, reasonStatusCode, metadata})
        this.options = options
    }
}

module.exports = {
    OK, CREATED, SuccessResponse
}