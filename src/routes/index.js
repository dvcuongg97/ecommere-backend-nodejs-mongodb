'use strict'

const router = require('express').Router()

// access
router.use('/v1/api', require('./access'))