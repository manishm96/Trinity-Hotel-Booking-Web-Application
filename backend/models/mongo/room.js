const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        hotelId: {
            type: mongoose.Schema.Types.ObjectId, ref: "Hotel"
        },
        roomNumber:{type : Number},
        type: {
            type: String,
            enum: ["Single", "Double", "Suite", "Deluxe"]
        },
        image: { type: String },
        price: { type: Number },
        maxOccupancy: { type: Number, default: 2 },
        numberOfRooms: { type: Number, default: 0 }
    }
);
const Room = mongoose.model('Room', roomSchema);
module.exports.Room = Room


// ,
//     {
//         "type":"Suite",
// 	    "cost": "600",
//         "image":  "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
//         "maxOccupancy":"6"
//     },
//     {
//         "type":"Super Deluxe",
// 	    "cost": "400",
//         "image":  "https://www.gannett-cdn.com/-mm-/c6ce345dd3cc67c30388965835e2347ef87cfcc7/c=0-366-2700-1885/local/-/media/2020/03/03/USATODAY/usatsports/MotleyFool-TMOT-b9d6657b-hotel-room.jpg",
//         "maxOccupancy":"4"
//     }
//     ]
