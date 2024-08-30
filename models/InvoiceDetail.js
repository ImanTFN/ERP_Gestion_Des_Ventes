const { note } = require('@hapi/joi/lib/base');
const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const invoiceDetailSchema = new mongoose.Schema({
    invoice_details_id: {
        type: String,
        required: true,
        max: 100,
    },
    invoice_id: {
        type: String,
        required: true,
        max: 100,
    },
    product_id: {
        type: String,
        required: true,
        max: 100,
    },
    quantity: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
        max: 100,
    },
    supplier_rate: {
        type: String,
        default: null,
    },
    total_price: {
        type: String,
        default: null,
    },

    discount:{
        type:String,
        default: null,
    },
    discount_per:{
        type:String,
        default: null,
        max:15,
    },
    tax:{
        type:String,
        default: null,
    },
    paid_amount:{
        type:String,
        default: 0,
    },
    due_amount:{
        type:String,
        default: 0,
        required: true,
    },
    status:{
        type:String,
        max:2,
        required: true,
    },
   
});

invoiceDetailSchema.plugin(tz);
module.exports = mongoose.model('invoiceDetails', invoiceDetailSchema);