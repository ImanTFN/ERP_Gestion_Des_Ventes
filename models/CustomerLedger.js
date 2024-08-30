const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const customerLedgerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        max: 20,
    },
    transaction_id: {
        type: String,
        required: true,
        max: 100,
    },
    customer_id: {
        type: String,
        required: true,
        max: 100,
    },
    invoice_no: {
        type: String,
        default: null,
        max: 100,
    },
    receipt_no: {
        type: String,
        default: null,
        max: 50,
    },
    amount: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        required: true,
        max: 255,
    },
    payment_type: {
        type: String,
        required: true,
        max: 255,
    },
    cheque_no: {
        type: String,
        required: true,
        max: 255,
    },
    date: {
        type: String,
        default: null,
        max: 255,
    },
    receipt_from: {
        type: String,
        default: null,
        max: 50,
    },
    status: {
        type: String,
        max: 2,
        required: true,
    },
    d_c: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

customerLedgerSchema.plugin(tz);
module.exports = mongoose.model('customerLedgers', customerLedgerSchema);
