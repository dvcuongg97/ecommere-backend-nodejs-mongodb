const jwt = require('jsonwebtoken')


// create token pair //
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
        const accessToken = await jwt.sign(payload, privateKey, {
            expiresIn: '2 days'
        })
        const refreshToken = await jwt.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        // verify jwt
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify::: ${err}`)
            } else {
                console.log(`decode::: ${decode}`);
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createTokenPair }