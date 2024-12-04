'use strict'

const crypto = require('crypto')
const OTP = require('../models/otpToken.model')
const { Module } = require('module')

const generateToken = async () => {
    const token = crypto.randomInt(0, Math.pow(2, 32))
    return token
}

const newOpt = async (email) => {
    const token = generateToken()
    const newToken = await OTP.create({
        otp_token: token,
        otp_email: email
    })
    return newToken
}

module.exports = {
    newOpt
}