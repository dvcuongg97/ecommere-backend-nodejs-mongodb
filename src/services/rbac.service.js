'use strict'

// IMPORT 
const RESOURCE = require('../models/resource.model')
const ROLE = require('../models/role.model')

const { BadRequestError } = require('../core/error.response')


// FUNCTION 
const createResource = async ({
    name = 'profile',
    slug = 'p00001',
    description = ''
}) => {

    try {
        // 1- check name or slug exists
        if (!name || !slug) {
            throw new BadRequestError('missing input')
        }
        // 2- new resource
        const resource = await RESOURCE.create({
            src_name: name,
            src_slug: slug,
            src_description: description
        })
        return resource

    } catch (error) {
        return error
    }
}

const getResources = async ({
    userId = 0,
    limit = 30,
    offset = 0,
    search = ''
}) => {
    try {

        // 1- check admin ? middleware function

        // 2- get list of resource

        const resourceList = await RESOURCE.aggregate([
            {
                $project: {
                    _id: 0,
                    name: '$src_name',
                    slug: '$src_slug',
                    description: '$src_description',
                    resourceId: '$_id',
                    createAt: 1
                }
            }
        ])

        return resourceList

    } catch (error) {
        return error
    }

}


const createRole = async ({
    name = 'shop',
    slug = 's00001',
    description = 'extend from shop or user',
    grants = []
}) => {

    try {
        // 1- check role exists

        // 2- new role
        const role = await ROLE.create({
            rol_name: name,
            rol_slug: slug,
            rol_desciption: description,
            rol_grants: grants
        })

        return role
    } catch (error) {
        return error
    }

}


const getRoles = async ({
    name = 'shop',
    slug = 's00001',
    description = 'extend from shop or user',
    grants = []
}) => {

    try {
        // 1- check role exists

        // 2- new role
        const role = await ROLE.aggregate([
            {
                $unwind: '$rol_grants'
            },
            {
                $lookup: {
                    from: 'Resource',
                    localField: 'rol_grants.resource',
                    foreignField: '_id',
                    as: 'resource'
                }
            },
            {
                $unwind: '$resource'
            },
            {
                $project: {
                    role: '$rol_name',
                    resource: '$resource.src_name',
                    action: '$rol_grants.action',
                    attributes: '$rol_grants.attributes'
                }
            },
            {
                $unwind: '$action'
            },
            {
                $project: {
                    _id: 0,
                    role: 1,
                    resource: 1,
                    action: '$action',
                    attributes: 1
                }
            }
        ])

        return role
    } catch (error) {
        return error
    }

}


module.exports = {
    createResource,
    getResources,
    createRole,
    getRoles
}