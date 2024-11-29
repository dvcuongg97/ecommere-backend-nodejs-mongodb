'use strict'

const express = require('express')
const router = express.Router()

const rbacController = require('../../controllers/rbac.cotroller')

const asyncHandler = require('../../helper/asyncHandler')


router.post('/create-role', asyncHandler(rbacController.newRole))
router.post('/get-roles', asyncHandler(rbacController.rolesList))

router.post('/create-resource', asyncHandler(rbacController.newResource))
router.post('/get-resources', asyncHandler(rbacController.resoourcesList))

module.exports = router