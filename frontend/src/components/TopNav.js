import React, { useEffect, useState } from 'react'
import '../App.css'
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';
const TopNav = () => {

    const navigate = useNavigate();
    const [id, setId] = useState()
    const checkIfLoggedIn = () => {
        if (!localStorage.getItem("user_id")) {
            navigate('/user/login')
        }
        else {
            setId(localStorage.getItem("user_id"))
        }
    }

    const handleSignout = (req, res) => {
        localStorage.clear();
    }

    useEffect(() => {
        checkIfLoggedIn();
    }, [])
    return (
        <Navbar sticky="top" bg="light" variant="light">
            <Container className="navbar-wrapper">
                <Nav>
                    <Image src="https://img.icons8.com/pastel-glyph/64/000000/warning-triangle.png" alt="logo" />
                    <Navbar.Brand href="/" ><b>Trinity Hotels</b></Navbar.Brand>
                </Nav>

                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/user/reservations" >My Reservations</Nav.Link>
                    <Nav.Link href="/user/login" onClick={handleSignout}>Sign Out</Nav.Link>
                </Nav>
            </Container>
        </Navbar >
    )
}

export default TopNav