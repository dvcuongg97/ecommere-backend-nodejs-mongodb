

'use strict'

const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {

    // create key token //
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId }
            const update = {
                privateKey,
                publicKey,
                refreshTokensUsed: [],
                refreshToken
            }
            const options = {
                upsert: true,
                new: true
            }

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null

        } catch (error) {
            return error
        }
    }

}

module.exports = KeyTokenService
