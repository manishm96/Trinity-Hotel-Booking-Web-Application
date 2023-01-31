import React, { useState } from 'react'
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

const RoomCard = ({ room, selectedRooms, charge }) => {

    const [quantity, setQuantity] = useState()


    const onRoomQuantityHandler = (e) => {
        console.log("room", e.target.value)
        setQuantity(e.target.value)
    }

    console.log("HERE", room)
    const onAddRoomHandler = () => {
        console.log(room.type)
        // charge += (room.price * quantity)

        selectedRooms[room.type] = { room: room, quantity: quantity, charge: (room.price * quantity) }
        // setSelectedRooms(selectedRooms, selectedRooms[room._id])
    }


    return (
        <Card className="room-grid-card" >
            <div className='room-card-image-wrapper'>
                <Card.Img src={room.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <Card.Body>
                <Card.Title>Room Type: {room.type}</Card.Title>
                <Card.Text>
                    <b> Max Occupancy: </b>{room.maxOccupancy} Person(s)
                </Card.Text>
                <Card.Text>
                    <b>Cost:  </b> ${room.price}
                </Card.Text>
                <Card.Text>
                    <b>Available Rooms: </b>{room.availableRooms}
                </Card.Text>


                <InputGroup>
                    <InputGroup.Text>Reserve Rooms</InputGroup.Text>
                    <Form.Control
                        type='number'
                        min={1}
                        max={room.availableRooms}
                        onChange={onRoomQuantityHandler}
                        value={quantity}
                    />
                    <Button onClick={onAddRoomHandler}>Add Room(s)</Button>
                </InputGroup>


            </Card.Body>

        </Card>
    )
}

export default RoomCard