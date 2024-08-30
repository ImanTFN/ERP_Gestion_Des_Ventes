const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const invoiceSchema = new mongoose.Schema({
    invoice_id: {
        type: String,
        required: true,
        max: 100,
    },
    customer_id: {
        type: String,
        required: true,
        max: 100,
    },
    date: {
        type: String,
        default: null,
        max: 50,
    },
    total_amount: {
        type: String,
        required: true,
    },
    invoice: {
        type: String,
        required: true,
        max: 255,
    },
    invoice_discount: {
        type: String,
        default: null,
    },
    total_discount: {
        type: String,
        default: null,
    },
    total_tax: {
        type: String,
        default: null,
    },
    invoice_details: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        max: 2,
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

invoiceSchema.plugin(tz);
module.exports = mongoose.model('invoices', invoiceSchema);
