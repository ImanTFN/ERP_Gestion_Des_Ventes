const CustomerLedger = require('../models/CustomerLedger');

const { CustomerLedgerValidator } = require('../middlewares/Validator');
const CustomerLedgerController = {};
const path = require('path');


CustomerLedgerController.create = async(req, res) => {
    const id = req.body.id;
    const transaction_id = req.body.transaction_id;
    const customer_id= req.body.customer_id;
    const invoice_no = req.body.invoice_no;
    const receipt_no = req.body.receipt_no;
    const amount = req.body.amount;
    const description = req.body.description;
    const payment_type = req.body.payment_type;
    const cheque_no = req.body.cheque_no;
    const date = req.body.date;
    const receipt_from = req.body.receipt_from;
    const status = req.body.status;
    const d_c = req.body.d_c;

    const validator = CustomerLedgerValidator({ id, transaction_id,customer_id,description,payment_type,cheque_no,status,d_c});
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/customerLedgers');
    }
    const getCustomerLedger = await CustomerLedger.findOne({ id: validator.value.id });
    if (getCustomerLedger) {
        req.flash('error', 'Code Customer Ledger doit unique');
        return res.redirect('/customerLedgers');
    }
    try {
        const { id, transaction_id,customer_id,description,payment_type,cheque_no,status,d_c} = validator.value;
        cl = new CustomerLedger({ id, transaction_id,customer_id, invoice_no, receipt_no,amount,description,payment_type,cheque_no,date,receipt_from,status,d_c });
        await cl.save();
        req.flash('success', 'Customer ledger bien ajouté!');
        return res.redirect('/customerLedgers');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/customerLedgers');
    }
};

CustomerLedgerController.read = async(req, res) => {
    let cls = CustomerLedger.find({});
   
    cls = await cls.exec();
    res.render('customerLedgers/index', {
        cls,
    });
};

CustomerLedgerController.delete = async(req, res) => {
    await CustomerLedger.deleteOne({ _id: req.params.id });
    req.flash('success', `Customer Legder bien supprimé!`);
    res.redirect('/customerLedgers');
};

CustomerLedgerController.update = async(req, res) => {

    const id = req.body.id;
    const transaction_id = req.body.transaction_id;
    const customer_id = req.body.customer_id;
    const invoice_no = req.body.invoice_no;
    const receipt_no = req.body.receipt_no;
    const amount = req.body.amount;
    const description = req.body.description;
    const payment_type = req.body.payment_type;
    const cheque_no = req.body.cheque_no;
    const date = req.body.date;
    const receipt_from = req.body.receipt_from;
    const status = req.body.status;
    const d_c = req.body.d_c;


    const validator = CustomerLedgerValidator({ id, transaction_id,customer_id,description,payment_type,cheque_no,receipt_from,status,d_c });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/customerLedgers');
    } else {
        const { id, transaction_id,customer_id,description,payment_type,cheque_no,status,d_c } = validator.value;

        const newCustomerLedger = await CustomerLedger.findByIdAndUpdate(
            req.params.id, { $set: { id, transaction_id,customer_id, invoice_no, receipt_no,amount,description,payment_type,cheque_no,date,receipt_from,status,d_c } }, { new: true }
        );
        req.flash(
            'success',
            `Customer Ledger info for "${newCustomerLedger.id}" est bien modifié`
        );
        res.redirect('/customerLedgers');

    }
};

CustomerLedgerController.getcustomerLedgers = async(req, res) => {
    const customerLedgers = await CustomerLedger.find({});
    res.send(customerLedgers);
};

CustomerLedgerController.getcustomerLedger = async(req, res) => {
    try {
        const {id, transaction_id,customer_id, invoice_no, receipt_no,amount,description,payment_type,cheque_no,date,receipt_from,status,d_c } = await CustomerLedger.findById(
            req.params.id
        );
        if (id) {
            return res.send({ id, transaction_id,customer_id, invoice_no, receipt_no,amount,description,payment_type,cheque_no,date,receipt_from,status,d_c });
        } else return res.send("Customer Ledger introuvable");
    } catch (e) {
        return '';
    }
};

module.exports = CustomerLedgerController;
