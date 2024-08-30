const InvoiceDetail = require('../models/InvoiceDetail');

const { InvoiceDetailValidator } = require('../middlewares/Validator');
const InvoiceDetailController = {};
const path = require('path');

InvoiceDetailController.create = async(req, res) => {
    const invoice_details_id = req.body.invoice_details_id;
    const invoice_id = req.body.invoice_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const rate = req.body.rate;
    const supplier_rate = req.body.supplier_rate;
    const total_price = req.body.total_price;
    const discount = req.body.discount;
    const discount_per = req.body.discount_per;
    const tax = req.body.tax;
    const paid_amount = req.body.paid_amount;
    const due_amount = req.body.due_amount;
    const status = req.body.status;

    const validator = InvoiceDetailValidator({ invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/invoiceDetails');
    }
    const getInvoiceDetail = await InvoiceDetail.findOne({ invoice_details_id: validator.value.invoice_details_id });
    if (getInvoiceDetail) {
        req.flash('error', 'Invoice Details id doit unique');
        return res.redirect('/invoiceDetails');
    }
    try {
        const { invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status } = validator.value;
        idt = new InvoiceDetail({invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status });
        await idt.save();
        req.flash('success', 'Invoice Details bien ajouté!');
        return res.redirect('/invoiceDetails');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/invoiceDetails');
    }
};

InvoiceDetailController.read = async(req, res) => {
    let idts = InvoiceDetail.find({});
     idts = await idts.exec();
    res.render('invoiceDetails/index', {
        idts,
    });
};

InvoiceDetailController.delete = async(req, res) => {
    await InvoiceDetail.deleteOne({ _id: req.params.id });
    req.flash('success', `Invoice Details bien supprimé!`);
    res.redirect('/invoiceDetails');
};

InvoiceDetailController.update = async(req, res) => {

    const invoice_details_id = req.body.invoice_details_id;
    const invoice_id = req.body.invoice_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const rate = req.body.rate;
    const supplier_rate = req.body.supplier_rate;
    const total_price = req.body.total_price;
    const discount = req.body.discount;
    const discount_per = req.body.discount_per;
    const tax = req.body.tax;
    const paid_amount = req.body.paid_amount;
    const due_amount = req.body.due_amount;
    const status = req.body.status;;


    const validator = InvoiceDetailValidator({ invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status});
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/invoiceDetails');
    } else {
        const {invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status } = validator.value;

        const newInvoiceDetail = await InvoiceDetail.findByIdAndUpdate(
            req.params.id, { $set: { invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status } }, { new: true }
        );
        req.flash(
            'success',
            `InvoiceDetail info for "${newInvoiceDetail.invoice_details_id}" est bien modifié`
        );
        res.redirect('/invoiceDetails');

    }
};

InvoiceDetailController.getInvoiceDetails = async(req, res) => {
    const invoiceDetails = await InvoiceDetail.find({});
    res.send(invoiceDetails);
};

InvoiceDetailController.getinvoiceDetail = async(req, res) => {
    try {
        const { invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status } = await SalesActual.findById(
            req.params.id
        );
        if (invoice_details_id) {
            return res.send({invoice_details_id, invoice_id, product_id, quantity,rate,supplier_rate,total_price,discount,discount_per,tax,paid_amount,due_amount,status });
        } else return res.send("Invoice Details introuvable");
    } catch (e) {
        return '';
    }
};

module.exports = InvoiceDetailController;
