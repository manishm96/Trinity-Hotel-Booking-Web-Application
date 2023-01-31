import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/constants';
import moment from 'moment';

const HotelRoomUpdate = () => {

    const [type, setType] = useState("Single")
    const [price, setPrice] = useState(null)
    const [maxOccupancy, setMaxOccupancy] = useState(null)
    const [numberOfRooms, setNumberofRooms] = useState(null)
    const [image, setImage] = useState()

    const handleUpdateRoom = async (e) => {

        const hotelId = localStorage.getItem("hotel_id")

        const payload = {
            price,
            maxOccupancy,
            numberOfRooms
        }
        const res = await axios.put(`${BASE_API_URL}/rooms/${hotelId}/${type}`, payload)

        console.log("C", res.data)
    }


    const getRoomTypeDetails = async () => {
        const hotelId = localStorage.getItem("hotel_id")
        const res = await axios.get(`${BASE_API_URL}/rooms/${hotelId}/${type}`)

        setMaxOccupancy(res.data.maxOccupancy)
        setNumberofRooms(res.data.numberOfRooms)
        setPrice(res.data.price)
        setImage(res.data.image)


    }

    useEffect(() => {
        getRoomTypeDetails();
    }, [type])


    return (
        <div >
            <br />
            <br />
            <Form className="div-wrapper">
                <h2 style={{ marginLeft: "30px" }}>Update Room Details</h2>
                <br />
                <div style={{ display: "flex", justifyContent: "space-evenly", padding: "30px", width: "100%", alignContent: "center" }} >
                    <div style={{ width: "40%" }}>
                        <img style={{ objectFit: ' cover', width: '100%', height: '100%', borderRadius: "5px", }}
                            src={image}
                            alt="" />

                        {/* <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" />
                        </Form.Group> */}

                    </div>
                    <div style={{ width: "50%" }}>

                        <Form.Group>
                            <Form.Label as="legend">Choose Room Type</Form.Label>
                            <Form.Select value={type} onChange={(e) => setType(e.target.value)} style={{ height: "100%", fontSize: "20px", minWidth: "200px" }}>
                                <option>Single</option>
                                <option>Double</option>
                                <option>Suite</option>
                                <option>Deluxe</option>
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <br />
                        <br />

                        <Form.Group >
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control className="s-input-main" type="number" onChange={(e) => setPrice(e.target.value)}
                                value={price} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Max Occupancy</Form.Label>
                            <Form.Control className="s-input-main" type="number" onChange={(e) => setMaxOccupancy(e.target.value)}
                                min={1}
                                max={5}
                                value={maxOccupancy} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Number of Rooms</Form.Label>
                            <Form.Control className="s-input-main" type="number" onChange={(e) => setNumberofRooms(e.target.value)}
                                value={numberOfRooms}
                                min={1}
                                max={5} />
                        </Form.Group>

                        <div className='buttons-wrapper'>
                            <Button variant="primary" size="lg" type="button" onClick={handleUpdateRoom}>
                                Update Room</Button>
                        </div>


                    </div>
                </div>

            </Form>
        </div>

    )
}

export default HotelRoomUpdate