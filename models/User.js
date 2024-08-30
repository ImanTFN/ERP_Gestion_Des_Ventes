const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        max: 15,
    },
    username: {
        type: String,
        required: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 255,
    },
    last_name: {
        type: String,
        default: null,
        max: 255,
    },
    first_name: {
        type: String,
        default: null,
        max: 255,
    },
    gender: {
        type: String,
        required: true,
        max: 2,
    },
    date_of_birth: {
        type: String,
        required: true,
        max: 255,
    },
    security_code: {
        type: String,
        required: true,
        max: 100,
    },
    status: {
        type: String,
        max: 2,
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

userSchema.plugin(tz);
module.exports = mongoose.model('users', userSchema);
