const SalesActual = require('../models/SalesActual');

const { SalesActualValidator } = require('../middlewares/Validator');
const SalesActualController = {};
const path = require('path');

SalesActualController.create = async(req, res) => {
    const DATE = req.body.DATE;
    const supplier_id = req.body.supplier_id;
    const sub_total = req.body.sub_total;
    const no_transection = req.body.no_transection;

    const validator = SalesActualValidator({ DATE, supplier_id, sub_total, no_transection });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/salesActuals');
    }
    const getSalesActual = await SalesActual.findOne({ supplier_id: validator.value.supplier_id });
    if (getSalesActual) {
        req.flash('error', 'Supplier id doit unique');
        return res.redirect('/salesActuals');
    }
    try {
        const { DATE, supplier_id, sub_total, no_transection } = validator.value;
        sl = new SalesActual({ DATE, supplier_id, sub_total, no_transection });
        await sl.save();
        req.flash('success', 'Sales bien ajouté!');
        return res.redirect('/salesActuals');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/salesActuals');
    }
};

SalesActualController.read = async(req, res) => {
    let sls = SalesActual.find({});
    /* prdts = await prdts
         .sort({ createdAt: -1 })
         .exec();*/
    sls = await sls.exec();
    res.render('salesActuals/index', {
        sls,
    });
};

SalesActualController.delete = async(req, res) => {
    await SalesActual.deleteOne({ _id: req.params.id });
    req.flash('success', `Sales bien supprimé!`);
    res.redirect('/salesActuals');
};

SalesActualController.update = async(req, res) => {

    const DATE = req.body.DATE;
    const supplier_id = req.body.supplier_id;
    const sub_total = req.body.sub_total;
    const no_transection = req.body.no_transection;;

    const validator = SalesActualValidator({ DATE, supplier_id, sub_total, no_transection });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/salesActuals');
    } else {
        const { DATE, supplier_id, sub_total, no_transection } = validator.value;

        const newSalesActual = await SalesActual.findByIdAndUpdate(
            req.params.id, { $set: { DATE, supplier_id, sub_total, no_transection } }, { new: true }
        );
        req.flash(
            'success',
            `SalesActual info for "${newSalesActual.supplier_id}" est bien modifié`
        );
        res.redirect('/salesActuals');

    }
};

SalesActualController.getSalesActuals = async(req, res) => {
    const salesActuals = await SalesActual.find({});
    res.send(salesActuals);
};

SalesActualController.getSalesActual = async(req, res) => {
    try {
        const { DATE, supplier_id, sub_total, no_transection } = await SalesActual.findById(
            req.params.id
        );
        if (supplier_id) {
            return res.send({ DATE, supplier_id, sub_total, no_transection });
        } else return res.send("Sales Actual introuvable");
    } catch (e) {
        return '';
    }
};

module.exports = SalesActualController;
