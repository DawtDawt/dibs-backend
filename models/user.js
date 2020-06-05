const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    owner: Boolean,
    email: String,
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = {
    UserModel
};