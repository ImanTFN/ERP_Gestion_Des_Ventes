const User = require('../models/User');

const { UserValidator } = require('../middlewares/Validator');
const UserController = {};
const path = require('path');

UserController.create = async(req, res) => {
    const user_id = req.body.user_id;
    const username = req.body.username;
    const password = req.body.password;
    const last_name = req.body.last_name;
    const first_name = req.body.first_name;
    const gender = req.body.gender;
    const date_of_birth = req.body.date_of_birth;
    const security_code = req.body.security_code;
    const status = req.body.status;

    const validator = UserValidator({ user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/users');
    }
    const getUser = await User.findOne({ user_id: validator.value.user_id });
    if (getUser) {
        req.flash('error', 'Code User doit unique');
        return res.redirect('/users');
    }
    try {
        const { user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status } = validator.value;
        usr = new User({ user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status });
        await usr.save();
        req.flash('success', 'User bien ajouté!');
        return res.redirect('/users');
    } catch (e) {
        req.flash('error', `Error While Saving Data - ${e}`);
        return res.redirect('/users');
    }
};

UserController.read = async(req, res) => {
    let usrs = User.find({});
    /* usrs = await usrs
         .sort({ createdAt: -1 })
         .exec();*/
    usrs = await usrs.exec();
    res.render('users/index', {
        usrs,
    });
};

UserController.delete = async(req, res) => {
    await User.deleteOne({ _id: req.params.id });
    req.flash('success', `User bien supprimé!`);
    res.redirect('/users');
};

UserController.update = async(req, res) => {

    const user_id = req.body.user_id;
    const username = req.body.username;
    const password = req.body.password;
    const last_name = req.body.last_name;
    const first_name = req.body.first_name;
    const gender = req.body.gender;
    const date_of_birth = req.body.date_of_birth;
    const security_code = req.body.security_code;
    const status = req.body.status;

    const validator = UserValidator({ user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status });
    if (validator.error) {
        req.flash('error', validator.error);
        return res.redirect('/users');
    } else {
        const { user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status } = validator.value;

        const NewUser = await User.findByIdAndUpdate(
            req.params.id, { $set: { user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status } }, { new: true }
        );
        req.flash(
            'success',
            `User info for "${NewUser.user_id}" est bien modifié`
        );
        res.redirect('/users');

    }
};

UserController.getusers = async(req, res) => {
    const users = await User.find({});
    res.send(users);
};

UserController.getuser = async(req, res) => {
    try {
        const { user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status } = await User.findById(
            req.params.id
        );
        if (user_id) {
            return res.send({ user_id, username, password, last_name, first_name, gender, date_of_birth, security_code, status });
        } else return res.send("User introuvable");
    } catch (e) {
        return '';
    }
};




module.exports = UserController;
