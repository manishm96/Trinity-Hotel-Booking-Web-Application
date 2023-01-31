const { Room } = require("../models/mongo/room")
const { Reservation } = require("../models/mongo/reservations")
const Holidays = require("date-holidays")
const express = require('express')
const router = express.Router();

exports.createRoom = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Invalid request body passed!" })
    }

    const room = new Room({
        hotelId: req.body.hotelId,
        type: req.body.type,
        image: req.body.image,
        price: req.body.price,
        maxOccupancy: req.body.maxOccupancy,
        numberOfRooms: req.body.numberOfRooms
    })


    room
        .save()
        .then(data => {
            console.log("Room created with details:", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the room."
            });
        });

}


exports.findAll = (req, res) => {

    Room.find()
        .then(data => {
            console.log("All Rooms Data: ", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching rooms data."
            });
        });
};

exports.findByHotelId = (req, res) => {

    const hotelId = req.params.hotelId;

    Room.find(
        { "hotelId": hotelId }
    ).then(data => {
        console.log("Rooms:", data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while fetching roomos for mentioned Hotel"
        })
    })
}

exports.findByRoomType = async (req, res) => {

    const hotelId = req.params.hotelId;
    const roomType = req.params.type;


    console.log(hotelId)
    const response = await Room.findOne({ hotelId: hotelId, type: roomType }, {
    });

    res.status(200).send(response)


}

exports.updateByRoomType = async (req, res) => {

    const hotelId = req.params.hotelId;
    const roomType = req.params.type;

    console.log(req.params)
    console.log("Body => ", req.body)

    const roomDoc = await Room.findOne({ hotelId: hotelId, type: roomType }, {
    });

    const roomId = roomDoc._id;

    console.log(roomId)
    const response = await Room.updateOne({ "_id": roomId }, {
        $set: {
            price: req.body.price,
            maxOccupancy: req.body.maxOccupancy,
            numberOfRooms: req.body.numberOfRooms
        }
    });

    console.log(response)
    res.status(200).send(response)


}

exports.searchForAvailableRooms = async (req, res) => {
    try {
        console.log("Stuff => ", req.query);

        const hotelId = req.query.hotelId;
        const checkInDate = new Date(req.query.checkInDate);
        const checkOutDate = new Date(req.query.checkOutDate);

        const singleRoom = await Room.find({
            hotelId: hotelId,
            type: "Single",
        });
        console.log(JSON.stringify(singleRoom));
        console.log("Total Single rooms: ", singleRoom[0].numberOfRooms);

        const doubleRoom = await Room.find({
            hotelId: hotelId,
            type: "Double",
        });

        console.log("Total Double rooms: ", doubleRoom[0].numberOfRooms);

        const suiteRoom = await Room.find({
            hotelId: hotelId,
            type: "Suite",
        });

        console.log("Total Suite rooms: ", suiteRoom[0].numberOfRooms);

        const deluxeRoom = await Room.find({
            hotelId: hotelId,
            type: "Deluxe",
        });

        console.log("Total Deluxe rooms: ", suiteRoom[0].numberOfRooms);

        const singleRoomsBooked = await Reservation.find({
            hotelId: hotelId,
            checkInDate: {
                $gte: checkInDate,
            },
            checkOutDate: {
                $lte: checkOutDate,
            },
            roomType: "Single",
            status: "ACTIVE",
        }).count();

        console.log(
            "Number of Single rooms booked in that date range: ",
            singleRoomsBooked
        );

        const doubleRoomsBooked = await Reservation.find({
            hotelId: hotelId,
            checkInDate: {
                $gte: checkInDate,
            },
            checkOutDate: {
                $lte: checkOutDate,
            },
            roomType: "Double",
            status: "ACTIVE",
        }).count();

        console.log(
            "Number of DOUBLE rooms booked in that date range: ",
            doubleRoomsBooked
        );

        const suiteRoomsBooked = await Reservation.find({
            hotelId: hotelId,
            checkInDate: {
                $gte: checkInDate,
            },
            checkOutDate: {
                $lte: checkOutDate,
            },
            roomType: "Suite",
            status: "ACTIVE",
        }).count();

        console.log(
            "Number of SUITE rooms booked in that date range: ",
            suiteRoomsBooked
        );

        const deluxeRoomsBooked = await Reservation.find({
            hotelId: hotelId,
            checkInDate: {
                $gte: checkInDate,
            },
            checkOutDate: {
                $lte: checkOutDate,
            },
            roomType: "Deluxe",
            status: "ACTIVE",
        }).count();

        console.log(
            "Number of DELUXE rooms booked in that date range: ",
            deluxeRoomsBooked
        );

        const startDateObj = new Date(checkInDate);
        const endDateObj = new Date(checkOutDate);

        let startDay = startDateObj.getUTCDay();
        let endDay = endDateObj.getUTCDay();
        let weekendSurging = false;
        if (startDay == 0 || endDay == 0 || startDay == 6 || endDay == 6) {
            weekendSurging = true;
        }
        // Saturday = 6, Sunday = 0

        let holidays = new Holidays();
        holidays.init("US", "CA");
        let holidaySurging = false;
        for (
            let loopTime = checkInDate.getTime();
            loopTime < checkOutDate.getTime();
            loopTime += 86400000
        ) {
            let loopDay = new Date(loopTime);
            if (holidays.isHoliday(loopDay)) {
                console.log(loopDay);
                holidaySurging = true;
                break;
            }
        }

        let totalSurging = 0;
        if (holidaySurging == true) {
            totalSurging += 25;
            if (weekendSurging == true) {
                totalSurging += 15;
            }
        }

        let availability = []

        if (totalSurging > 0) {
            const single = {
                id: singleRoom[0]._id,
                type: "Single",
                availableRooms: Math.abs(
                    singleRoom[0].numberOfRooms - singleRoomsBooked
                ),
                maxOccupancy: singleRoom[0].maxOccupancy,
                price:
                    singleRoom[0].price +
                    (singleRoom[0].price * totalSurging) / 100,
                image: singleRoom[0].image,
            };
            availability.push(single);
            const double = {
                id: doubleRoom[0]._id,
                type: "Double",
                availableRooms: Math.abs(
                    doubleRoom[0].numberOfRooms - doubleRoomsBooked
                ),
                maxOccupancy: doubleRoom[0].maxOccupancy,
                price:
                    doubleRoom[0].price +
                    (doubleRoom[0].price * totalSurging) / 100,
                image: doubleRoom[0].image,
            };
            availability.push(double);
            const deluxe = {
                id: deluxeRoom[0]._id,
                type: "Deluxe",
                availableRooms: Math.abs(
                    deluxeRoom[0].numberOfRooms - deluxeRoomsBooked
                ),
                maxOccupancy: deluxeRoom[0].maxOccupancy,
                price:
                    deluxeRoom[0].price +
                    (deluxeRoom[0].price * totalSurging) / 100,
                image: deluxeRoom[0].image,
            };
            availability.push(deluxe);
            const suite = {
                type: "SUITE",
                id: suiteRoom[0]._id,

                availableRooms: Math.abs(
                    suiteRoom[0].numberOfRooms - suiteRoomsBooked
                ),
                maxOccupancy: suiteRoom[0].maxOccupancy,
                price:
                    suiteRoom[0].price +
                    (suiteRoom[0].price * totalSurging) / 100,
                image: suiteRoom[0].image,
            };
            availability.push(suite);
            return res.status(200).send(availability);
        }

        const single = {
            id: singleRoom[0]._id,
            type: "Single",
            availableRooms: Math.abs(
                singleRoom[0].numberOfRooms - singleRoomsBooked
            ),
            maxOccupancy: singleRoom[0].maxOccupancy,
            price: singleRoom[0].price,
            image: singleRoom[0].image,
        };

        console.log(single)
        availability.push(single);
        const double = {
            id: doubleRoom[0]._id,
            type: "Double",
            availableRooms: Math.abs(
                doubleRoom[0].numberOfRooms - doubleRoomsBooked
            ),
            maxOccupancy: doubleRoom[0].maxOccupancy,
            price: doubleRoom[0].price,
            image: doubleRoom[0].image,
        };
        availability.push(double);
        const deluxe = {
            id: deluxeRoom[0]._id,

            type: "Deluxe",
            availableRooms: Math.abs(
                deluxeRoom[0].numberOfRooms - deluxeRoomsBooked
            ),
            maxOccupancy: deluxeRoom[0].maxOccupancy,
            price: deluxeRoom[0].price,
            image: deluxeRoom[0].image,
        };
        availability.push(deluxe);
        const suite = {
            id: suiteRoom[0]._id,

            type: "SUITE",
            availableRooms: Math.abs(
                suiteRoom[0].numberOfRooms - suiteRoomsBooked
            ),
            maxOccupancy: suiteRoom[0].maxOccupancy,
            price: suiteRoom[0].price,
            image: suiteRoom[0].image,
        };
        availability.push(suite);

        return res.status(200).send(availability);
    } catch (err) {
        console.error(err);
    }
};
