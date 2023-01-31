module.exports = app => {
    const reservations = require("../controllers/reservationsController");
    // Create a new reservation
    app.post("/reservations", reservations.create);

    //Get all reservations for user
    // app.get("/reservations", reservations.getReservationAll);

    // // //Get reservation by id
    // // app.get("/reservations/:id", reservations.getReservation);


    // // get all reservations for a user
    // app.get("/reservations/user/:id", reservations.getReservationForUser)


    // // get all reservations for a hotel
    // app.get("/reservations/hotel/:id", reservations.getReservationByHotel)



    // app.get("/reservations/:id", reservations.getReservationById);



    // // //Edit reservation
    // app.put("reservations/:id", reservations.editReservation);


    // //Cancel reservations
    // app.delete("reservations/:id", reservations.cancelReservation)

    //Retrieve all reservations
    // app.get("/reservations", reservations.findAll)

    //Retrieve one user reservation
    app.get("/reservations/:id", reservations.findByUser)

    app.put("/reservations/:reservationId", reservations.remove)
}
