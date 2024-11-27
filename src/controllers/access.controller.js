
'use strict'

const AccessService = require("../services/access.service")
const { OK, CREATED, SuccessResponse } = require('../core/success.response')

class AccessController {

    // :::sign up::: //
    register = async (req, res, next) => {

        // return res.status(201).json( await AccessService.signUp(req.body))

        new CREATED({
            message: "Registered OK",
            metadata: await AccessService.register(req.body),
            options: {
                limit: 10
            }
        }).send(res)

    }


}

module.exports = new AccessController()