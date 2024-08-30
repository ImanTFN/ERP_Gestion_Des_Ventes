const ProductsReturn = require('../models/ProductReturn');

const { ProductReturnValidator } = require('../middlewares/Validator');
const ProductReturnController = {};
const path = require('path');

ProductReturnController.create = async(req, res) => {
    const return_id = req.body.return_id;
    const product_id = req.body.product_id;
    const invoice_id = req.body.invoice_id;
    const date_sale = req.body.date_sale;
    const date_return = req.body.date_return;
    const customer_id = req.body.customer_id;
    const reason = req.body.reason;

    const validator = ProductReturnValidator({ return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/productsReturns');
    }
    const getProductsReturn = await getProductsReturn.findOne({ return_id: validator.value.return_id });
    if (getProductsReturn) {
        req.flash('error', 'Return id doit unique');
        return res.redirect('/productsReturns');
    }
    try {
        const { return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason  } = validator.value;
        pr = new ProductsReturn({return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason });
        await pr.save();
        req.flash('success', 'Product Return bien ajouté!');
        return res.redirect('/productsReturns');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/productsReturns');
    }
};

ProductReturnController.read = async(req, res) => {
    let prs = ProductsReturn.find({});
    prs = await prs.exec();
    res.render('productsReturns/index', {
        prs,
    });
};

ProductReturnController.delete = async(req, res) => {
    await ProductsReturn.deleteOne({ _id: req.params.id });
    req.flash('success', `Product Return bien supprimé!`);
    res.redirect('/productsReturns');
};

ProductReturnController.update = async(req, res) => {

    const return_id = req.body.return_id;
    const product_id = req.body.product_id;
    const invoice_id = req.body.invoice_id;
    const date_sale = req.body.date_sale;
    const date_return = req.body.date_return;
    const customer_id = req.body.customer_id;
    const reason = req.body.reason;

    const validator = ProductReturnValidator({return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/productsReturns');
    } else {
        const { return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason } = validator.value;

        const nouveauProductsReturn = await ProductsReturn.findByIdAndUpdate(
            req.params.id, { $set: {  return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason } }, { new: true }
        );
        req.flash(
            'success',
            `ProductsReturn info for "${newProductsReturn.return_id}" est bien modifié`
        );
        res.redirect('/productsReturns');

    }
};
ProductReturnController.getProductsReturns = async(req, res) => {
    const ProductsReturns = await ProductsReturn.find({});
    res.send(ProductsReturns);
};

ProductReturnController.getProductsReturn = async(req, res) => {
    try {
        const {  return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason } = await ProductsReturn.findById(
            req.params.id
        );
        if (invoice_id) {
            return res.send({ return_id, product_id, invoice_id, date_sale,date_return,customer_id,reason });
        } else return res.send("Products Return introuvable");
    } catch (e) {
        return '';
    }
};

module.exports = ProductReturnController;
