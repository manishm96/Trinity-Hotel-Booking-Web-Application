import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { BASE_API_URL } from '../../utils/constants';
import { useNavigate } from 'react-router'

const UpdateHotel = () => {

    const [name, setName] = useState()
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zipcode, setZipcode] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [description, setDescription] = useState()
    const [breakfast, setBreakfast] = useState(0)
    const [parking, setParking] = useState(0)
    const [gym, setGym] = useState(0)
    const [swimmingPool, setSwimmingPool] = useState(0)
    const [allMeals, setAllMeals] = useState(0)
    const [seasonal, setSeasonal] = useState(0)
    const [weekend, setWeekend] = useState(0)

    const navigate = useNavigate()

    const handleNameChange = (e) => {

        console.log(e.target.value)
        setName(e.target.value)

    }

    const handleNumberChange = (e) => {

        console.log(e.target.value)
        setPhoneNumber(e.target.value)

    }
    const handleDescriptionChange = (e) => {

        console.log(e.target.value)
        setDescription(e.target.value)

    }

    const handleUpdateHotel = async (e) => {

        const hotelId = localStorage.getItem("hotel_id")
        const payload = {
            name,
            description,
            phoneNumber,
            address: {
                street,
                city,
                state,
                zipcode
            },
            hikes: {
                seasonal,
                weekend
            },
            amenities: {
                breakfast,
                gym,
                pool: swimmingPool,
                parking,
                meals: allMeals
            }
        }

        const res = await axios.put(`${BASE_API_URL}/hotels/${hotelId}`, payload)

        // console.log(res.data)
        navigate('/hotel/profile')

    }

    return (
        <div className='div-wrapper'>

            <h1>Update Details </h1>
            <Form.Group controlId="formGridName">
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control className="s-input-main" type="text" placeholder="Enter Name" onChange={handleNameChange}
                    value={name} />
            </Form.Group>

            <Form.Group >
                <Form.Label>Hotel Description</Form.Label>
                <Form.Control className="s-input-main" type="name" placeholder="Enter Description" onChange={handleDescriptionChange} value={description}
                    as="textarea" rows={3} />
            </Form.Group>

            <Form.Group >
                <Form.Label>Hotel Phone Number</Form.Label>
                <Form.Control className="s-input-main" type="text" placeholder="Enter Number" onChange={handleNumberChange} value={phoneNumber} />
            </Form.Group>




            <br />
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Street</Form.Label>
                    <Form.Control className="s-input-main" type="name" placeholder="Enter Street" onChange={(e) => setStreet(e.target.value)} value={street} />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>City</Form.Label>
                    <Form.Control className="input-main" placeholder="San Jose"
                        onChange={(e) => setCity(e.target.value)} value={city}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label >State</Form.Label>
                    <Form.Control className="input-main" placeholder="California" onChange={(e) => setState(e.target.value)} value={state}
                    />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label >Zipcode</Form.Label>
                    <Form.Control className="input-main" type='number' placeholder="95110" onChange={(e) => setZipcode(e.target.value)} value={zipcode}
                    />
                </Form.Group>
            </Row>



            <h5>Hotel Hikes </h5>
            <Row>
                <Form.Group as={Col} >
                    <Form.Label>Seasonal (%)</Form.Label>
                    <Form.Control className="input-main"
                        onChange={(e) => setSeasonal(e.target.value)} value={seasonal}
                    />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>

                        Weekend (%)</Form.Label>
                    <Form.Control className="input-main"
                        onChange={(e) => setWeekend(e.target.value)} value={weekend}
                    />
                </Form.Group>
            </Row>

            <h5>Hotel Amenities </h5>

            <Row>
                <Form.Group as={Col} >
                    <Form.Label>Breakfast ($)</Form.Label>
                    <Form.Control className="input-main"
                        onChange={(e) => setBreakfast(e.target.value)} value={breakfast}
                    />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Parking ($)</Form.Label>
                    <Form.Control className="input-main"
                        onChange={(e) => setParking(e.target.value)} value={parking}
                    />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Gym ($)</Form.Label>
                    <Form.Control className="input-main"
                        onChange={(e) => setGym(e.target.value)} value={gym}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label >Swimming Pool ($)</Form.Label>
                    <Form.Control className="input-main" onChange={(e) => setSwimmingPool(e.target.value)} value={swimmingPool}
                    />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label >All Meals ($)</Form.Label>
                    <Form.Control className="input-main" type='number' onChange={(e) => setAllMeals(e.target.value)} value={allMeals}
                    />
                </Form.Group>
            </Row>


            <div className='buttons-wrapper'>
                <Button variant="primary" type="submit" onClick={handleUpdateHotel}>
                    Update</Button>
            </div>
        </div>
    )
}

export default UpdateHotel