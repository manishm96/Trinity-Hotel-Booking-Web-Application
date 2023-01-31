import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import HotelCard from './HotelCard'

const SearchResults = ({ searchResultsData, checkInDate, checkOutDate, numberOfGuests }) => {


    return (
        <div className='search-results-wrapper'>
            {

                searchResultsData?.data.map((hotel) => {
                    return (

                        <HotelCard
                            key={hotel._id}
                            hotel={hotel}
                            // id={hotel._id}
                            // name={hotel.name}
                            // description={hotel.description}
                            // image={hotel.image}
                            // phoneNumber={hotel.phoneNumber}
                            // address={hotel.address}
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            numberOfGuests={numberOfGuests}
                        >
                        </HotelCard>
                    )
                })
            }
        </div >

    )
}

export default SearchResults
