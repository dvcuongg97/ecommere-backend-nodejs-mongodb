'use strict'

// import package
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

// import module
const ShopModel = require('../models/shop.model')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response')
const KeyTokenService = require('../services/keyToken.service')
const { createTokenPair } = require('../auth/authUtils.auth')

// CONSTANT
const SALT_ROUNDS = 10
const ROLES = {
    SHOP: 'SHOP',
    WRITTER: 'WRITTER',
    EDITTOR: 'EDITTOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static register = async ({ name, email, password }) => {

        // email check
        const foundEmail = shopModel.findOne({ email }).lean()
        if (foundEmail) throw new BadRequestError('Register failed , email already used')

        // hash password
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

        // create new shop 
        const newShop = await ShopModel.create({
            name, email, password: hashedPassword, roles: [ROLES.SHOP]
        })

        // create key pair
        if (newShop) {
            const publicKey = crypto.randomBytes(64).toString('hex')
            const privateKey = crypto.randomBytes(64).toString('hex')
            console.log(`publicKey:: ${publicKey}, privateKey:: ${privateKey}`);

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id, publicKey, privateKey
            })

            if (!keyStore) throw new BadRequestError('Error:: keyStore Error')

            // create token pair //
            const tokens = await createTokenPair({ userId: newShop._id, email }, privateKey, publicKey)
            if (!tokens) {
                return {
                    message: 'create token failed'
                }
            }
            console.log('tokens', tokens);
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop })
                }
            }

        } else {
            throw new BadRequestError('Some thing went wrong, try register again!')
        }


    }

}

module.exports = AccessService