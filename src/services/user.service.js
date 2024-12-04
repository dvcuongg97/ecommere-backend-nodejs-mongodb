'use strict'

const USER = require('../models/user.model')
const { ErrorResponse } = require('../core/error.response')
const { SuccessResponse } = require('../core/success.response')


const newUser = async (
    email = null,
    capcha = null
) => {
    //1. check email existed
    const user = await USER.findOne({ email }).lean()

    //2. if existed
    if (user) {
        return ErrorResponse({
            message: 'Email already existed'
        })
    }

    //3. send token via email user
    return SuccessResponse({
        message: 'verify email successful',
        metadata: {
            token,
        }
    })
}