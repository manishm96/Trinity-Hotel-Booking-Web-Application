import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_API_URL } from '../../utils/constants'


const HotelSignUp = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [name, setName] = useState()




    const handleEmailChange = (e) => {

        console.log(e.target.value)
        setEmail(e.target.value)

    }

    const handlePasswordChange = (e) => {

        console.log(e.target.value)
        setPassword(e.target.value)

    }

    const handleNameChange = (e) => {

        console.log(e.target.value)
        setName(e.target.value)

    }

    const createAccount = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            email,
            password
        }
        try {
            const res = await axios.post(`${BASE_API_URL}/hotels`, payload)
            console.log(res.data)
            setMessage("Account Created!")
        }
        catch (error) {
            console.log("Some error occured")
        }
    }
    // name: req.body.name,
    //     description: req.body.description,
    //         phoneNumber: req.body.phoneNumber,
    //             address: req.body.address,
    //                 image: req.body.image,
    //                     hikes: req.body.hikes,
    //                         amenities: req.body.amenities

    useEffect(() => {
    }, [])
    return (
        <div className='signup-wrapper' >
            <div className='signup-sub-wrapper'>
                <h2 style={{ textAlign: "center" }}>Create Hotel acccount</h2>
                <br />

                <Form>

                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="s-input-main" type="email" placeholder="Enter email" onChange={handleEmailChange}
                            value={email} />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="s-input-main" type="password" placeholder="Password" onChange={handlePasswordChange}
                            value={password} />
                    </Form.Group>

                    <Form.Group controlId="formGridName">
                        <Form.Label>Hotel Name</Form.Label>
                        <Form.Control className="s-input-main" type="text" placeholder="Enter Name" onChange={handleNameChange}
                            value={name} />
                    </Form.Group>



                    <div className='buttons-wrapper'>
                        <Button variant="primary" type="submit" onClick={createAccount}>
                            Sign Up
                        </Button>
                    </div>
                </Form>
                <p style={{ textAlign: "center", marginTop: "10px" }}> Have an account? <span><a href="/hotel/login">Hotel Login </a></span></p>
                <p style={{ color: "red" }}> {message}</p>
            </div>
        </div>
    )
}

export default HotelSignUp