const { Hotel } = require("../models/mongo/hotel")
const { Room } = require("../models/mongo/room")
const express = require('express')
const router = express.Router();


exports.logins = async (req, res) => {
    const reqEmail = req.body.email;
    const reqPass = req.body.password;


    const hotel = await Hotel.findOne({ email: reqEmail })

    if (hotel.password == reqPass) {
        res.status(200).send(hotel)
    }
    else {
        res.send("Invalid Email/Password")
    }

};

exports.updateHotel = async (req, res) => {


    if (!req.body) {
        res.status(400).send({ message: "Invalid request body passed!" })
    }

    const hotelId = req.params.id;
    const response = await Hotel.updateOne({ _id: hotelId },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                image: req.body.image,
                hikes: req.body.hikes,
                amenities: req.body.amenities
            }
        })

    res.status(200).send(response)

}

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Invalid request body passed!" })
    }

    const roomTypes = ["Single", "Deluxe", "Double", "Suite"];

    const roomImages = {
        Single: "http://cdn.cnn.com/cnnnext/dam/assets/140127103345-peninsula-shanghai-deluxe-mock-up.jpg",
        Double: "https://www.currentschoolnews.com/wp-content/uploads/2021/05/classic-twin-room-1.jpg",
        Deluxe: "https://www.gannett-cdn.com/-mm-/c6ce345dd3cc67c30388965835e2347ef87cfcc7/c=0-366-2700-1885/local/-/media/2020/03/03/USATODAY/usatsports/MotleyFool-TMOT-b9d6657b-hotel-room.jpg",
        Suite: "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
    };

    const hotel = new Hotel({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        description: req.body.description,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        image: req.body.image,
        hikes: req.body.hikes,
        amenities: req.body.amenities
    })

    const response = await hotel.save();
    const hotelId = response.id;

    console.log("Hotel insert id => ", hotelId);

    for (const roomType of roomTypes) {
        const newRoom = new Room({
            hotelId: hotelId,
            type: roomType,
            price: 0,
            numberOfRooms: 0,
            maximumOccupancy: 0,
            image: roomImages[roomType],
        });

        await newRoom.save();
    }

    return res.status(200).send(response);

}

exports.findAll = (req, res) => {

    Hotel.find()
        .then(data => {
            console.log("All Hotels Data: ", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching hotels data."
            });
        });
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    console.log(id)
    Hotel.findById(id)
        .then(data => {
            console.log("Hotel Data", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching hotel data."
            });
        });
};


exports.findByLocation = (req, res) => {

    const location = req.params.location
    console.log("location", location)
    Hotel.find(
        {
            $or: [
                { "address.street": location },
                { "address.city": location },
                { "address.state": location },
                { "address.zipCode": location }
            ]
        }
    ).then(data => {
        console.log("Hotels found: ", data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while fetching hotels in the mentioned location"
        })
    })
}


