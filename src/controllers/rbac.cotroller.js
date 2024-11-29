'use strict'

const { SuccessResponse } = require('../core/success.response')
const rbacService = require('../services/rbac.service')

const newRole = async (req, res, next) => {
    new SuccessResponse({
        message: 'create role',
        metadata: await rbacService.createRole(req.body)
    })
}

const newResource = async (req, res, next) => {
    new SuccessResponse({
        message: 'create role',
        metadata: await rbacService.createResource(req.body)
    })
}

const rolesList = async (req, res, next) => {
    new SuccessResponse({
        message: 'create role',
        metadata: await rbacService.getRoles(req.query)
    })
}

const resoourcesList = async (req, res, next) => {
    new SuccessResponse({
        message: 'create role',
        metadata: await rbacService.getResources(req.query)
    })
}

module.exports = {
    newResource,
    newRole,
    resoourcesList,
    rolesList
}