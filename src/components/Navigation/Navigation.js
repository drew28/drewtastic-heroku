import React from 'react';
import {
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem
} from 'react-bootstrap';
import {Link} from 'react-router';
import githubIcon from '../../images/GitHub-Mark-Light-32px.png';
import styles from './styles/styles.js';

const menuItems = [{
  href: "/blocks",
  title: "Blocks"
}, {
  href: "/#expresslanesimages",
  title: "Express Lanes Images"
}, {
  href: "/gameoflife",
  title: "Game Of Life"
}, {
  href: "/pyramids",
  title: "Pyramids"
}];


const Navigation = () => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            Chop Shop Taco
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>
  );
};

export default Navigation;
