const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationScehma = new Schema(
    {
        reservationId: { type: String },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reservationStatus: {
            type: String,
            enum: ["OPEN", "CLOSED", "CANCELLED"]
        },
        hotelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
        },
        roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
        roomType: { type: String },
        numberOfGuests: { type: Number },
        status: { type: String, enum: ["ACTIVE", "CANCELLED"] },
        numberOfRooms: { type: Number },
        totalPrice: { type: Number },
        rewardsUsed: { type: Number },
        checkInDate: { type: Date },
        checkOutDate: { type: Date },
        amenities: {
            breakfast: {
                type: Boolean,
                default: false
            },
            gym: {
                type: Boolean,
                default: false
            },
            pool: {
                type: Boolean,
                default: false
            },
            parking: {
                type: Boolean,
                default: false
            },
            meals: {
                type: Boolean,
                default: false
            }
        }
    }
)


const Reservation = mongoose.model('Reservation', reservationScehma);
module.exports.Reservation = Reservation
