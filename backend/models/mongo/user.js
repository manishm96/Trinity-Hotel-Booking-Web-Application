const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 200
        },
        lastName: {
            type: String,
            maxlength: 1024,
            default: "https://cdn-media-2.freecodecamp.org/w1280/5f9c9c8c740569d1a4ca32d2.jpg"
        },
        email: {
            type: String,
            required: true,
            maxlength: 200
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024,
        },
        phoneNumber: {
            type: String,
            minlength: 10,
            maxlength: 10,
            default: null
        },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipcode: { type: String }
        },
        rewards: {
            type: Number,
            default: 0
        }
    }
);
const User = mongoose.model('User', userSchema);
module.exports.User = User;
