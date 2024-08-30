const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const salesReportSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        max: 255,
    },
    invoice_id: {
        type: String,
        default: null,
        max: 100,
    },
    invoice_details_id: {
        type: String,
        required: true,
        max: 100,
    },
    supplier_id: {
        type: String,
        required: true,
        max: 100,
    },
    product_id: {
        type: String,
        required: true,
        max: 100,
    },
    product_model: {
        type: String,
        required: true,
        max: 100,
    },
    product_name: {
        type: String,
        max: 255,
        required: true,
    },
    quantity:{
        type:String,
        required: true,
    },
    sell_rate:{
        type:String,
        required: true,
    },
    supplier_rate:{
        type:String,
        required: true,
    },
   
});

salesReportSchema.plugin(tz);
module.exports = mongoose.model('salesReports', salesReportSchema);
