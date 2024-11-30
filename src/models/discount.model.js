'use strict'

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Discount';
const COLLECTION_NAME = 'discounts';

// Define the schema for the Discount model
const discountSchema = new Schema(
    {
        discount_name: { type: String, required: true },
        discount_description: { type: String, required: true },
        discount_type: { type: String, default: 'fixed_amount' }, // fixed_amount | percentage
        discount_value: { type: Number, required: true }, // e.g., 100.00 or 10
        discount_code: { type: String, required: true }, // discountCode
        discount_start_date: { type: Date, required: true }, // start date
        discount_end_date: { type: Date, required: true }, // end date
        discount_max_uses: { type: Number, required: true }, // max times discount can be used
        discount_uses_count: { type: Number, required: true }, // times discount has been used
        discount_users_used: { type: Array, default: [] }, // users who used the discount
        discount_max_uses_per_user: { type: Number, required: true }, // max times a user can use the discount
        discount_min_order_value: { type: Number, required: true }, // minimum order value for discount
        discount_shopId: { type: Schema.Types.ObjectId, ref: 'Shop' }, // associated shop ID
        discount_is_active: { type: Boolean, default: true }, // active status
        discount_applies_to: { type: String, required: true, enum: ['all', 'specific'] }, // applies to all products or specific ones
        discount_product_ids: { type: Array, default: [] }, // list of applicable product IDs
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);
// Export the Discount model
module.exports = model(DOCUMENT_NAME, discountSchema);
