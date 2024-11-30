'use strict'

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

const orderSchema = new Schema({
    order_userId: { type: Number, require: true },
    order_checkout: { type: Object, default: {} },
    order_shipping: { type: Object, default: {} },
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, require: true },
    order_trackingNumber: { type: String, default: '#0000118052022' },
    order_status: { type: String, enum: ['pending', 'comfirmed', 'shipped', 'cancelled', 'delivered'], default: 'pending' }
}, {
    collection: COLLECTION_NAME,
    timeseries: {
        createAt: 'createOn',
        updateAt: 'modifieOn'
    }
})

module.exports = {
    orderModel: model(DOCUMENT_NAME, orderSchema)
}