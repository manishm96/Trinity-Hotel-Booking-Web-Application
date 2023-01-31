import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_API_URL } from '../../utils/constants'

const HotelLandingPage = () => {

    const [hotelData, setHotelData] = useState()
    const getHotelDetails = async () => {
        const hotelId = localStorage.getItem("hotel_id")

        console.log(hotelId)
        const res = await axios.get(`${BASE_API_URL}/hotels/${hotelId}`);
        setHotelData(res.data)
    }

    useEffect(() => {
        getHotelDetails();
    }, [])
    return (
        <div className='hotel-main-wrapper'>
            <div className="top-flex">
                <Card>
                    <Card.Img variant="top" style={{ transform: "scale(1)", height: "400px", objectFit: "cover" }} src="https://economictimes.indiatimes.com/thumb/msid-89465809,width-1254,height-836,resizemode-4,imgsize-28786/indian-hotels.jpg" />
                    <div className='hotelName'>
                        {hotelData ? hotelData.name : "Hotel Name"}
                    </div>
                    <div className='hotel-details-wrapper'>
                        <Card.Body>
                            <Card.Subtitle>
                                <h3>
                                    {hotelData?.address?.street},  {hotelData?.address?.city}, {hotelData?.address?.state} - {hotelData ? hotelData.address?.zipcode : "Zipcode"}
                                </h3>
                            </Card.Subtitle>
                            <br />
                            <Card.Subtitle>
                                <h5>
                                    {hotelData?.phoneNumber}
                                </h5>
                            </Card.Subtitle>
                            <br />

                            <Card.Text>
                                <i>{hotelData?.description}</i>
                            </Card.Text>
                        </Card.Body>
                    </div>
                </Card >
            </div >

            <div className='buttons-wrapper' style={{ marginbackgroundColor: "white" }}>
                <Link to={`/hotel/updateDetails`} state={hotelData}><Button size="lg" variant="dark">Update Hotel Details</Button></Link>
                <Link to={`/hotel/updateRooms`}><Button size="lg" variant="dark">Update Room Details</Button></Link>
                <Link to={`/user/login`}><Button size="lg" variant="dark">Signout</Button></Link>

            </div>
        </div>
    )
}

export default HotelLandingPage