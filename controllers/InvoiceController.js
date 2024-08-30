const Invoice = require('../models/Invoice');

const { InvoiceValidator } = require('../middlewares/Validator');
const InvoiceController = {};
const path = require('path');

InvoiceController.create = async(req, res) => {
    const invoice_id = req.body.invoice_id;
    const customer_id = req.body.customer_id;
    const date = req.body.date;
    const total_amount = req.body.total_amount;
    const invoice = req.body.invoice;
    const invoice_discount = req.body.invoice_discount;
    const total_discount = req.body.total_discount;
    const total_tax = req.body.total_tax;
    const invoice_details = req.body.invoice_details;
    const status = req.body.status;

    const validator = InvoiceValidator({ invoice_id, customer_id, total_amount, invoice, invoice_details, status });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/invoices');
    }
    const getInvoice = await Invoice.findOne({ invoice_id: validator.value.invoice_id });
    if (getInvoice) {
        req.flash('error', 'Invoice ID doit etre unique');
        return res.redirect('/invoices');
    }
    try {
        const { invoice_id, customer_id, total_amount, invoice, invoice_details, status } = validator.value;
        invc = new Invoice({ invoice_id, customer_id, date, total_amount, invoice, invoice_discount, total_discount, total_tax, invoice_details, status });
        await invc.save();
        req.flash('success', 'Invoice bien ajouté!');
        return res.redirect('/invoices');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/invoices');
    }
};

InvoiceController.read = async(req, res) => {
    let invcs = Invoice.find({});
    /* invcs = await invcs
         .sort({ createdAt: -1 })
         .exec();*/
    invcs = await invcs.exec();
    res.render('invoices/index', {
        invcs,
    });
};

InvoiceController.delete = async(req, res) => {
    await Invoice.deleteOne({ _id: req.params.id });
    req.flash('success', `Invoice bien supprimé!`);
    res.redirect('/invoices');
};

InvoiceController.update = async(req, res) => {

    const invoice_id = req.body.invoice_id;
    const customer_id = req.body.customer_id;
    const date = req.body.date;
    const total_amount = req.body.total_amount;
    const invoice = req.body.invoice;
    const invoice_discount = req.body.invoice_discount;
    const total_discount = req.body.total_discount;
    const total_tax = req.body.total_tax;
    const invoice_details = req.body.invoice_details;
    const status = req.body.status;

    const validator = InvoiceValidator({ invoice_id, customer_id, total_amount, invoice, invoice_details, status });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/invoices');
    } else {
        const { invoice_id, customer_id, total_amount, invoice, invoice_details, status } = validator.value;

        const NewInvoice = await Invoice.findByIdAndUpdate(
            req.params.id, { $set: { invoice_id, customer_id, date, total_amount, invoice, invoice_discount, total_discount, total_tax, invoice_details, status } }, { new: true }
        );
        req.flash(
            'success',
            `Invoice info for "${NewInvoice.invoice_id}" est bien modifié`
        );
        res.redirect('/invoices');

    }
};

InvoiceController.getinvoices = async(req, res) => {
    const invoices = await Invoice.find({});
    res.send(invoices);
};

InvoiceController.getinvoice = async(req, res) => {
    try {
        const { invoice_id, customer_id, date, total_amount, invoice, invoice_discount, total_discount, total_tax, invoice_details, status } = await Invoice.findById(
            req.params.id
        );
        if (invoice_id) {
            return res.send({ invoice_id, customer_id, date, total_amount, invoice, invoice_discount, total_discount, total_tax, invoice_details, status });
        } else return res.send("Invoice introuvable");
    } catch (e) {
        return '';
    }
};

module.exports = InvoiceController;
