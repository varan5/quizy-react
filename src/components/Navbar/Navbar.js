import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import AppConstants from '../../utils/AppConstants'
import './Navbar.css'

const MyNavbar = () => {
  return (
    <div>
      <>
        <Navbar bg="light" variant="light">
          <Container>
            <Link className="navbar-link" to="/"><Navbar.Brand  href="/">{AppConstants.APP_NAME}</Navbar.Brand></Link>
            <Nav className="me-auto">
              <Link  className="navbar-link" to="/questions"><Nav.Link href="/">{AppConstants.VIEW_ALL_QUESTIONS}</Nav.Link></Link>
              <Link  className="navbar-link" to="/question-details"><Nav.Link href="/question-details">{AppConstants.ADD_NEW_QUESTION}</Nav.Link></Link>
              <Link  className="navbar-link" to="/game"><Nav.Link href="#game">{AppConstants.PLAY_GAME_TITLE}</Nav.Link></Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  )
}

export default MyNavbar