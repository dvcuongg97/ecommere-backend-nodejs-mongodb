'use strict'


'use strict'

// import package
const express = require('express')
const router = express.Router()

// import module
const asyncHandler = require('../../helper/asyncHandler')
const { newTemplate } = require('../../controllers/email.controller')
const userController = require('../../controllers/user.controller')



// register
router.post('/new_user', asyncHandler(userController.newUser))
router.get('/welcome-back', asyncHandler(userController.checkRegisterEmailToken))


module.exports = router