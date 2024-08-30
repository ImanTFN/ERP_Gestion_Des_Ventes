const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const productReturnSchema = new mongoose.Schema({
    return_id: {
        type: String,
        required: true,
        max: 30,
    },
    product_id: {
        type: String,
        default: null,
        max: 20,
    },
    invoice_id: {
        type: String,
        required: true,
        max: 20,
    },
    date_sale: {
        type: String,
        required: true,
        max: 30,
    },
    date_return: {
        type: String,
        required: true,
        max: 30,
    },
    customer_id: {
        type: String,
        max: 20,
        required: true,
    },
    reason: {
        type: String,
        max: 200,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

productReturnSchema.plugin(tz);
module.exports = mongoose.model('productReturns', productReturnSchema);
