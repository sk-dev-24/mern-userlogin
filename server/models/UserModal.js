const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        mobile: String,
        role: String,
        password: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("user", UserSchema);