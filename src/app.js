'use strict'

const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')
// const dbConnect = require('./dbs/db.connect')

// middle ware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// db connection
// dbConnect()
require('./dbs/db.connect')

// init router

// handle error

module.exports = app


