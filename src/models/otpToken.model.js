'use strict'

const mongoose = require('mongoose'); // Erase if already required


const DOCUMENT_NAME = 'otp_log'
const COLLECTION_NAME = 'otp_logs'
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({

    otp_token: { type: String, required: true },
    otp_email: { type: String, required: true },
    otp_status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
    expireAt: { type: Date, default: Date.now, expires: 60 },

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);