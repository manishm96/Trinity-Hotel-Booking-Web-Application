const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 200
        },
        image: {
            type: String,
            maxlength: 1024, default: "https://cdn.dribbble.com/users/118337/screenshots/3831581/building_loader.gif",
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
        description: {
            type: String,
            maxlength: 1024
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
        hikes: {
            seasonal: { type: Number, default: 20 },
            weekend: { type: Number, default: 15 }
        },
        amenities: {
            breakfast: {
                type: Number,
                default: 0
            },
            gym: {
                type: Number,
                default: 0
            },
            pool: {
                type: Number,
                default: 0
            },
            parking: {
                type: Number,
                default: 0
            },
            meals: {
                type: Number,
                default: 0
            }
        }
    }
);
const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports.Hotel = Hotel