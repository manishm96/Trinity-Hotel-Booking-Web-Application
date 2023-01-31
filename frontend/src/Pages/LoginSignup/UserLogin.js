import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BASE_API_URL } from '../../utils/constants'

const UserLogin = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            password
        }
        try {

            const res = await axios.post(`${BASE_API_URL}/users/login`, payload)
            console.log(res.data)
            localStorage.setItem("user_id", res.data._id)
            localStorage.setItem("user_email", res.data.email)

            navigate('/')
        }
        catch (error) {
            console.log("error occured")
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
                <h2 style={{ textAlign: "center" }}>User Login</h2>
                <br />

                <Form>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="s-input-main" type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="s-input-main" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>

                    <div className='buttons-wrapper'>
                        <Button variant="primary" type="submit" onClick={login}>
                            Login
                        </Button>
                    </div>
                </Form>
                <p style={{ textAlign: "center", marginTop: "10px" }}> New User? <span><a href="/user/signup">Create User Account </a></span></p>
                <p style={{ textAlign: "center", marginTop: "10px" }}> <span><a href="/hotel/login">Hotel Login  </a></span></p>

                {/* <p style={{ color: "red" }}> {message}</p> */}
            </div>
        </div>
    )
}

export default UserLogin