import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import moment from 'moment'

const SearchPanel = (props) => {

    // const [maxDate, setMaxDate] = useState()
    // useEffect(() => {
    //     console.log((moment(props.checkInDate, 'YYYY-MM-DD').add(7, 'd'))._d)

    //     // setMaxDate(moment(props.checkInDate, 'YYYY-MM-DD').add(7, 'd')._d)
    // }, [props.checkInDate])



    return (
        <div className='search-wrapper' style={{ display: "block" }}>
            <Form
                id="searchPanelForm"
            >
                <h2>Where To?</h2>
                <Row>
                    <Col>
                        <div style={{ textAlign: "left" }}>Location</div>
                        <Form.Control
                            type='text'
                            size="lg"
                            placeholder="Location"
                            value={props.location}
                            onChange={props.handleLocationChange()}
                            required
                        />
                    </Col>
                    <Col>
                        <div style={{ textAlign: "left" }}>Check In Date</div>
                        <Form.Control
                            type='date'
                            size="lg"
                            placeholder="CheckIn Date"
                            // onFocus={(e) => e.target.type = "date"}
                            // onBlur={(e) => e.target.type = "text"}
                            min={props.checkInDate}
                            value={props.checkInDate}
                            onChange={props.handleCheckInDate()}
                            required
                        />
                    </Col>
                    <Col>
                        <div style={{ textAlign: "left" }}>Check Out Date</div>
                        <Form.Control
                            size="lg"
                            type="date"
                            // onFocus={(e) => e.target.type = "date"}
                            // onBlur={(e) => e.target.type = "text"}
                            min={props.checkInDate}
                            // max={maxDate}
                            placeholder="CheckOut Date"
                            value={props.checkOutDate}
                            onChange={props.handleCheckOutDate()}
                            required
                        />
                    </Col>

                    <Col>
                        <div style={{ textAlign: "left" }}>Number of Guests</div>
                        <Form.Control
                            type="number"
                            size="lg"
                            placeholder="Number of Guests"
                            value={props.numberOfGuests}
                            onChange={props.handleNumberofGuests()}
                            required
                            min={1}
                            max={20}
                        />
                    </Col>

                    <Col>
                        <br />
                        <Button
                            size="lg"
                            type="submit"
                            onClick={props.searchButtonHandler()}>Find Hotels</Button>
                    </Col>
                </Row>
            </Form>
            <div>
                <p style={{ color: "red" }}> {props.message}</p>
            </div>
        </div>
    )
}

export default SearchPanel