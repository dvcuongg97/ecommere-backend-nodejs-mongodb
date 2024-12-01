'use strict'

const mongoose = require('mongoose'); // Erase if already required


const DOCUMENT_NAME = 'template'
const COLLECTION_NAME = 'templates'

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({

    tem_id: { type: Number, required: true },
    tem_name: { type: String, required: true },
    tem_status: { type: String, default: 'active' },
    tem_html: { type: String, required: true },

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);