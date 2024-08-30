const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const salesActualSchemna = new mongoose.Schema({
    DATE: {
        type: String,
        max: 50,
        required: true,
    },
    supplier_id: {
        type: String,
        max: 100,
        required: true,
    },
    sub_total: {
        type: String,
        required: true,
    },
    no_transection: {
        type: String,
        max: 255,
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

salesActualSchemna.plugin(tz);
module.exports = mongoose.model('salesActuals', salesActualSchemna);
