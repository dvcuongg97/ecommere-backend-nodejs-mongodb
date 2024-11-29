'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Resosurce'
const COLLECTION_NAME = 'Resosurces'

// Declare the Schema of the Mongo model
var resourceSchema = new mongoose.Schema({
    src_name: { type: String, require: true },
    src_slug: { type: String, require: true },
    src_description: { type: String, default: '' },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, resourceSchema);