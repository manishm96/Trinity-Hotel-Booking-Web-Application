import React, { useEffect, useState } from 'react'
import { Accordion, Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/constants'

const Summary = () => {
    const [breakfast, setBreakfast] = useState(false)
    const [parking, setParking] = useState(false)
    const [gym, setGym] = useState(false)
    const [swimmingPool, setSwimmingPool] = useState(false)
    const [allMeals, setAllMeals] = useState(false)
    const location = useLocation()

    const [userData, setUserData] = useState()
    const { payload, selectedRooms, charge } = location.state

    const hotel = payload.hotel
    console.log("P", payload)
    console.log("S", selectedRooms)
    console.log("charge", charge)

    const [totalBill, setTotalBill] = useState(0)
    const [amenitiesCharges, setAmenitiesCharges] = useState()
    const [roomCharges, setRoomCharges] = useState()
    const [rewards, setRewards] = useState(false)

    const navigate = useNavigate()
    const onBookingHandler = async () => {

        const userId = localStorage.getItem("user_id")

        const roomsData = []

        for (const r in selectedRooms) {
            roomsData.push({
                userId,
                roomId: selectedRooms[r].room.id,
                hotelId: hotel._id,
                roomType: selectedRooms[r].room.type,
                numberOfRooms: selectedRooms[r].quantity,
                checkInDate: payload.checkInDate,
                checkOutDate: payload.checkOutDate,
                numberOfGuests: payload.numberOfGuests,
                amenities: {
                    breakfast,
                    parking,
                    gym,
                    pool: swimmingPool,
                    meals: allMeals
                },
                totalPrice: totalBill,
            })
        }
        console.log(roomsData)
        const res = await axios.post(`${BASE_API_URL}/reservations`, { roomsData })
        // console.log("summ", res.data)
        console.log("Reservation Creted!")
        navigate('/')
    }

    const getUserInfo = async () => {
        const userId = localStorage.getItem("user_id")
        const res = await axios.get(`${BASE_API_URL}/users/${userId}`)

        setUserData(res.data)
    }

    const calculateTotalBill = () => {
        setTotalBill(amenitiesCharges + roomCharges - (rewards ? userData?.rewards : 0))
    }

    const calculateRoomCharges = () => {
        let cost = 0

        for (const r in selectedRooms) {
            cost += selectedRooms[r].charge
        }

        setRoomCharges(cost)
    }


    const calculateAmenites = () => {
        setAmenitiesCharges((breakfast ? hotel.amenities.breakfast : 0) + (gym ? hotel.amenities.gym : 0) + (swimmingPool ? hotel.amenities.pool : 0) + (parking ? hotel.amenities.parking : 0) + (allMeals ? hotel.amenities.meals : 0))
    }

    useEffect(() => {
        getUserInfo()

        calculateAmenites()
        calculateRoomCharges()


    }, [rewards, roomCharges, totalBill, breakfast, parking, gym, swimmingPool, allMeals])

    useEffect(() => {
        calculateTotalBill()
    }, [calculateAmenites, calculateRoomCharges])


    return (
        <div className="summary-wrapper">



            <div className="summary-details-wrapper">

                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Hotel Info</Accordion.Header>
                        <Accordion.Body>
                            <div className='hotel-summary-info-wrapper'>
                                <div>
                                    <img src={hotel.image} style={{ widht: "200px", height: "150px", objectFit: "cover" }} alt="" ></img>
                                </div>
                                <div>
                                    <h5><b>{hotel.name} </b></h5>
                                    <h5><b>{hotel?.address.street}, {hotel?.address.city}, {hotel?.address.state}, {hotel?.address.zipCode}</b></h5>
                                    <h5><b>{hotel?.phoneNumber}</b></h5>
                                </div>
                            </div>
                            <div className="hotel-summary-info-wrapper">
                                <div>
                                    <div>Check In Date</div>
                                    <div>{payload.checkInDate}</div>

                                </div>
                                <div>
                                    <div>Check Oute Date</div>
                                    <div>{payload.checkInDate}</div>

                                </div>
                                <div>
                                    <div>Guests</div>
                                    <div>{payload.numberOfGuests}</div>

                                </div>
                            </div>

                            <div>
                                Rooms:

                                {
                                    Object.entries(selectedRooms).map(([key, value]) => {
                                        console.log("value", value)

                                        return (
                                            <div>
                                                <h6>{value.quantity} x {value?.room.type} Room</h6>
                                            </div>

                                        )
                                    })
                                }

                            </div>
                        </Accordion.Body>

                    </Accordion.Item>
                    <br />
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Customer Info</Accordion.Header>
                        <Accordion.Body>
                            <div><b>Name:  {userData?.name}</b></div>
                            <div><b>Email: {userData?.email} </b></div>
                            <div><b>Phone Number: {userData?.phoneNumber} </b></div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <br />

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Add Amenities</Accordion.Header>
                        <Accordion.Body>
                            <div className="amenities-and-price-summary-wrapper">


                                <Form>
                                    <div key={`default-checkbox`} className="mb-3">
                                        <Form.Check
                                            type={'checkbox'}
                                            id={'default-checkbox'}
                                            label={'Daily Continental Breakfast'}
                                            onChange={() => {
                                                setBreakfast(!breakfast)
                                                // calculateAmenites()
                                            }}
                                            value={hotel.amenities.breakfast}
                                        />
                                        <Form.Check
                                            type={'checkbox'}
                                            id={'default-checkbox'}
                                            label={'Access to fitness room'}
                                            onChange={() => {
                                                setGym(!gym)
                                            }}
                                            value={hotel.amenities.gym}

                                        />
                                        <Form.Check
                                            type={'checkbox'}
                                            id={'default-checkbox'}
                                            label={'Daily Parking'}
                                            onChange={() => setParking(!parking)}
                                            value={hotel.amenities.parking}
                                        />
                                        <Form.Check
                                            type={'checkbox'}
                                            id={'default-checkbox'}
                                            label={'Access to Swimming Pool/Jacuzzi Pool'}
                                            onChange={() => setSwimmingPool(!swimmingPool)}
                                            value={hotel.amenities.pool}

                                        />
                                        <Form.Check
                                            type={'checkbox'}
                                            id={'default-checkbox'}
                                            label={'All meals included (Breakfast, Lunch, Dinner)'}
                                            onChange={() => setAllMeals(!allMeals)}
                                            value={hotel.amenities.meals}
                                        />

                                    </div>
                                </Form>
                                <div>
                                    <div><b>${hotel.amenities.breakfast}</b></div>
                                    <div><b>${hotel.amenities.gym}</b></div>
                                    <div><b>${hotel.amenities.parking}</b></div>
                                    <div><b>${hotel.amenities.pool}</b></div>
                                    <div><b>${hotel.amenities.meals}</b></div>

                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>


                <Form>
                    <div key={`default-checkbox`} className="mb-3 " style={{ backgroundColor: "white", marginTop: "20px", padding: "10px" }}>
                        <Form.Check
                            type={'checkbox'}
                            id={'default-checkbox'}
                            label={`Use Reward Points   (USD ($)) ${userData?.rewards}`}
                            onChange={() => setRewards(!rewards)}
                        />
                    </div>
                </Form>
            </div>

            <div className="bill-wrapper">

                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Price Summary</Accordion.Header>
                        <Accordion.Body>
                            <div className='amenities-and-price-summary-wrapper '>
                                <div>
                                    <div><b>Room Charges: </b></div>
                                    <div><b>Add On Amenities Charges: </b></div>
                                    {/* <div><b>Customer Loyalty Discount: </b></div> */}
                                    <div><b>Reward Points Used: </b></div>
                                    {/* <div><b>Hike (Seasonal/Weekend): </b></div> */}
                                    <div><b>Amount Payable: </b></div>
                                </div>
                                <div>
                                    <div><b>${roomCharges}</b></div>
                                    <div><b>${amenitiesCharges}</b></div>
                                    {/* <div><b>$ 2</b></div> */}
                                    <div><b>${rewards === true ? userData?.rewards : 0}</b></div>
                                    <div><b>${totalBill}</b></div>

                                </div>
                            </div>
                        </Accordion.Body>

                    </Accordion.Item>
                </Accordion>
                <div className='buttons-wrapper'>
                    <Button size="lg" onClick={onBookingHandler}>Confirm Reservation</Button>
                </div>
            </div>


        </div>
    )
}

export default Summary