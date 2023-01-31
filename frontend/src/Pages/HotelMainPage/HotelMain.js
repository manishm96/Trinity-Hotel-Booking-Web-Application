import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BASE_API_URL } from '../../utils/constants';
import { useLocation } from 'react-router-dom'
import RoomCard from './RoomCard'

const HotelMain = () => {

    const [roomsData, setRoomsData] = useState()
    const [selectedRooms, setSelectedRooms] = useState({})
    const [charge, setCharge] = useState(0)
    const location = useLocation()
    const payload = location.state.payload
    const { _id, name, description, image, phoneNumber, address } = location.state.payload.hotel


    console.log(location.state.payload)
    const fetchRoomDetails = async () => {
        const hotelId = _id


        const searchQuery = {
            hotelId,
            checkInDate: payload.checkInDate,
            checkOutDate: payload.checkOutDate,

        }
        const response = await axios.get(`${BASE_API_URL}/rooms/search`, { params: searchQuery })
        console.log("data", response.data)
        setRoomsData(response.data)
    }

    const handleClearSelection = () => {
        setSelectedRooms({});
    }

    useEffect(() => {
        fetchRoomDetails()
    }, [])

    return (
        <div className='hotel-main-wrapper'>
            <div className="top-flex">
                <Card>
                    <Card.Img variant="top" style={{ transform: "scale(1)", height: "400px", objectFit: "cover" }} src={image} />
                    <div className='hotelName'>
                        {name}
                    </div>
                    <div className='hotel-details-wrapper'>
                        <Card.Body>
                            <Card.Subtitle>
                                <h3>
                                    {address.street},  {address.city}, {address.state} - {address.zipCode}
                                </h3>
                            </Card.Subtitle>
                            <br />
                            <Card.Subtitle>
                                <h5>
                                    {phoneNumber}
                                </h5>
                            </Card.Subtitle>
                            <br />

                            <Card.Text>
                                <i>{description}</i>
                            </Card.Text>
                        </Card.Body>
                    </div>

                </Card >
            </div >
            <div className="room-options-wrapper">
                <h3> Select Your Room</h3>
                <div className='room-grid'>
                    {
                        roomsData?.map((room) => {
                            return (
                                <RoomCard
                                    selectedRooms={selectedRooms}
                                    room={room}
                                    charge={charge}
                                ></RoomCard>
                            )
                        })
                    }
                </div>
                <div className="buttons-wrapper" >
                    <Link to="/summary" state={{ payload, selectedRooms, charge }}><Button size="lg"
                        onClick={() => console.log("Selected rooms so far", selectedRooms)}>
                        Proceed
                    </Button></Link>
                    <Button size="lg" variant='danger'
                        onClick={handleClearSelection}>
                        Clear Selection
                    </Button>
                </div>

            </div>
        </div >

    )
}

export default HotelMain