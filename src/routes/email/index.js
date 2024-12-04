
'use strict'

// import package
const express = require('express')
const router = express.Router()

// import module
const asyncHandler = require('../../helper/asyncHandler')
const { newTemplate } = require('../../controllers/email.controller')



// register
router.post('/new_template', asyncHandler(newTemplate))


module.exports = router