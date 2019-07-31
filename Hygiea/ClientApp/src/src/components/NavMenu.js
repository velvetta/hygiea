import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>Hygiea Dashboard</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <Navbar.Header>
          <Navbar.Brand>
        <Link to={'/'}>Drug</Link>
      </Navbar.Brand>
      </Navbar.Header>
        
        <LinkContainer to={'/'} exact>
          <NavItem>
            <Glyphicon glyph='th-list' /> All Drugs
          </NavItem>        
        </LinkContainer>
        <LinkContainer to={'/'} exact>
        <NavItem>
            <Glyphicon glyph='th-list' /> Finished Drugs
          </NavItem>
          </LinkContainer>
        <LinkContainer to={'/counter'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Warning Drugs
          </NavItem>
        </LinkContainer>
        <Navbar.Header>
          <Navbar.Brand>
        <Link to={'/'}>Appointment</Link>
      </Navbar.Brand>
      </Navbar.Header>
        <LinkContainer to={'/fetchdata'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> All Appointment
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/fetchdata'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Pending Appointment 
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/fetchdata'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Approved Appointment 
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
