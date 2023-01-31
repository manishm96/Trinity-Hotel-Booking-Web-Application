const { Reservation } = require("../models/mongo/reservations")
const { User } = require("../models/mongo/user")
const express = require('express')
const router = express.Router();
const crypto = require("crypto");
const randomUUID = crypto.randomUUID;

exports.create = async (req, res) => {
    console.log("HI", req.body);
    const roomsData = req.body.roomsData;
    const reservationId = randomUUID();
    console.log(roomsData);
    const userId = roomsData[0].userId;
    const rewards = roomsData[0].totalPrice / 10;

    try {
        for (let i = 0; i < roomsData.length; i++) {
            const room = roomsData[i];
            if (room.numberOfRooms == 1) {
                const newReservation = new Reservation({
                    reservationId: reservationId,
                    userId: room.userId,
                    roomId: room.roomId,
                    hotelId: room.hotelId,
                    roomType: room.roomType,
                    checkInDate: new Date(room.checkInDate),
                    checkOutDate: new Date(room.checkOutDate),
                    numberOfGuests: room.numberOfGuests,
                    status: "ACTIVE",
                    amenities: room.amenities,
                    totalPrice: room.totalPrice,
                });

                await newReservation.save();
            } else {
                for (let i = 0; i < room.numberOfRooms; i++) {
                    const newReservation = new Reservation({
                        reservationId: reservationId,
                        userId: room.userId,
                        roomId: room.roomId,
                        hotelId: room.hotelId,
                        roomType: room.roomType,
                        checkInDate: new Date(room.checkInDate),
                        checkOutDate: new Date(room.checkOutDate),
                        numberOfGuests: room.numberOfGuests,
                        status: "ACTIVE",
                        amenities: room.amenities,
                        totalPrice: room.totalPrice,
                    });

                    await newReservation.save();
                }
            }
        }

        await User.updateOne(
            { _id: userId },
            { $set: { rewards: rewards } }
        );

        return res.status(200).send("Successfully saved the reservation");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error making reservation");
    }
}


exports.findByUser = async (req, res) => {

    const userId = req.params.id

    const response = await Reservation.find({ userId: userId })



    console.log(response)
    res.send(response)
}


exports.remove = async (req, res) => {

    await Reservation.updateMany({ reservationId: req.params.reservationId }, { $set: { status: "CANCELLED" } })

    res.status(200).send("Removed")
}