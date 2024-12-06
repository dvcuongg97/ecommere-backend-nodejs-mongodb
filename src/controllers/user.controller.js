'use strict'

const { token } = require("morgan")
const { SuccessResponse } = require("../core/success.response")
const { newUser } = require("../services/user.service")

class UserController {

    // new user
    newUser = async (params) => {
        const response = await newUser({
            email: req.body.email
        })
        new SuccessResponse(response).send(res)
    }

    // check user token via email
    checkRegisterEmailToken = async () => {
        const { token = null } = req.query
        const response = await this.checkRegisterEmailToken({ token })
        new SuccessResponse(response).send(res)
    }

}

module.exports = new UserController()