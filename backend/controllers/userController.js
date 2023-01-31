const { User } = require("../models/mongo/user")
const express = require('express')
const router = express.Router();

exports.logins = async (req, res) => {
    const reqEmail = req.body.email;
    const reqPass = req.body.password;
    const user = await User.findOne({ email: reqEmail })

    console.log(user)
    if (user.password == reqPass) {
        res.status(200).send(user)
    }
    else {
        res.status(400).send({ message: "Invalid Email/Password" })
    }
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    console.log(id)
    User.findById(id)
        .then(data => {
            console.log("User Data", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching hotel data."
            });
        });
};

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Invalid request body passed!" })
    }

    console.log(req.body)
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        image: req.body.image
    })

    try {
        await user.save()
    }
    catch (err) {
        console.error(err)
    }

}

// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     User.findById(id)
//         .then(data => {
//             console.log("User Data", data)
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while fetching hotel data."
//             });
//         });
// }

exports.findAll = (req, res) => {

    User.find()
        .then(data => {
            console.log("All Users Data: ", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching users data."
            });
        });
};
