'use strict'

// require package
const AccessControl = require('accesscontrol');
const rbac = new AccessControl
// require module
const { getRoles } = require('../services/rbac.service')
const { AuthFailureError } = require("../core/error.response")

const grantAccess = (action, resource) => {
    // ...
    return async (req, res, next) => {
        try {
            rbac.grantsList(await getRoles())
            const role_name = req.query.role;
            const permission = rbac.can(role_name)[action](resource)
            if (!permission.granted) {
                throw new AuthFailureError('you dont have enough permission...')
            }

            next()

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    grantAccess
}