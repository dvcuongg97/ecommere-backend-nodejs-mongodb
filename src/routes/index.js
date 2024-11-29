'use strict'

const router = require('express').Router()

// access
router.use('/v1/api/access', require('./access'))

// rbac
router.use('/v1/api/rbac', require('./rbac'))