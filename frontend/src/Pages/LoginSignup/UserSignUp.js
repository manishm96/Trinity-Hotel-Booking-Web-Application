import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/constants'


const UserSignup = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [name, setName] = useState()

    const [phoneNumber, setPhoneNumber] = useState()
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zipcode, setZipcode] = useState()

    const navigate = useNavigate()

    // console.log(auth)
    const createAccount = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            email,
            password,
            phoneNumber,
            address: {
                street,
                city,
                state,
                zipcode
            }
        }
        try {
            const res = await axios.post(`${BASE_API_URL}/users`, payload)
            console.log(res.data)
            setMessage("Account Created!")
        }
        catch (error) {
            console.log("Some error occured")
        }
    }

    const handleEmailChange = (e) => {

        console.log(e.target.value)
        setEmail(e.target.value)

    }

    const handlePasswordChange = (e) => {

        console.log(e.target.value)
        setPassword(e.target.value)

    }


    useEffect(() => {
    }, [])
    return (
        <div className='signup-wrapper' >
            <div className='signup-sub-wrapper'>
                <h2 style={{ textAlign: "center" }}>Create User acccount</h2>
                <br />

                <Form>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="s-input-main" type="email" placeholder="Enter email"
                            value={email} onChange={handleEmailChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="s-input-main" type="password"
                            value={password} placeholder="Password" onChange={handlePasswordChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control className="s-input-main" type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}
                            value={name} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control className="s-input-main" type="text" placeholder="Enter Number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                    </Form.Group>

                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Street</Form.Label>
                            <Form.Control className="s-input-main" type="name" placeholder="Enter Description" onChange={(e) => setStreet(e.target.value)} value={street} />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>City</Form.Label>
                            <Form.Control className="input-main" placeholder="San Jose"
                                onChange={(e) => setCity(e.target.value)} value={city} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label >State</Form.Label>
                            <Form.Control className="input-main" placeholder="California" onChange={(e) => setState(e.target.value)} value={state} />

                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label >Zipcode</Form.Label>
                            <Form.Control className="input-main" type='number' placeholder="95110" onChange={(e) => setZipcode(e.target.value)} value={zipcode} />
                        </Form.Group>
                    </Row>

                    <div className='buttons-wrapper'>
                        <Button variant="primary" type="submit" onClick={createAccount}>
                            Sign Up
                        </Button>
                    </div>
                </Form>
                <p style={{ textAlign: "center", marginTop: "10px" }}> Have an account? <span><a href="/user/login">User Login </a></span></p>
                <p style={{ color: "red" }}> {message}</p>
            </div>
        </div>
    )
}

export default UserSignup



// "name": "Customer 2",
// "image": "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg",
// "email": "user2@gmail.com",
// "password": "password",
// "phoneNumber":  "7782231111