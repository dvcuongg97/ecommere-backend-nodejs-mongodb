'use strict'

const USER = require('../models/user.model')
const OTP = require('../models/otpToken.model')
const { ErrorResponse } = require('../core/error.response')
const { SuccessResponse } = require('../core/success.response')
const { token } = require('morgan')
const { checkEmailToken } = require('./otp.service')
const bcrypt = require('bcrypt')
const KeyTokenService = require('../services/keyToken.service')
const createTokenPair = require('../auth/authUtils.auth')
const { createUser } = require('../repositories/user.repo')
const getInfoData = require('../utils/index')


const newUser = async (
    email = null,
    capcha = null
) => {
    //1. check email existed
    const user = await USER.findOne({ email }).lean()

    //2. if existed
    if (user) {
        return ErrorResponse({
            message: 'Email already existed'
        })
    }

    //3. send token via email user
    return SuccessResponse({
        message: 'verify email successful',
        metadata: {
            token,
        }
    })
}

const checkLoginEmailTokenService = async ({
    token
}) => {
    try {
        // check token in model opt
        const { opt_email: email, opt_token } = await checkEmailToken({ token })
        if (!email) throw new ErrorResponse(`Token not found`)
        // check email exist in user model
        const hasUser = await findUserByEmailWithLogin({ email })
        if (hasUser) throw new ErrorResponse(`Email already exists`)
        // new user
        // hash password //
        const hashPassword = await bcrypt.hash(email, 8)
        // create new //
        const newUser = await createUser({
            usr_id: 1,
            usr_slug: 'zxcv',
            usr_name: email,
            usr_password: hashPassword,
            usr_role: ''
        })
        // create keys //
        if (newUser) {

            const publicKey = crypto.randomBytes(64).toString('hex')
            const privateKey = crypto.randomBytes(64).toString('hex')

            console.log(`publicKey:: ${publicKey}, privateKey:: ${privateKey}`);

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newUser.usr_id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                return {
                    code: 'xxx',
                    message: 'key-store error'
                }
            }
            // create token pair //
            const tokens = await createTokenPair({ userId: newUser._id, email }, privateKey, publicKey)
            if (!tokens) {
                return {
                    message: 'create token failed'
                }
            }
            console.log('tokens', tokens);
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['usr_id', 'usr_name', 'usr_email'], object: newUser })
                }
            }
        }
    } catch (error) {

    }
}

const findUserByEmailWithLogin = async ({ email }) => {
    const user = await USER.findOne({ user_email: email }).lean()
    return user
}

module.exports = {
    newUser,
    checkLoginEmailTokenService
}