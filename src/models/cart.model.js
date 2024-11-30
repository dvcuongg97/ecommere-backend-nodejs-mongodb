'use strict'

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'

const cartSchema = new Schema({
    cart_statr: {
        type: String, require: true,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'active'
    },
    cart_products: { type: Array, require: true, default: [] },
    cart_count_product: { type: Number, require: true },
    cart_userId: { type: Number, require: true }
}, {
    collection: COLLECTION_NAME,
    timeseries: {
        createAt: 'createOn',
        updateAt: 'modifieOn'
    }
})

module.exports = {
    cart: model(DOCUMENT_NAME, cartSchema)
}