module.exports = app => {
    const room = require("../controllers/roomController");

    // Create a new room
    app.post("/rooms", room.createRoom);

    //Retrieve all rooms
    app.get("/rooms", room.findAll)

    app.get("/rooms/search", room.searchForAvailableRooms);

    //Retrieve rooms by hotelId
    app.get("/rooms/:hotelId", room.findByHotelId);

    //get one type room details
    app.get("/rooms/:hotelId/:type", room.findByRoomType)

    app.put("/rooms/:hotelId/:type", room.updateByRoomType)


}