const SalesReport = require('../models/SalesReport');

const { SalesReportValidator } = require('../middlewares/Validator');
const SalesReportController = {};
const path = require('path');

SalesReportController.create = async(req, res) => {
    const date = req.body.date;
    const invoice_id = req.body.invoice_id;
    const invoice_details_id = req.body.invoice_details_id;
    const supplier_id = req.body.supplier_id;
    const product_id = req.body.product_id;
    const product_model = req.body.product_model;
    const product_name = req.body.product_name;
    const quantity = req.body.quantity;
    const sell_rate = req.body.sell_rate;
    const supplier_rate = req.body.supplier_rate;

    const validator = SalesReportValidator({ date, invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/salesReports');
    }
    const getSalesReport = await SalesReport.findOne({ invoice_id: validator.value.invoice_id });
    if (getSalesReport) {
        req.flash('error', 'invoice id doit unique');
        return res.redirect('/salesReports');
    }
    try {
        const { date,invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate  } = validator.value;
        sr = new SalesReport({date,invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate });
        await sr.save();
        req.flash('success', 'Sales bien ajouté!');
        return res.redirect('/salesReports');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/salesReports');
    }
};

SalesReportController.read = async(req, res) => {
    let srs = SalesReport.find({});
         srs = await srs.exec();
    res.render('salesReports/index', {
        srs,
    });
};

SalesReportController.delete = async(req, res) => {
    await SalesReport.deleteOne({ _id: req.params.id });
    req.flash('success', `Sales bien supprimé!`);
    res.redirect('/salesReports');
};

SalesReportController.update = async(req, res) => {

    const date = req.body.date;
    const invoice_id = req.body.invoice_id;
    const invoice_details_id = req.body.invoice_details_id;
    const supplier_id = req.body.supplier_id;
    const product_id = req.body.product_id;
    const product_model = req.body.product_model;
    const product_name = req.body.product_name;
    const quantity = req.body.quantity;
    const sell_rate = req.body.sell_rate;
    const supplier_rate = req.body.supplier_rate;

    const validator = SalesReportValidator({date,invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/salesReports');
    } else {
        const { date,invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate } = validator.value;

        const nouveauSalesReport = await SalesReport.findByIdAndUpdate(
            req.params.id, { $set: {  date,invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate } }, { new: true }
        );
        req.flash(
            'success',
            `SalesReport info for "${newSalesReport.invoice_id}" est bien modifié`
        );
        res.redirect('/salesReports');

    }
};
SalesReportController.getSalesReports = async(req, res) => {
    const salesReports = await SalesReport.find({});
    res.send(salesReports);
};

SalesReportController.getSalesReport = async(req, res) => {
    try {
        const {  date,invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate } = await SalesReport.findById(
            req.params.id
        );
        if (invoice_id) {
            return res.send({ date,invoice_id, invoice_details_id, supplier_id,product_id,product_model,product_name,quantity,sell_rate,supplier_rate });
        } else return res.send("Sales report introuvable");
    } catch (e) {
        return '';
    }
};

module.exports = SalesReportController;
