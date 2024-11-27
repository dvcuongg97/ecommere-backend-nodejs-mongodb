
'use strict'

// import package
const express = require('express')
const router = express.Router()

// import module
const AccessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helper/asyncHandler')



// register
router.post('/shop/signup', asyncHandler(AccessController))


module.exports = router