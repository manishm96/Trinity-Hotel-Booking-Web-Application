const mongoose = require("mongoose");


const uri = require('../config/default.json')

mongoose
    .connect(
        uri.mongoDB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then((con) => {
        console.log(`MongoDB connection successful : ${con.connection.host}`);
    })
    .catch((err) => {
        console.log(err);
    });


