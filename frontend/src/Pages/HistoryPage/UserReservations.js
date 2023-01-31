import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { BASE_API_URL } from '../../utils/constants'

const UserReservations = () => {
    const [reservationsData, setReservationsData] = useState()

    const getReservations = async () => {
        //call to get reservations
        const userId = localStorage.getItem("user_id")
        const res = await axios.get(`${BASE_API_URL}/reservations/${userId}`)

        setReservationsData(res.data);
    }

    const removeReservation = async (e) => {

        console.log(e.target.value)

        const reservationId = e.target.value;

        const res = await axios.put(`${BASE_API_URL}/reservations/${reservationId}`)
    }
    useEffect(() => {
        getReservations()
    }, [])

    return (
        <>
            <br />
            <div className="div-wrapper">
                <h3>Your Reservations</h3>
                <br />
                <div className="reservations-wrapper">

                    {reservationsData?.map(r => {

                        return (<ListGroup.Item
                            className="d-flex justify-content-between align-items-start search-result-wrapper"
                            key={r?.reservationId}
                        >

                            <div className="search-results-image-wrapper">
                                <br />

                                <img src="https://cdn.dribbble.com/users/118337/screenshots/3831581/building_loader.gif" alt='#' />
                            </div>
                            <div className="search-results-content-wrapper">
                                {/* <div>Hotel: {r?.hotelId}</div> */}
                                {/* <div>Reservations:
                                    {r?.rooms.map(room => {
                                        return (
                                            <>
                                                <div>
                                                    {room?._id}
                                                    ---
                                                    {room?.numberOfRooms}
                                                </div>
                                            </>
                                        )
                                    })
                                    }
                                </div> */}
                                <div ><b>ReservationId:</b>{r?.reservationId} </div>
                                <div><b>Hotel Name: </b>{r?.hotelId}</div>
                                <div><b>Number Of Guests:</b> {r?.numberOfGuests}</div>
                                <div><b>Room Type:</b> {r?.roomType}</div>
                                <div><b>Status: </b>{r?.status}</div>
                                <div><b>Check In Date : </b>{moment(r?.checkInDate).format("Do MMMM YYYY")}</div>
                                <div><b>Check Out Date :</b>{moment(r?.checkOutDate).format("Do MMMM YYYY")} </div>
                                <div><b>Total Bill ($):</b> {r?.totalPrice}</div>


                            </div>
                            <div className='search-results-button-wrapper'>
                                <Button size="lg" variant="danger" value={r?.reservationId} onClick={removeReservation}> Cancel Reservation</Button>
                            </div>
                        </ListGroup.Item>
                        )
                    })
                    }
                </div>

            </div>

        </>

    )
}

export default UserReservations