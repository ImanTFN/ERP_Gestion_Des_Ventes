const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const customerSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true,
        max: 250,
    },
    customer_name: {
        type: String,
        default: null,
        max: 255,

        
    },
    customer_address: {
        type: String,
        required: true,
        max: 255,
    },
    customer_mobile: {
        type: String,
        required: true,
        max: 100,
    },
    customer_email: {
        type: String,
        required: true,
        max: 100,
    },
    status: {
        type: String,
        max: 2,
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

customerSchema.plugin(tz);
module.exports = mongoose.model('customers', customerSchema);
