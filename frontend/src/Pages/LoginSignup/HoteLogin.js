import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BASE_API_URL } from '../../utils/constants'

const HoteLogin = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    // console.log(auth)
    const createAccount = async (e) => {

        e.preventDefault();

        const payload = {
            email,
            password
        }
        try {

            const res = await axios.post(`${BASE_API_URL}/hotels/login`, payload)
            console.log(res.data)
            localStorage.setItem("hotel_id", res.data._id)
            localStorage.setItem("hotel_email", res.data.email)

            //navigate to hotel page
            navigate('/hotel/profile')
        }
        catch (error) {

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


    return (
        <div className='signup-wrapper' >
            <div className='signup-sub-wrapper'>
                <h2 style={{ textAlign: "center" }}>Hotel Login</h2>
                <br />

                <Form>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="s-input-main" type="email" placeholder="Enter email" onChange={handleEmailChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="s-input-main" type="password" placeholder="Password" onChange={handlePasswordChange} />
                    </Form.Group>

                    <div className='buttons-wrapper'>
                        <Button variant="primary" type="submit" onClick={createAccount}>
                            Login
                        </Button>
                    </div>
                </Form>
                <p style={{ textAlign: "center", marginTop: "10px" }}> New Hotel? <span><a href="/hotel/signup">Create Hotel Account </a></span></p>
                <p style={{ textAlign: "center", marginTop: "10px" }}>  <span><a href="/user/login">User Login </a></span></p>

                <p style={{ color: "red" }}> {message}</p>
            </div>
        </div>
    )
}

export default HoteLogin