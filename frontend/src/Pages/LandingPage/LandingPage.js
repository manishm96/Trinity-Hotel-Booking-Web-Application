import React, { useEffect, useState } from 'react'
import SearchPanel from './SearchPanel';
import { BASE_API_URL } from '../../utils/constants';
import SearchResults from './SearchResults';
import axios from 'axios';
import moment from 'moment'


const LandingPage = () => {

    const [location, setLocation] = useState()
    const [checkInDate, setCheckInDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [checkOutDate, setCheckOutDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [numberOfGuests, setNmberOfGuests] = useState()
    const [searchResultsData, setSearchResultsData] = useState()
    const [message, setMessage] = useState()



    const handleLocationChange = (e) => {
        console.log("Location ", e.target.value)
        setLocation(e.target.value)
    }

    const handleCheckInDate = (e) => {
        console.log("Check in ", e.target.value)
        setCheckInDate(e.target.value)
    }
    const handleCheckOutDate = (e) => {
        console.log("Check out ", e.target.value)

        if (moment(checkInDate, 'YYYY-MM-DD').add(7, 'd')._d < moment(checkOutDate, 'YYYY-MM-DD')._d) {
            setMessage("Can book only for a maximum of 7 days")
        }
        else {
            setMessage("")

        }
        setCheckOutDate(e.target.value)
    }
    const handleNumberofGuests = (e) => {
        console.log("Number of Guests ", e.target.value)
        setNmberOfGuests(e.target.value)
    }

    const onButtonClickHandler = async (e) => {
        console.log("Searching...")


        if (!checkInDate || !checkInDate || !location || !numberOfGuests) {
            console.log("Please fill in all Details ")
            return
        }
        e.preventDefault();
        try {
            const response = await axios.get(`${BASE_API_URL}/hotelsByLocation/${location}`)
            console.log("result", response)
            setSearchResultsData(response)

        } catch (err) {
            console.log("Error Fetching Details", err)
        }
    }

    return (
        <div className='body-main'>
            <SearchPanel
                location={location}
                handleLocationChange={() => handleLocationChange}
                checkInDate={checkInDate}
                handleCheckInDate={() => handleCheckInDate}
                checkOutDate={checkOutDate}
                handleCheckOutDate={() => handleCheckOutDate}
                numberOfGuests={numberOfGuests}
                handleNumberofGuests={() => handleNumberofGuests}
                searchResultsData={searchResultsData}
                searchButtonHandler={() => onButtonClickHandler}
                message={message}
            />
            <SearchResults
                searchResultsData={searchResultsData}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                numberOfGuests={numberOfGuests} />
        </div>

    )
}

export default LandingPage