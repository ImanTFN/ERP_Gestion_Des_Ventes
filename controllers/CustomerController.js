const Customer = require('../models/Customer');

const { CustomerValidator } = require('../middlewares/Validator');
const CustomerController = {};
const path = require('path');

CustomerController.create = async(req, res) => {
    const customer_id = req.body.customer_id;
    const customer_name = req.body.customer_name;
    const customer_address = req.body.customer_address;
    const customer_mobile = req.body.customer_mobile;
    const customer_email = req.body.customer_email;
    const status = req.body.status;

    const validator = CustomerValidator({ customer_id, customer_address, customer_mobile, customer_email });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/customers');
    }
    const getCustomer = await Customer.findOne({ customer_id: validator.value.customer_id });
    if (getCustomer) {
        req.flash('error', 'Code Customer doit unique');
        return res.redirect('/customers');
    }
    try {
        const { customer_id, customer_address, customer_mobile, customer_email } = validator.value;
        cstr = new Customer({ customer_id, customer_name, customer_address, customer_mobile, customer_email, status });
        await cstr.save();
        req.flash('success', 'Customer bien ajouté!');
        return res.redirect('/customers');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/customers');
    }
};

CustomerController.read = async(req, res) => {
    let cstrs = Customer.find({});
    cstrs = await cstrs.exec();
    res.render('customers/index', {
        cstrs,
    });
    
};

//////////////
/*const countCustomers = await Customer.countDocuments();
console.log(`Number of customers: ${countCustomers}`);*/

CustomerController.countCustomers = async(req, res) => {
    const countCustomers = await Customer.countDocuments();
    res.send(countCustomers);
    countCustomers = await countCustomers.exec();
    res.render('/customers', {
        countCustomers,
    });
};

CustomerController.delete = async(req, res) => {
    await Customer.deleteOne({ _id: req.params.id });
    req.flash('success', `Customer bien supprimé!`);
    res.redirect('/customers');
};

CustomerController.update = async(req, res) => {

    const customer_id = req.body.customer_id;
    const customer_name = req.body.customer_name;
    const customer_address = req.body.customer_address;
    const customer_mobile = req.body.customer_mobile;
    const customer_email = req.body.customer_email;
    const status = req.body.status;

    const validator = CustomerValidator({ customer_id, customer_address, customer_mobile, customer_email });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/customers');
    } else {
        const { customer_id, customer_address, customer_mobile, customer_email } = validator.value;

        const nouveauCustomer = await Customer.findByIdAndUpdate(
            req.params.id, { $set: { customer_id, customer_name, customer_address, customer_mobile, customer_email, status } }, { new: true }
        );
        req.flash(
            'success',
            `Customer info for "${nouveauCustomer.customer_id}" est bien modifié`
        );
        res.redirect('/customers');

    }
};

CustomerController.getcustomers = async(req, res) => {
    const customers = await Customer.find({});
    res.send(customers);
};

CustomerController.getcustomer = async(req, res) => {
    try {
        const { customer_id, customer_name, customer_address, customer_mobile, customer_email, status } = await Customer.findById(
            req.params.id
        );
        if (customer_id) {
            return res.send({ customer_id, customer_name, customer_address, customer_mobile, customer_email, status });
        } else return res.send("Customer introuvable");
    } catch (e) {
        return '';
    }
};

module.exports = CustomerController;
